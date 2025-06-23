import AsyncStorage from '@react-native-async-storage/async-storage';
import { Progress } from '@/types/challenges';

const PROGRESS_KEY = 'challenge_progress';
const isWeb = typeof window !== 'undefined';

export const loadProgress = async (): Promise<Progress> => {
  try {
    if (isWeb) {
      const progressData = localStorage.getItem(PROGRESS_KEY);
      return progressData ? JSON.parse(progressData) : {};
    } else {
      const progressData = await AsyncStorage.getItem(PROGRESS_KEY);
      return progressData ? JSON.parse(progressData) : {};
    }
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
};

export const saveProgress = async (progress: Progress): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } else {
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const toggleChallengeCompletion = async (
  categoryId: string,
  day: number,
  taskId: number
): Promise<Progress> => {
  const progress = await loadProgress();
  if (!progress[categoryId]) {
    progress[categoryId] = {};
  }
  if (!progress[categoryId][day]) {
    progress[categoryId][day] = {};
  }
  progress[categoryId][day][taskId] = !progress[categoryId][day][taskId];
  await saveProgress(progress);
  return progress;
};

export const resetCategoryProgress = async (categoryId: string): Promise<Progress> => {
  const progress = await loadProgress();
  progress[categoryId] = {};
  await saveProgress(progress);
  return progress;
};