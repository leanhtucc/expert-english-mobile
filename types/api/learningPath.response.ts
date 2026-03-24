import { CommonResponse } from '../common';

// Entity cơ bản
export interface LearningPath {
  _id: string;
  user_id: string;
  name_en: string;
  name_vi: string;
  target_level: string;
  description: string;
  estimated_hours: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LearningModule {
  _id: string;
  path_id: string;
  name_en: string;
  name_vi: string;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  _id: string;
  module_id: string;
  name_en: string;
  name_vi: string;
  order_index: number;
  lesson_type: 'Video' | 'Article' | 'Quiz' | 'vocabulary';
  estimated_minutes: number;
  created_at: string;
}

// Response cho danh sách phân trang (Dữ liệu từ ảnh Postman)
export interface PaginatedData<T> {
  total: number;
  result: T[];
}

export type LearningPathPageResponse = CommonResponse<PaginatedData<LearningPath>>;
export type LearningModulePageResponse = CommonResponse<PaginatedData<LearningModule>>;
export type LessonPageResponse = CommonResponse<PaginatedData<Lesson>>;
