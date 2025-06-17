import React from 'react';
import { Pause, Trophy, Clock, MapPin } from 'lucide-react';
import { formatTime } from '../utils/gameLogic';

interface GameUIProps {
  score: number;
  timeElapsed: number;
  completedCheckpoints: number;
  totalCheckpoints: number;
  onPause: () => void;
}

const GameUI: React.FC<GameUIProps> = ({ 
  score, 
  timeElapsed, 
  completedCheckpoints, 
  totalCheckpoints, 
  onPause 
}) => {
  return (
    <div className="fixed top-4 left-4 right-4 z-40">
      <div className="flex justify-between items-center">
        {/* Left side - Game stats */}
        <div className="flex gap-4">
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-gray-800">{score}</span>
          </div>
          
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-800">{formatTime(timeElapsed)}</span>
          </div>
          
          <div className="bg-white bg-opacity-95 rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="font-bold text-gray-800">{completedCheckpoints}/{totalCheckpoints}</span>
          </div>
        </div>

        {/* Right side - Pause button */}
        <button
          onClick={onPause}
          className="bg-white bg-opacity-95 hover:bg-opacity-100 rounded-2xl shadow-lg p-3 transition-all duration-200 hover:scale-105"
        >
          <Pause className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default GameUI;