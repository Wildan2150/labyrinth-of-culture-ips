# Labyrinth of Cultures

An educational maze game about Indonesian culture, built with React, TypeScript, and Tailwind CSS.

## Features

- Dynamic maze generator with selectable difficulty levels (Easy, Normal, Hard)
- Explore a maze filled with checkpoints and quizzes
- Answer multiple-choice questions about Indonesian culture at each checkpoint
- Score points for correct answers and race against the clock
- High score leaderboard (stored in browser local storage)
- Responsive design with keyboard and virtual controls (mobile-friendly)
- Beautiful UI with Lucide icons and Tailwind CSS

## Game Mechanics

- Choose your level:  
  - **Easy:** 11x11 maze  
  - **Normal:** 19x19 maze  
  - **Hard:** 35x35 maze
- Navigate the maze using keyboard arrows or on-screen controls
- Reach checkpoints scattered throughout the maze
- At each checkpoint, answer a quiz about Indonesian culture
- Correct answers earn you points; incorrect answers return you to the last completed checkpoint
- You must visit and complete all checkpoints before finishing the maze
- The game is timed—try to finish and answer all quizzes as quickly as possible
- Your score is based on correct answers and completion time
- High scores are saved locally in your browser

## Game Rules

1. Start at the maze entrance.
2. Move through the maze to find checkpoints.
3. At each checkpoint, answer the quiz to proceed.
4. Only one answer can be selected per quiz.
5. Incorrect answers will return you to the last completed checkpoint.
6. You cannot finish the maze before visiting all checkpoints.
7. The game ends when you reach the maze exit after completing all checkpoints.
8. Try to achieve the highest score by answering correctly and finishing quickly.

## Level Selector

- Before starting, you can choose the difficulty level via a popup:
  - **Easy:** Small maze (11x11), suitable for beginners.
  - **Normal:** Medium maze (19x19), balanced challenge.
  - **Hard:** Large maze (35x35), for experienced players.
- The level affects the maze size and number of checkpoints.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/labirin-of-culture.git
   cd labirin-of-culture
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Project Structure

- `src/` — Main source code
  - `components/` — React components (Maze, GameUI, Quiz, MainMenu, etc.)
  - `types/` — TypeScript types
  - `utils/` — Game logic, maze generator, quiz data, local storage helpers
- `public/` — Static assets (if needed)
- `index.html` — Main HTML entry point

## Customization

- Add or edit quiz questions in [`src/utils/quizData.ts`](src/utils/quizData.ts).
- Adjust maze generation logic in [`src/utils/gameLogic.ts`](src/utils/gameLogic.ts).

## Credits

- UI icons by [Lucide React](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/).

---

Enjoy exploring the diversity of Indonesian