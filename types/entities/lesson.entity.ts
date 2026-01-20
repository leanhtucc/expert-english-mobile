/**
 * Lesson Entity Types
 */

/**
 * Lesson difficulty levels
 */
export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Lesson model
 */
export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: LessonLevel;
  duration: number; // in minutes
  imageUrl?: string;
  videoUrl?: string;
  content?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Lesson progress tracking
 */
export interface LessonProgress {
  lessonId: string;
  userId: string;
  progress: number; // percentage 0-100
  completed: boolean;
  lastAccessedAt: string;
}
