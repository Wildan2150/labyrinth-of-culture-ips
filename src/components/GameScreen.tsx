import React, { useState, useEffect, useCallback, useRef } from 'react';

import { GameState } from '../types/gameTypes';
import { createMaze, getCheckpointPositions, createCheckpoints, canMoveTo, isFinishPosition } from '../utils/gameLogic';
import Maze from './Maze';
import GameUI from './GameUI';
import Quiz from './Quiz';
import VirtualControls from './VirtualControls';
import PauseMenu from './PauseMenu';
import { getRandomQuiz } from '../utils/quizData';

interface GameScreenProps {
  onGameFinish: (score: number, time: number) => void;
  onBackToMenu: () => void;
  mazeSize: number;
  checkpointCount: number; 
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameFinish, onBackToMenu, mazeSize, checkpointCount }) => {
  const [maze, setMaze] = useState(() => createMaze(mazeSize, checkpointCount));
  const [gameState, setGameState] = useState<GameState>(() => {
    const checkpointPositions = getCheckpointPositions(maze);
    const checkpoints = createCheckpoints(checkpointPositions);

    return {
      playerPosition: { x: 1, y: 1 },
      score: 0,
      timeStarted: Date.now(),
      timeElapsed: 0,
      checkpoints,
      completedCheckpoints: 0,
      gameStatus: 'playing',
      currentQuiz: null,
      showQuiz: false
    };
  });

  const [showFinishWarning, setShowFinishWarning] = useState(false);
  const finishWarningTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastCheckpointPosition, setLastCheckpointPosition] = useState<{ x: number, y: number }>({ x: 1, y: 1 });


  // Timer effect
  useEffect(() => {
    let interval: number;

    if (gameState.gameStatus === 'playing') {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: Math.floor((Date.now() - prev.timeStarted) / 1000)
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.gameStatus, gameState.timeStarted]);

  // Check for checkpoint or finish
  useEffect(() => {
    const { x, y } = gameState.playerPosition;

    // Check for finish
    if (isFinishPosition(x, y, maze)) {
      if (gameState.completedCheckpoints === gameState.checkpoints.length) {
        onGameFinish(gameState.score, gameState.timeElapsed);
        return;
      } else {
        if (!showFinishWarning) {
          setShowFinishWarning(true);
          // Clear timeout sebelumnya jika ada
          if (finishWarningTimeout.current) clearTimeout(finishWarningTimeout.current);
          finishWarningTimeout.current = setTimeout(() => setShowFinishWarning(false), 2000);
        }
      }
    }

    // Check for checkpoint
    const checkpoint = gameState.checkpoints.find(
      cp => cp.position.x === x && cp.position.y === y && !cp.completed
    );

    // Tambahkan pengecekan agar tidak infinite loop
    if (
      checkpoint &&
      !gameState.showQuiz && // hanya jika quiz belum muncul
      !gameState.currentQuiz // hanya jika belum ada quiz aktif
    ) {
      setGameState(prev => ({
        ...prev,
        currentQuiz: checkpoint.quiz,
        showQuiz: true,
        gameStatus: 'paused'
      }));
    }
  }, [
    gameState.playerPosition,
    gameState.checkpoints,
    gameState.completedCheckpoints,
    maze,
    onGameFinish,
    gameState.score,
    gameState.timeElapsed,
    gameState.showQuiz,
    gameState.currentQuiz,
    showFinishWarning
  ]);

  useEffect(() => {
    const { x, y } = gameState.playerPosition;

    // Check for finish
    if (isFinishPosition(x, y, maze)) {
      if (gameState.completedCheckpoints === gameState.checkpoints.length) {
        onGameFinish(gameState.score, gameState.timeElapsed);
        return;
      } else {
        setShowFinishWarning(true);
        // Optional: otomatis hilang setelah beberapa detik
        setTimeout(() => setShowFinishWarning(false), 2000);
      }
    }

    // Check for checkpoint
    const checkpoint = gameState.checkpoints.find(
      cp => cp.position.x === x && cp.position.y === y && !cp.completed
    );

    if (
      checkpoint &&
      !gameState.showQuiz &&
      !gameState.currentQuiz
    ) {
      // Jika checkpoint sudah pernah dicoba (gagal), ganti soal baru
      let updatedCheckpoints = gameState.checkpoints;
      let quizToShow = checkpoint.quiz;
      if (checkpoint.attempted) {
        // Kumpulkan semua id quiz yang sudah dipakai di checkpoint lain
        const usedQuizIds = gameState.checkpoints.map(cp => cp.quiz.id);
        const newQuiz = getRandomQuiz(usedQuizIds);
        updatedCheckpoints = gameState.checkpoints.map(cp =>
          cp.position.x === x && cp.position.y === y
            ? { ...cp, quiz: newQuiz, attempted: false } // reset attempted
            : cp
        );
        quizToShow = newQuiz;
      }
      setGameState(prev => ({
        ...prev,
        checkpoints: updatedCheckpoints,
        currentQuiz: quizToShow,
        showQuiz: true,
        gameStatus: 'paused'
      }));
    }
  }, [
    gameState.playerPosition,
    gameState.checkpoints,
    gameState.completedCheckpoints,
    maze,
    onGameFinish,
    gameState.score,
    gameState.timeElapsed,
    gameState.showQuiz,
    gameState.currentQuiz
  ]);

  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => {
      const { x, y } = prev.playerPosition;
      let newX = x;
      let newY = y;

      switch (direction) {
        case 'up':
          newY = Math.max(0, y - 1);
          break;
        case 'down':
          newY = Math.min(maze.length - 1, y + 1);
          break;
        case 'left':
          newX = Math.max(0, x - 1);
          break;
        case 'right':
          newX = Math.min(maze.length - 1, x + 1);
          break;
      }

      // Check if blocked by incomplete checkpoint
      const targetCheckpoint = prev.checkpoints.find(
        cp => cp.position.x === newX && cp.position.y === newY
      );

      if (targetCheckpoint && !targetCheckpoint.completed && maze[newY][newX] === 2) {
        // Allow moving to incomplete checkpoint to trigger quiz
        if (canMoveTo(newX, newY, maze)) {
          return { ...prev, playerPosition: { x: newX, y: newY } };
        }
        return prev;
      }

      if (canMoveTo(newX, newY, maze)) {
        return { ...prev, playerPosition: { x: newX, y: newY } };
      }

      return prev;
    });
  }, [gameState.gameStatus, maze]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          movePlayer('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          movePlayer('down');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          movePlayer('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          movePlayer('right');
          break;
        case 'Escape':
          handlePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  const handleQuizAnswer = (correct: boolean) => {
    setGameState(prev => {
      if (correct) {
        const updatedCheckpoints = prev.checkpoints.map(cp =>
          cp.quiz.id === prev.currentQuiz?.id ? { ...cp, completed: true } : cp
        );
        const currentCheckpoint = prev.checkpoints.find(cp => cp.quiz.id === prev.currentQuiz?.id);
        if (currentCheckpoint) {
          setLastCheckpointPosition(currentCheckpoint.position);
        }
        return {
          ...prev,
          checkpoints: updatedCheckpoints,
          completedCheckpoints: prev.completedCheckpoints + 1,
          score: prev.score + 10,
          currentQuiz: null,
          showQuiz: false,
          gameStatus: 'playing',
          playerPosition: prev.playerPosition,
          timeStarted: prev.timeStarted + (Date.now() - prev.timeStarted - prev.timeElapsed * 1000)
        };
      } else {
        const updatedCheckpoints = prev.checkpoints.map(cp =>
          cp.quiz.id === prev.currentQuiz?.id ? { ...cp, attempted: true } : cp
        );
        return {
          ...prev,
          checkpoints: updatedCheckpoints,
          currentQuiz: null,
          showQuiz: false,
          gameStatus: 'playing',
          playerPosition: lastCheckpointPosition, // kembali ke checkpoint terakhir
          timeStarted: prev.timeStarted + (Date.now() - prev.timeStarted - prev.timeElapsed * 1000)
        };
      }
    });
  };

  const handlePause = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: prev.gameStatus === 'playing' ? 'paused' : 'playing',
      timeStarted: prev.gameStatus === 'paused' ? Date.now() - prev.timeElapsed * 1000 : prev.timeStarted
    }));
  };

  const handleResume = () => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      timeStarted: Date.now() - prev.timeElapsed * 1000
    }));
  };

  const handleRestart = () => {
    const newMaze = createMaze(mazeSize, checkpointCount);
    const checkpointPositions = getCheckpointPositions(newMaze);
    const checkpoints = createCheckpoints(checkpointPositions);

    setGameState({
      playerPosition: { x: 1, y: 1 },
      score: 0,
      timeStarted: Date.now(),
      timeElapsed: 0,
      checkpoints,
      completedCheckpoints: 0,
      gameStatus: 'playing',
      currentQuiz: null,
      showQuiz: false
    });
    setLastCheckpointPosition({ x: 1, y: 1 });
    setMaze(newMaze);
  };

  return (
    <div className="relative">
      <Maze
        maze={maze}
        playerPosition={gameState.playerPosition}
        checkpoints={gameState.checkpoints}
      />

      <GameUI
        score={gameState.score}
        timeElapsed={gameState.timeElapsed}
        completedCheckpoints={gameState.completedCheckpoints}
        totalCheckpoints={gameState.checkpoints.length}
        onPause={handlePause}
      />

      <VirtualControls onMove={movePlayer} />

      {gameState.showQuiz && gameState.currentQuiz && (
        <Quiz
          quiz={gameState.currentQuiz}
          onAnswer={handleQuizAnswer}
        />
      )}

      {gameState.gameStatus === 'paused' && !gameState.showQuiz && (
        <PauseMenu
          onResume={handleResume}
          onBackToMenu={onBackToMenu}
          onRestart={handleRestart}
        />
      )}


      {showFinishWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-red-100 text-red-800 px-6 py-4 rounded-2xl shadow-xl text-lg font-semibold animate-pulse transform transition-all pointer-events-auto">
            🚩 Selesaikan semua checkpoint sebelum ke garis finish!
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;