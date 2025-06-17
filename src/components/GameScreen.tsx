import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Position } from '../types/gameTypes';
import { createMaze, getCheckpointPositions, createCheckpoints, canMoveTo, isFinishPosition, MAZE_SIZE } from '../utils/gameLogic';
import Maze from './Maze';
import GameUI from './GameUI';
import Quiz from './Quiz';
import VirtualControls from './VirtualControls';
import PauseMenu from './PauseMenu';

interface GameScreenProps {
  onGameFinish: (score: number, time: number) => void;
  onBackToMenu: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameFinish, onBackToMenu }) => {
  const [maze] = useState(() => createMaze());
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
          newY = Math.min(MAZE_SIZE - 1, y + 1);
          break;
        case 'left':
          newX = Math.max(0, x - 1);
          break;
        case 'right':
          newX = Math.min(MAZE_SIZE - 1, x + 1);
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
      const updatedCheckpoints = prev.checkpoints.map(cp =>
        cp.quiz.id === prev.currentQuiz?.id ? { ...cp, completed: correct } : cp
      );

      return {
        ...prev,
        checkpoints: updatedCheckpoints,
        completedCheckpoints: correct ? prev.completedCheckpoints + 1 : prev.completedCheckpoints,
        score: correct ? prev.score + 10 : prev.score,
        currentQuiz: null,
        showQuiz: false,
        gameStatus: 'playing',
        // Jika salah, kembalikan ke posisi awal (1,1)
        playerPosition: correct ? prev.playerPosition : { x: 1, y: 1 },
        // timeStarted tetap seperti sebelumnya
        timeStarted: prev.timeStarted + (Date.now() - prev.timeStarted - prev.timeElapsed * 1000)
      };
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
        />
      )}
    </div>
  );
};

export default GameScreen;