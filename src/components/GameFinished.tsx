import React from 'react';
import { Trophy, Clock, RotateCcw, Home, Star } from 'lucide-react';
import { formatTime } from '../utils/gameLogic';
import { isNewHighScore } from '../utils/localStorage';

interface GameFinishedProps {
  score: number;
  time: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const GameFinished: React.FC<GameFinishedProps> = ({ score, time, onPlayAgain, onBackToMenu }) => {
  const isHighScore = isNewHighScore(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl animate-bounce">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          {isHighScore && (
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">
                <Star className="w-5 h-5" />
                Skor Tertinggi Baru!
              </div>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat!
          </h1>
          <p className="text-gray-600 text-lg">
            Kamu berhasil menyelesaikan Labyrinth of Cultures!
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hasil Permainan</h2>
          </div>
          
          <div className="space-y-6">
            {/* Final Score */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <span className="text-3xl font-bold text-gray-800">{score}</span>
                  <span className="text-gray-600">poin</span>
                </div>
                <p className="text-gray-600 font-medium">Skor Total</p>
              </div>
            </div>

            {/* Completion Time */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-800">{formatTime(time)}</span>
                </div>
                <p className="text-gray-600 font-medium">Waktu Penyelesaian</p>
              </div>
            </div>
          </div>

          {/* Cultural Learning Message */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
            <p className="text-green-800 text-center font-medium">
              🎉 Kamu telah mempelajari keberagaman budaya Indonesia! 🇮🇩
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-6 h-6" />
            Main Lagi
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Home className="w-6 h-6" />
            Menu Utama
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-center">
          <div className="flex justify-center gap-2 text-2xl mb-2">
            🏛️ 🎭 🎵 🏠 👥
          </div>
          <p className="text-gray-500 text-sm">
            Terus jelajahi kekayaan budaya Indonesia!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameFinished;