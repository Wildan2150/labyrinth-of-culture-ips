import { HighScore } from '../types/gameTypes';

const HIGH_SCORES_KEY = 'labyrinth-cultures-highscores';

export const getHighScores = (): HighScore[] => {
  try {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch {
    return [];
  }
};

export const saveHighScore = (score: number, time: number): void => {
  try {
    const scores = getHighScores();
    const newScore: HighScore = {
      score,
      time,
      date: new Date().toLocaleDateString('id-ID')
    };
    
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score || a.time - b.time);
    
    // Keep only top 10 scores
    const topScores = scores.slice(0, 10);
    
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(topScores));
  } catch (error) {
    console.error('Failed to save high score:', error);
  }
};

export const isNewHighScore = (score: number): boolean => {
  const scores = getHighScores();
  return scores.length < 10 || score > scores[scores.length - 1].score;
};