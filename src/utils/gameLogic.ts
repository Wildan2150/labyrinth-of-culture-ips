import type { Position, MazeCell, Checkpoint } from '../types/gameTypes';
import { getRandomQuiz } from './quizData';


function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((v) => [Math.random(), v] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => v);
}

// Complex maze layout with strategically placed checkpoints
export const createMaze = (size: number): MazeCell[][] => {
    const maze: MazeCell[][] = Array.from({ length: size }, () =>
    Array(size).fill(0)
  );

  function carve(x: number, y: number) {
    maze[y][x] = 1;
    const dirs = shuffle([
      [0, -2],
      [2, 0],
      [0, 2],
      [-2, 0],
    ]);
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx > 0 && nx < size - 1 &&
        ny > 0 && ny < size - 1 &&
        maze[ny][nx] === 0
      ) {
        maze[y + dy / 2][x + dx / 2] = 1;
        carve(nx, ny);
      }
    }
  }
  function bfsFarthestCell(startX: number, startY: number, maze: MazeCell[][]): [number, number] {
    const visited = Array.from({ length: maze.length }, () => Array(maze.length).fill(false));
    const queue: Array<{ x: number, y: number, dist: number }> = [{ x: startX, y: startY, dist: 0 }];
    visited[startY][startX] = true;
    let farthest = { x: startX, y: startY, dist: 0 };

    const dirs = [
      [0, 1], [1, 0], [0, -1], [-1, 0]
    ];

    while (queue.length > 0) {
      const { x, y, dist } = queue.shift()!;
      if (dist > farthest.dist) {
        farthest = { x, y, dist };
      }
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx > 0 && nx < maze.length - 1 &&
          ny > 0 && ny < maze.length - 1 &&
          !visited[ny][nx] &&
          maze[ny][nx] === 1
        ) {
          visited[ny][nx] = true;
          queue.push({ x: nx, y: ny, dist: dist + 1 });
        }
      }
    }
    return [farthest.x, farthest.y];
  }
  carve(1, 1);

  // Cari cell path terjauh dari start (1,1) dengan BFS
  const [fx, fy] = bfsFarthestCell(1, 1, maze);
  maze[fy][fx] = 3;

  function isFarEnough(x: number, y: number, checkpoints: [number, number][], minDist: number): boolean {
    return checkpoints.every(([cx, cy]) => {
      const dist = Math.abs(cx - x) + Math.abs(cy - y);
      return dist >= minDist;
    });
  }
  // Tempatkan beberapa checkpoint secara acak di path
  const pathCells: [number, number][] = [];
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      if (maze[y][x] === 1) pathCells.push([x, y]);
    }
  }
  const checkpointCount = 20;
  const minCheckpointDist = 3; // minimal jarak antar checkpoint (bisa diubah)
  const chosenCheckpoints: [number, number][] = [];

  for (const [x, y] of shuffle(pathCells)) {
    if (chosenCheckpoints.length >= checkpointCount) break;
    if (isFarEnough(x, y, chosenCheckpoints, minCheckpointDist)) {
      chosenCheckpoints.push([x, y]);
      maze[y][x] = 2;
    }
  }

  maze[1][1] = 1;
  return maze;
};

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
  const usedQuizIds: string[] = [];

  return positions.map((position) => {
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
  if (x < 0 || x >= maze.length || y < 0 || y >= maze.length) {
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