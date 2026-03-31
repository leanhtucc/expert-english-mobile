import { ProgressData } from '../types/progress.types';

export const MOCK_PROGRESS_DATA: ProgressData = {
  streakDays: 7,
  totalWords: 350,
  wordsIncrease: 15,
  weeklyProgress: [
    { day: 'MON', value: 15 },
    { day: 'TUE', value: 25 },
    { day: 'WED', value: 15 },
    { day: 'THU', value: 15 },
    { day: 'FRI', value: 25 },
    { day: 'SAT', value: 30 },
    { day: 'SUN', value: 20 },
  ],
  skillIncrease: 18,
  skillStats: [
    { id: '1', name: 'Phát âm', nameEn: 'Pronunciation', percent: 22 },
    { id: '2', name: 'Phản xạ', nameEn: 'Fluency', percent: 14 },
  ],
  weekTimeline: [
    { id: 1, label: 'Tuần 1', status: 'done' },
    { id: 2, label: 'Đang học', status: 'current' },
    { id: 3, label: 'Tuần 3', status: 'locked' },
    { id: 4, label: 'Tuần 4', status: 'locked' },
  ],
  weeklyLessons: [
    {
      id: 'l1',
      day: 'MON',
      date: 'JUL 10',
      title: 'Fundamentals & Jargon',
      isToday: false,
      status: 'done',
    },
    {
      id: 'l2',
      day: 'TUE',
      date: 'TODAY',
      title: 'Vocabulary & Speaking',
      isToday: true,
      status: 'current',
    },
    {
      id: 'l3',
      day: 'WED',
      date: 'JUL 12',
      title: 'Email Etiquette & Tone',
      isToday: false,
      status: 'locked',
    },
    {
      id: 'l4',
      day: 'THU',
      date: 'JUL 13',
      title: 'Email Etiquette & Tone',
      isToday: false,
      status: 'locked',
    },
  ],
};
