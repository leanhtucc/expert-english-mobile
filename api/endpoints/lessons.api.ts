import {
  CreateLessonRequest,
  Lesson,
  PaginatedResponse,
  PaginationParams,
  UpdateLessonRequest,
} from '@/types/api';

import { apiClient } from '../client';

/**
 * Lessons API Endpoints
 * Handles lesson-related API calls
 */
export const lessonsApi = {
  /**
   * Get all lessons
   * @param params - Optional pagination parameters
   * @returns Array of lessons
   */
  getAll: async (params?: PaginationParams): Promise<Lesson[]> => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : '';
    return await apiClient.get<Lesson[]>(`/lessons${queryString}`);
  },

  /**
   * Get paginated lessons
   * @param params - Pagination parameters (page, limit, sortBy, order)
   * @returns Paginated response with lessons
   */
  getPaginated: async (params?: PaginationParams): Promise<PaginatedResponse<Lesson>> => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : '';
    return await apiClient.get<PaginatedResponse<Lesson>>(`/lessons/paginated${queryString}`);
  },

  /**
   * Get lesson by ID
   * @param id - Lesson ID
   * @returns Single lesson
   */
  getById: async (id: string): Promise<Lesson> => {
    return await apiClient.get<Lesson>(`/lessons/${id}`);
  },

  /**
   * Create new lesson
   * @param data - Lesson creation data
   * @returns Created lesson
   */
  create: async (data: CreateLessonRequest): Promise<Lesson> => {
    return await apiClient.post<Lesson>('/lessons', data);
  },

  /**
   * Update existing lesson
   * @param id - Lesson ID
   * @param data - Lesson update data
   * @returns Updated lesson
   */
  update: async (id: string, data: UpdateLessonRequest): Promise<Lesson> => {
    return await apiClient.put<Lesson>(`/lessons/${id}`, data);
  },

  /**
   * Delete lesson
   * @param id - Lesson ID
   * @returns void
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/lessons/${id}`);
  },

  /**
   * Search lessons by query
   * @param query - Search query string
   * @returns Array of matching lessons
   */
  search: async (query: string): Promise<Lesson[]> => {
    return await apiClient.get<Lesson[]>(`/lessons/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Get lessons by level
   * @param level - Lesson difficulty level
   * @returns Array of lessons for the specified level
   */
  getByLevel: async (level: 'beginner' | 'intermediate' | 'advanced'): Promise<Lesson[]> => {
    return await apiClient.get<Lesson[]>(`/lessons/level/${level}`);
  },
};
