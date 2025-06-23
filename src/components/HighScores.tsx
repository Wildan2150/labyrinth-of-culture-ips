import React from 'react';
import { ArrowLeft, Trophy, Clock, Calendar } from 'lucide-react';
import { getHighScores } from '../utils/localStorage';
import { formatTime } from '../utils/gameLogic';

interface HighScoresProps {
  onBackToMenu: () => void;
}

const HighScores: React.FC<HighScoresProps> = ({ onBackToMenu }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBackToMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBackToMenu]);


  const highScores = getHighScores();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-xl">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Skor Tertinggi</h1>
          <p className="text-gray-600">Para penjelajah budaya terbaik</p>
        </div>

        {/* High Scores List */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          {highScores.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Belum Ada Skor</h3>
              <p className="text-gray-500">Jadilah yang pertama menyelesaikan labirin!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {highScores.map((score, index) => (
                <div
                  key={index}
                  className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                          index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-400 text-white' :
                            'bg-gray-100 text-gray-600'
                      }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-800">{score.score}</span>
                        <span className="text-gray-500">poin</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(score.time)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {score.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {index === 0 && (
                    <div className="text-2xl">👑</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighScores;