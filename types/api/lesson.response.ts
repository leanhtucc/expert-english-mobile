import type { Lesson } from '../entities';

/**
 * Lesson API Response Types
 */

/**
 * Get lessons response
 */
export interface GetLessonsResponse {
  data: Lesson[];
  total: number;
}

/**
 * Get single lesson response
 */
export interface GetLessonResponse {
  data: Lesson;
}

/**
 * Create lesson response
 */
export interface CreateLessonResponse {
  data: Lesson;
  message: string;
}

/**
 * Update lesson response
 */
export interface UpdateLessonResponse {
  data: Lesson;
  message: string;
}

/**
 * Delete lesson response
 */
export interface DeleteLessonResponse {
  message: string;
  success: boolean;
}
