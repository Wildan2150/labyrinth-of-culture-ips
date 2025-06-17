# Labyrinth of Cultures

An educational maze game about Indonesian culture, built with React, TypeScript, and Tailwind CSS.

## Game Mechanics

- Navigate a 20x20 maze using keyboard arrows or on-screen controls.
- Reach checkpoints scattered throughout the maze.
- At each checkpoint, answer a multiple-choice quiz about Indonesian culture.
- Correct answers earn you points; incorrect answers do not.
- The game is timed—try to finish the maze and answer all quizzes as quickly as possible.
- Your score is based on correct answers and completion time.
- High scores are saved locally in your browser.

## Game Rules

1. Start at the maze entrance.
2. Move through the maze to find checkpoints.
3. You must answer the quiz at each checkpoint to proceed.
4. Only one answer can be selected per quiz.
5. You cannot skip checkpoints or quizzes.
6. The game ends when you reach the maze exit.
7. Try to achieve the highest score by answering correctly and finishing quickly.

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
  - `components/` — React components (Maze, GameUI, Quiz, etc.)
  - `types/` — TypeScript types
  - `utils/` — Game logic, quiz data, local storage helpers
- `public/` — Static assets (if needed)
- `index.html` — Main HTML entry point

## Customization

- Add or edit quiz questions in [`src/utils/quizData.ts`](src/utils/quizData.ts).
- Adjust maze layout in [`src/utils/gameLogic.ts`](src/utils/gameLogic.ts).

## Credits

- UI icons by [Lucide React](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/).

---

Enjoy exploring the diversity of Indonesian culture!
