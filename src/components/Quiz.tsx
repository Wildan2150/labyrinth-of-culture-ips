import React, { useState, useEffect } from 'react';
import { Quiz as QuizType } from '../types/gameTypes';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
  quiz: QuizType;
  onAnswer: (correct: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === quiz.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(correct);
    }, 1200);
  };

  // Tambahkan event listener untuk key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResult) return;
      const key = e.key.toLowerCase();
      if (key === 'a') handleAnswer(0);
      if (key === 'b') handleAnswer(1);
      if (key === 'c') handleAnswer(2);
      if (key === 'd') handleAnswer(3);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showResult]);

  const getOptionClass = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'bg-blue-500 text-white transform scale-105'
        : 'bg-white hover:bg-blue-50 hover:scale-105';
    }

    if (index === quiz.correctAnswer) {
      return 'bg-green-500 text-white';
    }

    if (index === selectedAnswer && !isCorrect) {
      return 'bg-red-500 text-white';
    }

    return 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform">
        {/* Quiz Header */}
        <div className="flex flex-row items-center justify-center text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-2">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {quiz.category}
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
          {quiz.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-2xl border-2 border-gray-200 text-left font-medium transition-all duration-300 shadow-sm ${getOptionClass(index)}`}
            >
              <div className="flex items-center justify-between">
                <span>
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </span>
                {showResult && index === quiz.correctAnswer && (
                  <CheckCircle className="w-6 h-6" />
                )}
                {showResult && index === selectedAnswer && !isCorrect && (
                  <XCircle className="w-6 h-6" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Result Message */}
        {showResult && (
          <div className={`text-center p-4 rounded-2xl ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
              <span className="font-bold">
                {isCorrect ? 'Benar!' : 'Salah!'}
              </span>
            </div>
            <p className="text-sm">
              {isCorrect
                ? 'Jawaban kamu benar! Silakan lanjut ke checkpoint berikutnya.'
                : 'Jawaban belum tepat. Yuk, coba lagi!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;