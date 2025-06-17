import { Quiz } from '../types/gameTypes';

export const quizData: Quiz[] = [
  {
    id: 1,
    question: "Rumah adat Joglo berasal dari daerah mana?",
    options: ["Jawa Tengah", "Sumatera Barat", "Bali", "Kalimantan"],
    correctAnswer: 0,
    category: "Rumah Adat"
  },
  {
    id: 2,
    question: "Alat musik tradisional Angklung berasal dari daerah?",
    options: ["Jakarta", "Jawa Barat", "Yogyakarta", "Bali"],
    correctAnswer: 1,
    category: "Alat Musik"
  },
  {
    id: 3,
    question: "Tarian Kecak berasal dari daerah mana?",
    options: ["Jawa Tengah", "Sumatera", "Bali", "Sulawesi"],
    correctAnswer: 2,
    category: "Tarian Daerah"
  },
  {
    id: 4,
    question: "Suku Dayak berasal dari pulau mana?",
    options: ["Sumatera", "Jawa", "Kalimantan", "Papua"],
    correctAnswer: 2,
    category: "Suku Bangsa"
  },
  {
    id: 5,
    question: "Rumah adat Gadang terdapat di daerah?",
    options: ["Sumatera Barat", "Sumatera Utara", "Riau", "Jambi"],
    correctAnswer: 0,
    category: "Rumah Adat"
  },
  {
    id: 6,
    question: "Alat musik Sasando berasal dari?",
    options: ["Bali", "Lombok", "Nusa Tenggara Timur", "Maluku"],
    correctAnswer: 2,
    category: "Alat Musik"
  },
  {
    id: 7,
    question: "Tarian Saman berasal dari daerah?",
    options: ["Aceh", "Sumatera Utara", "Riau", "Jambi"],
    correctAnswer: 0,
    category: "Tarian Daerah"
  },
  {
    id: 8,
    question: "Suku Asmat terkenal dengan kerajinan?",
    options: ["Batik", "Ukiran Kayu", "Tenun", "Keramik"],
    correctAnswer: 1,
    category: "Suku Bangsa"
  },
  {
    id: 9,
    question: "Rumah adat Honai terdapat di daerah?",
    options: ["Papua", "Maluku", "Sulawesi", "Kalimantan"],
    correctAnswer: 0,
    category: "Rumah Adat"
  },
  {
    id: 10,
    question: "Gamelan adalah alat musik tradisional dari?",
    options: ["Sumatera", "Jawa", "Kalimantan", "Sulawesi"],
    correctAnswer: 1,
    category: "Alat Musik"
  },
  {
    id: 11,
    question: "Tari Piring berasal dari daerah mana?",
    options: ["Sumatera Barat", "Bali", "Jawa Timur", "Sulawesi Selatan"],
    correctAnswer: 0,
    category: "Tarian Daerah"
  },
  {
    id: 12,
    question: "Senjata tradisional Rencong berasal dari?",
    options: ["Aceh", "Sumatera Selatan", "Jawa Barat", "Papua"],
    correctAnswer: 0,
    category: "Senjata Tradisional"
  },
  {
    id: 13,
    question: "Rumah adat Limas berasal dari daerah?",
    options: ["Sumatera Selatan", "Jawa Tengah", "Bali", "NTT"],
    correctAnswer: 0,
    category: "Rumah Adat"
  },
  {
    id: 14,
    question: "Alat musik Kolintang berasal dari?",
    options: ["Sulawesi Utara", "Sumatera Barat", "Bali", "Jawa Tengah"],
    correctAnswer: 0,
    category: "Alat Musik"
  },
  {
    id: 15,
    question: "Tari Jaipong berasal dari daerah?",
    options: ["Jawa Barat", "Jawa Timur", "Bali", "Sumatera Utara"],
    correctAnswer: 0,
    category: "Tarian Daerah"
  },
  {
    id: 16,
    question: "Suku Toraja berasal dari provinsi?",
    options: ["Sulawesi Selatan", "Sulawesi Utara", "Sumatera Barat", "Kalimantan Timur"],
    correctAnswer: 0,
    category: "Suku Bangsa"
  },
  {
    id: 17,
    question: "Rumah adat Baileo berasal dari?",
    options: ["Maluku", "Papua", "Jawa Barat", "Bali"],
    correctAnswer: 0,
    category: "Rumah Adat"
  },
  {
    id: 18,
    question: "Tari Reog Ponorogo berasal dari?",
    options: ["Jawa Timur", "Jawa Tengah", "Bali", "Sumatera Selatan"],
    correctAnswer: 0,
    category: "Tarian Daerah"
  },
  {
    id: 19,
    question: "Alat musik Tifa berasal dari?",
    options: ["Papua", "Jawa Barat", "Sumatera Barat", "Bali"],
    correctAnswer: 0,
    category: "Alat Musik"
  },
  {
    id: 20,
    question: "Suku Baduy berasal dari daerah?",
    options: ["Banten", "Jawa Tengah", "Sumatera Utara", "Sulawesi Selatan"],
    correctAnswer: 0,
    category: "Suku Bangsa"
  }
];

export const getRandomQuiz = (usedIds: number[] = []): Quiz => {
  const availableQuizzes = quizData.filter(quiz => !usedIds.includes(quiz.id));
  if (availableQuizzes.length === 0) return quizData[0];

  const randomIndex = Math.floor(Math.random() * availableQuizzes.length);
  const selectedQuiz = availableQuizzes[randomIndex];

  // Acak opsi dan sesuaikan index jawaban benar
  const optionsWithIndex = selectedQuiz.options.map((option, idx) => ({
    option,
    originalIndex: idx,
  }));

  // Fungsi shuffle sederhana
  for (let i = optionsWithIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
  }

  const shuffledOptions = optionsWithIndex.map(item => item.option);
  const newCorrectAnswer = optionsWithIndex.findIndex(item => item.originalIndex === selectedQuiz.correctAnswer);

  return {
    ...selectedQuiz,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer,
  };
};