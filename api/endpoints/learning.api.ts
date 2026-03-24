import { GetPageRequest } from '@/types/api/learningPath.request';
import {
  LearningModulePageResponse,
  LearningPath,
  LearningPathPageResponse,
  LessonPageResponse,
} from '@/types/api/learningPath.response';
import {
  ExampleSentenceResponse,
  LessonVocabularyResponse,
  VocabularyDetailResponse,
} from '@/types/api/lesson.response';

import { apiClient } from '../client';

export const learningApi = {
  // Giai đoạn 3: Lộ trình
  getLearningPaths: (params: GetPageRequest) =>
    apiClient.get<LearningPathPageResponse>('/learning-paths/page', { params }),

  getLearningPathDetail: (id: string) => apiClient.get<LearningPath>(`/learning-paths/${id}`),

  // Giai đoạn 4: Module
  getModules: (params: GetPageRequest) =>
    apiClient.get<LearningModulePageResponse>('/learning-modules/page', { params }),

  // Giai đoạn 5: Lesson
  getLessons: (params: GetPageRequest) =>
    apiClient.get<LessonPageResponse>('/lessons/page', { params }),

  getLessonDetail: (id: string) => apiClient.get<any>(`/lessons/${id}`),

  // Giai đoạn 6: Nội dung (Từ vựng & Câu mẫu)
  getLessonVocabularies: (params: GetPageRequest) =>
    apiClient.get<LessonVocabularyResponse>('/lesson-vocabulary/page', { params }),

  getVocabularyDetail: (vocabId: string) =>
    apiClient.get<VocabularyDetailResponse>(`/vocabulary/${vocabId}`),

  getExampleSentences: (params: GetPageRequest) =>
    apiClient.get<ExampleSentenceResponse>('/example-sentences/page', { params }),

  swipeFlashcard: (data: { vocab_id: string; outcome: 'remembered' | 'not_remembered' }) =>
    apiClient.post('/user-vocabulary-progress/flashcard/swipe', data),

  resetLessonFlashcards: (data: { lesson_id: string }) =>
    apiClient.post('/user-vocabulary-progress/flashcard/reset-lesson', data),
};
