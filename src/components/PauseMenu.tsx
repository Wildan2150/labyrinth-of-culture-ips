import React from 'react';
import { Play, Home } from 'lucide-react';

interface PauseMenuProps {
  onResume: () => void;
  onBackToMenu: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onBackToMenu }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Permainan Dijeda</h2>
          <p className="text-gray-600">Pilih untuk melanjutkan atau kembali ke menu</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onResume}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Lanjutkan
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;