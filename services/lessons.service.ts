import type {
  CreateLessonRequest,
  Lesson,
  PaginatedResponse,
  PaginationParams,
  UpdateLessonRequest,
} from '@/types';
import { api } from '@/utils/api';

/**
 * Lessons API Service
 */
export const lessonsApi = {
  /**
   * Get all lessons
   */
  getAll: async (params?: PaginationParams): Promise<Lesson[]> => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : '';
    return await api.get<Lesson[]>(`/lessons${queryString}`);
  },

  /**
   * Get paginated lessons
   */
  getPaginated: async (params?: PaginationParams): Promise<PaginatedResponse<Lesson>> => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : '';
    return await api.get<PaginatedResponse<Lesson>>(`/lessons/paginated${queryString}`);
  },

  /**
   * Get lesson by ID
   */
  getById: async (id: string): Promise<Lesson> => {
    return await api.get<Lesson>(`/lessons/${id}`);
  },

  /**
   * Create new lesson
   */
  create: async (data: CreateLessonRequest): Promise<Lesson> => {
    return await api.post<Lesson>('/lessons', data);
  },

  /**
   * Update lesson
   */
  update: async (id: string, data: UpdateLessonRequest): Promise<Lesson> => {
    return await api.put<Lesson>(`/lessons/${id}`, data);
  },

  /**
   * Delete lesson
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/lessons/${id}`);
  },

  /**
   * Search lessons
   */
  search: async (query: string): Promise<Lesson[]> => {
    return await api.get<Lesson[]>(`/lessons/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Get lessons by level
   */
  getByLevel: async (level: 'beginner' | 'intermediate' | 'advanced'): Promise<Lesson[]> => {
    return await api.get<Lesson[]>(`/lessons/level/${level}`);
  },
};
