import { create } from 'zustand';

import { lessonsApi } from '@/services';
import type { ApiState, CreateLessonRequest, Lesson, UpdateLessonRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Lessons Store Interface
 */
interface LessonsState extends ApiState<Lesson[]> {
  currentLesson: Lesson | null;

  // Actions
  fetchLessons: () => Promise<void>;
  fetchLessonById: (id: string) => Promise<void>;
  createLesson: (lesson: CreateLessonRequest) => Promise<void>;
  updateLesson: (id: string, lesson: UpdateLessonRequest) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  searchLessons: (query: string) => Promise<void>;
  setCurrentLesson: (lesson: Lesson | null) => void;
  clearError: () => void;
}

/**
 * Lessons Store
 * Quản lý lessons data và API calls
 */
export const useLessonsStore = create<LessonsState>((set, get) => ({
  data: null,
  currentLesson: null,
  isLoading: false,
  error: null,

  fetchLessons: async () => {
    set({ isLoading: true, error: null });

    try {
      const lessons = await lessonsApi.getAll();
      set({ data: lessons, isLoading: false });
      logger.info('Lessons fetched successfully', { count: lessons.length });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch lessons',
        isLoading: false,
      });
      logger.error('Failed to fetch lessons', error);
    }
  },

  fetchLessonById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const lesson = await lessonsApi.getById(id);
      set({ currentLesson: lesson, isLoading: false });
      logger.info('Lesson fetched', { lessonId: id });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch lesson',
        isLoading: false,
      });
      logger.error('Failed to fetch lesson', error);
    }
  },

  createLesson: async (lesson: CreateLessonRequest) => {
    set({ isLoading: true, error: null });

    try {
      const newLesson = await lessonsApi.create(lesson);
      const currentData = get().data || [];
      set({
        data: [...currentData, newLesson],
        isLoading: false,
      });
      logger.info('Lesson created', { lessonId: newLesson.id });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to create lesson',
        isLoading: false,
      });
      logger.error('Failed to create lesson', error);
      throw error;
    }
  },

  updateLesson: async (id: string, lesson: UpdateLessonRequest) => {
    set({ isLoading: true, error: null });

    try {
      const updatedLesson = await lessonsApi.update(id, lesson);
      const currentData = get().data || [];
      set({
        data: currentData.map(l => (l.id === id ? updatedLesson : l)),
        currentLesson: get().currentLesson?.id === id ? updatedLesson : get().currentLesson,
        isLoading: false,
      });
      logger.info('Lesson updated', { lessonId: id });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update lesson',
        isLoading: false,
      });
      logger.error('Failed to update lesson', error);
      throw error;
    }
  },

  deleteLesson: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await lessonsApi.delete(id);
      const currentData = get().data || [];
      set({
        data: currentData.filter(l => l.id !== id),
        currentLesson: get().currentLesson?.id === id ? null : get().currentLesson,
        isLoading: false,
      });
      logger.info('Lesson deleted', { lessonId: id });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to delete lesson',
        isLoading: false,
      });
      logger.error('Failed to delete lesson', error);
      throw error;
    }
  },

  searchLessons: async (query: string) => {
    set({ isLoading: true, error: null });

    try {
      const lessons = await lessonsApi.search(query);
      set({ data: lessons, isLoading: false });
      logger.info('Lessons searched', { query, count: lessons.length });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to search lessons',
        isLoading: false,
      });
      logger.error('Failed to search lessons', error);
    }
  },

  setCurrentLesson: (lesson: Lesson | null) => set({ currentLesson: lesson }),

  clearError: () => set({ error: null }),
}));
