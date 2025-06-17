import React from 'react';
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight, Smartphone } from 'lucide-react';

interface InstructionsProps {
  onBackToMenu: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onBackToMenu }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cara Bermain</h1>
          <p className="text-gray-600">Pelajari cara menjelajahi Labyrinth of Cultures</p>
        </div>

        {/* Instructions Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="space-y-8">
            {/* Movement Controls */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🎮 Kontrol Permainan
              </h3>
              
              {/* Desktop Controls */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                <h4 className="font-semibold text-gray-700 mb-3">Desktop:</h4>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <ArrowUp className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <ArrowDown className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-center mt-3">Gunakan tombol panah untuk bergerak</p>
              </div>

              {/* Mobile Controls */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Mobile/Tablet:
                </h4>
                <p className="text-gray-600">Gunakan tombol virtual di layar untuk bergerak</p>
              </div>
            </div>

            {/* Game Rules */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📜 Aturan Permainan
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <p className="text-gray-700">Bergeraklah dalam labirin menggunakan kontrol yang tersedia</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <p className="text-gray-700">Temukan checkpoint yang ditandai dengan ikon 📜</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <p className="text-gray-700">Jawab pertanyaan budaya Indonesia di setiap checkpoint</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <p className="text-gray-700">Jawaban benar membuka jalan baru dan menambah skor</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                  <div>
                    <p className="text-gray-700">Jawaban salah menghalangi jalan, coba lagi!</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                  <div>
                    <p className="text-gray-700">Capai garis finish (🏁) untuk menyelesaikan permainan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scoring */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🏆 Sistem Penilaian
              </h3>
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">+10 Poin</div>
                    <p className="text-gray-600">Setiap jawaban benar</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">⏱️ Waktu</div>
                    <p className="text-gray-600">Semakin cepat semakin baik</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🎯 Topik Pembelajaran
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">🏠</div>
                  <p className="font-semibold text-gray-700">Rumah Adat</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">🎭</div>
                  <p className="font-semibold text-gray-700">Tarian Daerah</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">🎵</div>
                  <p className="font-semibold text-gray-700">Alat Musik</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <p className="font-semibold text-gray-700">Suku Bangsa</p>
                </div>
              </div>
            </div>
          </div>
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

export default Instructions;