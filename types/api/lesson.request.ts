import type { LessonLevel } from '../entities';

/**
 * Lesson API Request Types
 */

/**
 * Create lesson request
 */
export interface CreateLessonRequest {
  title: string;
  description: string;
  level: LessonLevel;
  duration: number;
  imageUrl?: string;
  videoUrl?: string;
  content?: string;
  tags?: string[];
}

/**
 * Update lesson request
 */
export interface UpdateLessonRequest {
  title?: string;
  description?: string;
  level?: LessonLevel;
  duration?: number;
  imageUrl?: string;
  videoUrl?: string;
  content?: string;
  tags?: string[];
}

/**
 * Lesson search request
 */
export interface SearchLessonsRequest {
  query: string;
  level?: LessonLevel;
  tags?: string[];
  limit?: number;
}
