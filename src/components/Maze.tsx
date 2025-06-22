import React from 'react';
import { Position, MazeCell } from '../types/gameTypes';

interface MazeProps {
  maze: MazeCell[][];
  playerPosition: Position;
  checkpoints: Array<{ position: Position; completed: boolean }>;
}

const Maze: React.FC<MazeProps> = ({ maze, playerPosition, checkpoints }) => {
  const getCellClass = (cell: MazeCell, x: number, y: number) => {
    const baseClass = "w-4 h-4 md:w-10 md:h-10";

    switch (cell) {
      case 0: // Wall
        return `${baseClass} bg-gradient-to-br from-amber-800 to-amber-900 border border-amber-700 shadow-inner`;
      case 1: // Path
        return `${baseClass} bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200`;
      case 2: // Checkpoint
        return `${baseClass} border-none shadow-none`;
      case 3: // Finish
        return `${baseClass} bg-gradient-to-br from-green-400 to-green-500 border border-green-600 animate-pulse shadow-lg`;
      default:
        return `${baseClass} bg-gray-300`;
    }
  };

  const getCellContent = (cell: MazeCell, x: number, y: number) => {
  const isPlayerHere = playerPosition.x === x && playerPosition.y === y;

  switch (cell) {
    case 2: { // Checkpoint
      const checkpoint = checkpoints.find(cp => cp.position.x === x && cp.position.y === y);
      const isCompleted = checkpoint?.completed;

      return (
        <div className="w-full h-full flex items-center justify-center text-xs relative">
          {/* Layer background */}
          <div
            className={`absolute inset-0 rounded-sm bg-gradient-to-br from-blue-200 to-blue-300 border border-blue-400 transition-all duration-200 ${isCompleted ? 'opacity-50' : ''}`}
            style={{ zIndex: 0 }}
          />
          {/* Layer isi */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {isPlayerHere ? (
              <span className="text-base md:text-lg animate-bounce">👨‍🎓</span>
            ) : isCompleted ? (
              '✅'
            ) : (
              '📜'
            )}
          </div>
        </div>
      );
    }
    case 3: { // Finish
      const isPlayerHere = playerPosition.x === x && playerPosition.y === y;
      return (
        <div className="w-full h-full flex items-center justify-center text-xs relative">
          <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-green-400 to-green-500 border border-green-600 animate-pulse shadow-lg" style={{ zIndex: 0 }} />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {isPlayerHere ? (
              <span className="text-base md:text-lg animate-bounce">👨‍🎓</span>
            ) : (
              '🏁'
            )}
          </div>
        </div>
      );
    }
    default: {
      const isPlayerHere = playerPosition.x === x && playerPosition.y === y;
      return isPlayerHere ? (
        <span className="text-base md:text-lg animate-bounce">👨‍🎓</span>
      ) : null;
    }
  }
};

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-orange-100 to-amber-200 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 mt-16 md:mt-0">
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${maze.length}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${maze.length}, minmax(0, 1fr))`,
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`${getCellClass(cell, x, y)} rounded-sm flex items-center justify-center relative transition-all duration-200`}
              >
                {getCellContent(cell, x, y)}
              </div>
            ))
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-800 rounded-sm"></div>
            <span>Dinding</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-100 rounded-sm"></div>
            <span>Jalan</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
            <span>Quiz</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span>Finish</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maze;