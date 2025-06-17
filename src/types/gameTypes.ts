export interface Position {
  x: number;
  y: number;
}

export interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface Checkpoint {
  position: Position;
  quiz: Quiz;
  completed: boolean;
}

export interface GameState {
  playerPosition: Position;
  score: number;
  timeStarted: number;
  timeElapsed: number;
  checkpoints: Checkpoint[];
  completedCheckpoints: number;
  gameStatus: 'menu' | 'playing' | 'paused' | 'finished' | 'instructions' | 'highscores';
  currentQuiz: Quiz | null;
  showQuiz: boolean;
}

export interface HighScore {
  score: number;
  time: number;
  date: string;
}

export type MazeCell = 0 | 1 | 2 | 3; // 0: wall, 1: path, 2: checkpoint, 3: finish