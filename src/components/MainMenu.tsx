import React from 'react';
import { Play, HelpCircle, Trophy, Palette } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
  onShowInstructions: () => void;
  onShowHighScores: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onShowInstructions, onShowHighScores }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-6 shadow-xl">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Labyrinth of
          </h1>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Cultures
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Jelajahi Keberagaman Budaya Indonesia
          </p>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            Mulai Bermain
          </button>

          <button
            onClick={onShowInstructions}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <HelpCircle className="w-6 h-6" />
            Cara Bermain
          </button>

          <button
            onClick={onShowHighScores}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Trophy className="w-6 h-6" />
            Skor Tertinggi
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-4 text-2xl">
            🏛️ 🎭 🎵 🏠
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Rumah Adat • Tarian • Musik • Suku Bangsa
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;