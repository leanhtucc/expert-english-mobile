import { LessonSummaryData } from '../result/SessonSummaryScreen';

export const mockLessonResultExcellent: LessonSummaryData = {
  totalWords: 20,
  accuracy: 95,
  timeSpent: '5:30',
  masteredWords: 19,
  streak: 7,
};

export const mockLessonResultGood: LessonSummaryData = {
  totalWords: 15,
  accuracy: 80,
  timeSpent: '4:20',
  masteredWords: 12,
  streak: 3,
};

export const mockLessonResultAverage: LessonSummaryData = {
  totalWords: 12,
  accuracy: 67,
  timeSpent: '6:15',
  masteredWords: 8,
  streak: 1,
};

export const mockLessonResultNeedsWork: LessonSummaryData = {
  totalWords: 10,
  accuracy: 50,
  timeSpent: '8:00',
  masteredWords: 5,
};
