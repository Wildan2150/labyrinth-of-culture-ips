import { useState } from 'react';
import MainMenu from './components/MainMenu';
import Instructions from './components/Instructions';
import HighScores from './components/HighScores';
import GameScreen from './components/GameScreen';
import GameFinished from './components/GameFinished';
import { saveHighScore } from './utils/localStorage';

type GameView = 'menu' | 'instructions' | 'highscores' | 'playing' | 'finished';

function App() {
  const [currentView, setCurrentView] = useState<GameView>('menu');
  const [gameResults, setGameResults] = useState<{ score: number; time: number } | null>(null);
  const [mazeSize, setMazeSize] = useState(19);
  const [checkpointCount, setCheckpointCount] = useState(20);

const handleStartGame = (size: number, checkpointCount: number) => {
    setMazeSize(size);
    setCheckpointCount(checkpointCount);
    setCurrentView('playing');
    setGameResults(null);
  };

  const handleGameFinish = (score: number, time: number) => {
    saveHighScore(score, time);
    setGameResults({ score, time });
    setCurrentView('finished');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    setGameResults(null);
  };

  const handleShowInstructions = () => {
    setCurrentView('instructions');
  };

  const handleShowHighScores = () => {
    setCurrentView('highscores');
  };

  const handlePlayAgain = () => {
    setCurrentView('playing');
    setGameResults(null);
  };

  switch (currentView) {
    case 'instructions':
      return <Instructions onBackToMenu={handleBackToMenu} />;
    
    case 'highscores':
      return <HighScores onBackToMenu={handleBackToMenu} />;
    
    case 'playing':
      return (
        <GameScreen 
          onGameFinish={handleGameFinish}
          onBackToMenu={handleBackToMenu}
          mazeSize={mazeSize}
          checkpointCount={checkpointCount}
        />
      );
    
    case 'finished':
      return gameResults ? (
        <GameFinished
          score={gameResults.score}
          time={gameResults.time}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      ) : null;
    
    default:
      return (
        <MainMenu
          onStartGame={handleStartGame}
          onShowInstructions={handleShowInstructions}
          onShowHighScores={handleShowHighScores}
        />
      );
  }
}

export default App;