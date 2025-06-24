import React from 'react';
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight, Smartphone, Monitor } from 'lucide-react';

interface InstructionsProps {
  onBackToMenu: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onBackToMenu }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBackToMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBackToMenu]);


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
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"> 
                  <Monitor className="w-6 h-6" /> 
                  Desktop:
                  </h4>
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
                <p className="text-gray-600 text-center mt-3">
                  Gunakan tombol panah di keyboard untuk bergerak
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-4 mb-1">
                    {['A', 'B', 'C', 'D'].map((key) => (
                      <span
                        key={key}
                        className="w-12 h-12 inline-flex items-center justify-center bg-white shadow-md px-3 py-1 rounded-lg text-xl font-semibold text-gray-600"
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-center mt-2">
                    Tombol <span className="font-semibold">A</span>, <span className="font-semibold">B</span>, <span className="font-semibold">C</span>, atau <span className="font-semibold">D</span> di keyboard dapat digunakan untuk memilih jawaban saat kuis muncul
                  </p>
                </div>
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
                  <div className="w-8 min-w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <p className="text-gray-700">Bergeraklah dalam labirin menggunakan kontrol yang tersedia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 min-w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <p className="text-gray-700">Temukan checkpoint yang ditandai dengan ikon 📜</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 min-w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <p className="text-gray-700">Jawab pertanyaan budaya Indonesia di setiap checkpoint</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 min-w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <p className="text-gray-700">Jawaban benar akan menambah skor dan dapat melanjutkan perjalanan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 min-w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                  <div>
                    <p className="text-gray-700">Jawaban salah akan mengembalikan pemain ke lokasi awal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 min-w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                  <div>
                    <p className="text-gray-700">Capai garis finish (🏁) untuk menyelesaikan permainan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Selector Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🎚️ Pilihan Level
              </h3>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 mb-2">
                  Sebelum memulai permainan, kamu dapat memilih tingkat kesulitan:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    <span className="font-semibold text-green-700">Easy</span>: Labirin kecil (11x11), 10 soal kuis.
                  </li>
                  <li>
                    <span className="font-semibold text-yellow-700">Normal</span>: Labirin sedang (19x19), 20 soal kuis.
                  </li>
                  <li>
                    <span className="font-semibold text-red-700">Hard</span>: Labirin besar (35x35), 30 soal kuis.
                  </li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Pilihan level akan mempengaruhi ukuran dan tingkat kesulitan labirin.
                </p>
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
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <p className="font-semibold text-gray-700">Suku Bangsa</p>
                </div>
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
                <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl p-4 text-center col-span-2">
                  <div className="text-2xl mb-2">⚔️</div>
                  <p className="font-semibold text-gray-700">Senjata Tradisional</p>
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