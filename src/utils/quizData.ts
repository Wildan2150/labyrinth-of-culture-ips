import { Quiz } from '../types/gameTypes';

type CulturalItem = {
  name: string;
  origin: string;
};

const traditionalHouses: CulturalItem[] = [
  { name: "Joglo", origin: "Jawa Tengah" },
  { name: "Gadang", origin: "Sumatera Barat" },
  { name: "Honai", origin: "Papua" },
  { name: "Limas", origin: "Sumatera Selatan" },
  { name: "Baileo", origin: "Maluku" },
  { name: "Tongkonan", origin: "Sulawesi Selatan" },
  { name: "Rumah Panggung", origin: "Kalimantan" },
  { name: "Rumah Betang", origin: "Kalimantan Barat" }
];

const traditionalMusics: CulturalItem[] = [
  { name: "Angklung", origin: "Jawa Barat" },
  { name: "Gamelan", origin: "Jawa" },
  { name: "Sasando", origin: "Nusa Tenggara Timur" },
  { name: "Kolintang", origin: "Sulawesi Utara" },
  { name: "Tifa", origin: "Papua" },
  { name: "Kecapi", origin: "Jawa Barat" },
  { name: "Salung", origin: "Sumatera Barat" },
  { name: "Gordang", origin: "Sumatera Utara" }
];

const traditionalDances: CulturalItem[] = [
  { name: "Kecak", origin: "Bali" },
  { name: "Saman", origin: "Aceh" },
  { name: "Piring", origin: "Sumatera Barat" },
  { name: "Jaipong", origin: "Jawa Barat" },
  { name: "Reog Ponorogo", origin: "Jawa Timur" },
  { name: "Tor-Tor", origin: "Sumatera Utara" },
  { name: "Yospan", origin: "Papua" },
  { name: "Cakalele", origin: "Maluku" }
];

const ethnicGroups: CulturalItem[] = [
  { name: "Dayak", origin: "Kalimantan" },
  { name: "Asmat", origin: "Papua" },
  { name: "Toraja", origin: "Sulawesi Selatan" },
  { name: "Baduy", origin: "Banten" },
  { name: "Batak", origin: "Sumatera Utara" },
  { name: "Minangkabau", origin: "Sumatera Barat" },
  { name: "Sasak", origin: "Lombok" },
  { name: "Bugis", origin: "Sulawesi Selatan" }
];

const traditionalWeapons: CulturalItem[] = [
  { name: "Rencong", origin: "Aceh" },
  { name: "Kujang", origin: "Jawa Barat" },
  { name: "Keris", origin: "Jawa" },
  { name: "Mandau", origin: "Kalimantan" },
  { name: "Badik", origin: "Sulawesi" },
  { name: "Clurit", origin: "Jawa Timur" },
  { name: "Pedang Jenawi", origin: "Sumatera Barat" },
  { name: "Sumpit", origin: "Kalimantan" }
];

// Template soal untuk berbagai variasi
const questionTemplates = {
  house: [
    { template: (item: CulturalItem) => `Rumah adat ${item.name} berasal dari daerah mana?`, answerType: 'origin' as const },
    { template: (item: CulturalItem) => `Apa nama rumah adat khas ${item.origin}?`, answerType: 'name' as const },
    { template: (item: CulturalItem) => `Daerah ${item.origin} memiliki rumah adat bernama?`, answerType: 'name' as const }
  ],
  music: [
    { template: (item: CulturalItem) => `Alat musik ${item.name} berasal dari daerah mana?`, answerType: 'origin' as const },
    { template: (item: CulturalItem) => `Alat musik tradisional khas ${item.origin} adalah?`, answerType: 'name' as const },
    { template: (item: CulturalItem) => `Daerah ${item.origin} terkenal dengan alat musik bernama?`, answerType: 'name' as const }
  ],
  dance: [
    { template: (item: CulturalItem) => `Tarian ${item.name} berasal dari daerah mana?`, answerType: 'origin' as const },
    { template: (item: CulturalItem) => `Apa nama tarian tradisional dari ${item.origin}?`, answerType: 'name' as const },
    { template: (item: CulturalItem) => `Tarian khas ${item.origin} adalah?`, answerType: 'name' as const }
  ],
  ethnic: [
    { template: (item: CulturalItem) => `Suku ${item.name} berasal dari provinsi mana?`, answerType: 'origin' as const },
    { template: (item: CulturalItem) => `Apa nama suku asli dari daerah ${item.origin}?`, answerType: 'name' as const },
    { template: (item: CulturalItem) => `Suku yang mendiami wilayah ${item.origin} disebut?`, answerType: 'name' as const }
  ],
  weapon: [
    { template: (item: CulturalItem) => `Senjata tradisional ${item.name} berasal dari mana?`, answerType: 'origin' as const },
    { template: (item: CulturalItem) => `Senjata khas daerah ${item.origin} adalah?`, answerType: 'name' as const },
    { template: (item: CulturalItem) => `Apa nama senjata tradisional dari ${item.origin}?`, answerType: 'name' as const }
  ]
};

// Helper untuk shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Fungsi generate soal dari data dan template
type TemplateWithAnswerType = {
  template: (item: CulturalItem) => string;
  answerType: 'origin' | 'name';
};

function generateQuizFromData(
  data: CulturalItem[],
  templates: TemplateWithAnswerType[],
  category: string
): Quiz[] {
  return data.map((item, idx) => {
    // Pilih template random
    const { template, answerType } = templates[Math.floor(Math.random() * templates.length)];
    const question = template(item);

    let correct: string;
    let distractors: string[];
    if (answerType === 'origin') {
      correct = item.origin;
      distractors = data.filter(d => d.origin !== item.origin).map(d => d.origin);
    } else {
      correct = item.name;
      distractors = data.filter(d => d.name !== item.name).map(d => d.name);
    }
    const optionsRaw = shuffleArray([correct, ...shuffleArray(distractors).slice(0, 3)]);
    const correctAnswer = optionsRaw.indexOf(correct);

    return {
      id: `${category}-${idx + 1}`,
      question,
      options: optionsRaw,
      correctAnswer,
      category
    };
  });
}

// Generate semua soal
const quizData: Quiz[] = [
  ...generateQuizFromData(traditionalHouses, questionTemplates.house, "Rumah Adat"),
  ...generateQuizFromData(traditionalMusics, questionTemplates.music, "Alat Musik"),
  ...generateQuizFromData(traditionalDances, questionTemplates.dance, "Tarian Daerah"),
  ...generateQuizFromData(ethnicGroups, questionTemplates.ethnic, "Suku Bangsa"),
  ...generateQuizFromData(traditionalWeapons, questionTemplates.weapon, "Senjata Tradisional"),
];

// Fungsi untuk mengambil soal random tanpa duplikat id
export const getRandomQuiz = (usedIds: (string | number)[] = []): Quiz => {
  const availableQuizzes = quizData.filter(quiz => !usedIds.includes(quiz.id));
  if (availableQuizzes.length === 0) return quizData[0];

  const randomIndex = Math.floor(Math.random() * availableQuizzes.length);
  const selectedQuiz = availableQuizzes[randomIndex];

  // Acak opsi dan sesuaikan index jawaban benar
  const optionsWithIndex = selectedQuiz.options.map((option, idx) => ({
    option,
    originalIndex: idx,
  }));

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

export { quizData };