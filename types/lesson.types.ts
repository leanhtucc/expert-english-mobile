/**
 * Lesson Types
 */
export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLessonRequest {
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  imageUrl?: string;
}

export interface UpdateLessonRequest {
  title?: string;
  description?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
  imageUrl?: string;
}

export interface LessonsResponse {
  data: Lesson[];
  total: number;
  page: number;
}
