import React, { useEffect } from 'react';
import { Pencil, BookOpenCheck, Brain } from 'lucide-react';

interface LevelSelectorProps {
  open: boolean;
  onSelect: (params: { size: number; checkpointCount: number }) => void;
  onClose: () => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ open, onSelect, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-2xl w-auto p-8 relative">
        <button
          className="absolute top-3 right-4 text-2xl text-amber-500 hover:text-orange-600 font-bold transition-colors duration-150"
          onClick={onClose}
          aria-label="Tutup"
          style={{ lineHeight: 1 }}
        >
          ×
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pilih Tingkat Kesulitan</h2>
          <p className="text-gray-600">Tentukan tantanganmu sebelum memulai permainan!</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => onSelect({ size: 11, checkpointCount: 10 })}
            className="
      w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
      text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl
      transform hover:scale-105 transition-all duration-200 flex flex-col items-center gap-1
    "
          >
            <Pencil className="w-6 h-6 mb-1" />
            <span className="text-lg"> Easy <span className="text-xs font-normal">(11x11)</span></span>
            <span className="text-xs font-normal text-amber-50">Labirin kecil, 10 soal kuis.</span>
          </button>
          <button
            onClick={() => onSelect({ size: 19, checkpointCount: 20 })}
            className="
      w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700
      text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl
      transform hover:scale-105 transition-all duration-200 flex flex-col items-center gap-1
    "
          >
            <BookOpenCheck className="w-6 h-6 mb-1" />
            <span className="text-lg"> Normal <span className="text-xs font-normal">(19x19)</span></span>
            <span className="text-xs font-normal text-amber-50">Labirin sedang, 20 soal kuis.</span>
          </button>
          <button
            onClick={() => onSelect({ size: 35, checkpointCount: 30 })}
            className="
      w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
      text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl
      transform hover:scale-105 transition-all duration-200 flex flex-col items-center gap-1
    "
          >
            <Brain className="w-6 h-6 mb-1" />
            <span className="text-lg"> Hard <span className="text-xs font-normal">(35x35)</span></span>
            <span className="text-xs font-normal text-amber-50">Labirin besar, 30 soal kuis.</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;