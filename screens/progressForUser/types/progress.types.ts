export interface DailyProgress {
  day: string;
  value: number;
}

export interface SkillStat {
  id: string;
  name: string;
  nameEn: string;
  percent: number;
}

export interface WeekItem {
  id: number;
  label: string;
  status: 'done' | 'current' | 'locked';
}

export interface LessonItem {
  id: string;
  day: string;
  date: string;
  title: string;
  isToday: boolean;
  status: 'done' | 'current' | 'locked';
}

export interface ProgressData {
  streakDays: number;
  totalWords: number;
  wordsIncrease: number;
  weeklyProgress: DailyProgress[];
  skillIncrease: number;
  skillStats: SkillStat[];
  weekTimeline: WeekItem[];
  weeklyLessons: LessonItem[];
}
