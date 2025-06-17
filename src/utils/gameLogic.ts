import { Position, MazeCell, Checkpoint, Quiz } from '../types/gameTypes';
import { getRandomQuiz } from './quizData';

export const MAZE_SIZE = 20;

// Complex maze layout with strategically placed checkpoints
export const createMaze = (): MazeCell[][] => {
const maze: MazeCell[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0],
  [0,2,1,1,1,0,1,2,1,0,1,0,1,0,2,1,1,0,1,0],
  [0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0],
  [0,1,1,2,1,1,1,1,1,1,2,0,1,0,1,1,1,0,2,0],
  [0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,1,0,1,0,1,1,2,0,1,1,1,2,0,1,0,1,1,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0],
  [0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0],
  [0,1,0,1,1,2,0,1,0,0,0,0,0,0,2,0,0,0,1,0],
  [0,1,0,0,0,1,0,1,1,1,1,2,1,1,1,1,1,0,1,0],
  [0,2,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
  [0,0,0,1,0,1,0,1,1,2,1,1,1,1,1,0,1,0,1,0],
  [0,1,1,1,0,1,1,1,1,0,1,0,0,0,1,0,1,0,2,0],
  [0,1,0,0,0,0,0,0,0,0,1,1,2,0,1,0,1,0,0,0],
  [0,2,0,1,1,2,1,1,1,1,1,0,0,0,1,2,1,1,1,0],
  [0,0,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
  
  return maze;
};

// ... sisa kode Anda (getCheckpointPositions, dll.) tidak perlu diubah.
export const getCheckpointPositions = (maze: MazeCell[][]): Position[] => {
  const positions: Position[] = [];
  
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === 2) {
        positions.push({ x, y });
      }
    }
  }
  
  return positions;
};

export const createCheckpoints = (positions: Position[]): Checkpoint[] => {
  const usedQuizIds: number[] = [];
  
  return positions.map((position, index) => {
    const quiz = getRandomQuiz(usedQuizIds);
    usedQuizIds.push(quiz.id); // Tambahkan id quiz yang sudah dipakai
    return {
      position,
      quiz,
      completed: false
    };
  });
};

export const canMoveTo = (x: number, y: number, maze: MazeCell[][]): boolean => {
  if (x < 0 || x >= MAZE_SIZE || y < 0 || y >= MAZE_SIZE) {
    return false;
  }
  
  return maze[y][x] !== 0; // Can move to any cell that's not a wall
};

export const isFinishPosition = (x: number, y: number, maze: MazeCell[][]): boolean => {
  return maze[y][x] === 3;
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};