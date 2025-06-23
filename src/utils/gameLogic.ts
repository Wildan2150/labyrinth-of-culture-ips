import type { Position, MazeCell, Checkpoint } from '../types/gameTypes';
import { getRandomQuiz } from './quizData';


function shuffle<T>(arr: T[]): T[] {
  return arr
    .map((v) => [Math.random(), v] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map(([, v]) => v);
}

// Complex maze layout with strategically placed checkpoints
export const createMaze = (size: number, checkpointCount: number): MazeCell[][] => {
  const maze: MazeCell[][] = Array.from({ length: size }, () => Array(size).fill(0));

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

  // Helper: Cek apakah cell (x, y) tidak berdempetan dengan checkpoint lain
  function isNotAdjacent(x: number, y: number, checkpoints: [number, number][], minDistance: number = 1) {
    return checkpoints.every(([cx, cy]) => {
      const distance = Math.abs(cx - x) + Math.abs(cy - y); // Manhattan distance
      return distance > minDistance;
    });
  }

  carve(1, 1);

  // Cari cell path terjauh dari start (1,1) dengan BFS
  const [fx, fy] = bfsFarthestCell(1, 1, maze);
  maze[fy][fx] = 3;

  // Kumpulkan semua path cells (exclude start dan finish)
  const pathCells: [number, number][] = [];
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      if (maze[y][x] === 1 && !(x === 1 && y === 1) && !(x === fx && y === fy)) {
        pathCells.push([x, y]);
      }
    }
  }

  // Pastikan kita punya cukup path cells
  if (pathCells.length < checkpointCount) {
    console.warn(`Path cells (${pathCells.length}) kurang dari checkpoint yang diminta (${checkpointCount}). Membuat ulang maze...`);
    return createMaze(size, checkpointCount);
  }

  let chosenCheckpoints: [number, number][] = [];

  // Strategi 1: Coba dengan jarak optimal
  let maxDistance = Math.floor(Math.sqrt(pathCells.length / checkpointCount));

  for (let minDistance = maxDistance; minDistance >= 0 && chosenCheckpoints.length < checkpointCount; minDistance--) {
    chosenCheckpoints = [];
    const shuffled = shuffle([...pathCells]);

    for (const [x, y] of shuffled) {
      if (chosenCheckpoints.length >= checkpointCount) break;
      if (minDistance === 0 || isNotAdjacent(x, y, chosenCheckpoints, minDistance)) {
        chosenCheckpoints.push([x, y]);
      }
    }
  }

  // Strategi 2: Jika masih kurang, gunakan grid-based placement
  if (chosenCheckpoints.length < checkpointCount) {
    chosenCheckpoints = [];
    const gridSize = Math.ceil(Math.sqrt(checkpointCount));
    const stepX = Math.max(1, Math.floor((size - 2) / gridSize));
    const stepY = Math.max(1, Math.floor((size - 2) / gridSize));

    // Cari checkpoint dengan pola grid
    for (let gy = 0; gy < gridSize && chosenCheckpoints.length < checkpointCount; gy++) {
      for (let gx = 0; gx < gridSize && chosenCheckpoints.length < checkpointCount; gx++) {
        const centerX = 1 + (gx * stepX) + Math.floor(stepX / 2);
        const centerY = 1 + (gy * stepY) + Math.floor(stepY / 2);

        // Cari path cell terdekat dari center grid
        let bestCell: [number, number] | null = null;
        let bestDistance = Infinity;

        for (const [px, py] of pathCells) {
          if (chosenCheckpoints.some(([cx, cy]) => cx === px && cy === py)) continue;

          const dist = Math.abs(px - centerX) + Math.abs(py - centerY);
          if (dist < bestDistance) {
            bestDistance = dist;
            bestCell = [px, py];
          }
        }

        if (bestCell) {
          chosenCheckpoints.push(bestCell);
        }
      }
    }
  }

  // Strategi 3: Paksa ambil cell acak jika masih kurang
  if (chosenCheckpoints.length < checkpointCount) {
    const remainingCells = pathCells.filter(([x, y]) =>
      !chosenCheckpoints.some(([cx, cy]) => cx === x && cy === y)
    );

    const shuffledRemaining = shuffle(remainingCells);
    const needed = checkpointCount - chosenCheckpoints.length;

    for (let i = 0; i < needed && i < shuffledRemaining.length; i++) {
      chosenCheckpoints.push(shuffledRemaining[i]);
    }
  }

  // Strategi 4: Terakhir, jika masih tidak cukup, buat ulang maze
  if (chosenCheckpoints.length < checkpointCount) {
    console.warn(`Gagal membuat ${checkpointCount} checkpoint setelah semua strategi. Membuat ulang maze...`);
    return createMaze(size, checkpointCount);
  }

  // Potong jika berlebih (safety net)
  chosenCheckpoints = chosenCheckpoints.slice(0, checkpointCount);

  // Tempatkan checkpoint ke maze
  for (const [x, y] of chosenCheckpoints) {
    maze[y][x] = 2;
  }

  // Pastikan start position tetap sebagai path
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