export type ModuleStatus = 'available' | 'in_progress' | 'completed' | 'locked';

export type LessonStatus = 'available' | 'completed' | 'locked';

export type LessonSkill = 'speaking' | 'vocabulary' | 'writing' | 'listening' | 'grammar';

export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  xp: number;
  status: LessonStatus;
  skill: LessonSkill;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  level: string;
  color: string;
  status: ModuleStatus;
  totalLessons: number;
  completedLessons: number;
  totalXP: number;
  lessons: LessonItem[];
}

export type LessonFilter = 'all' | 'in_progress' | 'available' | 'completed' | 'locked';
