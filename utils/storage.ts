import AsyncStorage from '@react-native-async-storage/async-storage';
import { Progress } from '@/types/challenges';

const PROGRESS_KEY = 'challenge_progress';

export const loadProgress = async (): Promise<Progress> => {
  try {
    const progressData = await AsyncStorage.getItem(PROGRESS_KEY);
    return progressData ? JSON.parse(progressData) : {};
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
};

export const saveProgress = async (progress: Progress): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const toggleChallengeCompletion = async (
  categoryId: string,
  challengeId: number
): Promise<Progress> => {
  const progress = await loadProgress();
  
  if (!progress[categoryId]) {
    progress[categoryId] = {};
  }
  
  progress[categoryId][challengeId] = !progress[categoryId][challengeId];
  await saveProgress(progress);
  
  return progress;
};

export const resetCategoryProgress = async (categoryId: string): Promise<Progress> => {
  const progress = await loadProgress();
  progress[categoryId] = {};
  await saveProgress(progress);
  
  return progress;
};

export const calculateCategoryProgress = (progress: Progress, categoryId: string, totalChallenges: number): number => {
  const categoryProgress = progress[categoryId] || {};
  const completedCount = Object.values(categoryProgress).filter(Boolean).length;
  return Math.round((completedCount / totalChallenges) * 100);
};