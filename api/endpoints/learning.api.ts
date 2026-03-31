import { GetPageRequest, PostSubmitLessonRequest } from '@/types/api/learningPath.request';
import {
  LearningModulePageResponse,
  LearningPath,
  LearningPathPageResponse,
  LessonPageResponse,
  RoadmapResponse,
} from '@/types/api/learningPath.response';
import {
  ExampleSentenceResponse,
  LessonVocabularyResponse,
  SubmitLessonResponse,
  VocabularyDetailResponse,
} from '@/types/api/lesson.response';
import { GenerateSpeakingForLessonRequest } from '@/types/api/speakingExercise.request';
import type { ExercisesByLessonApiResponse } from '@/types/api/speakingExercise.response';

import { apiClient } from '../client';

// ==========================================
// ĐỊNH NGHĨA ROUTES CỤC BỘ
// ==========================================
export const EXERCISES_ROUTES = {
  generateSpeakingForLesson: '/exercises/generate-speaking-for-lesson',
  submitSpeakingPronunciation: '/exercises/speaking/submit-pronunciation',
  exercisesByLessonPath: (lessonId: string) =>
    `/exercises/by-lesson/${encodeURIComponent(lessonId)}`,
} as const;

// ==========================================
// CHÍNH: LEARNING API
// ==========================================
export const learningApi = {
  // --- Giai đoạn 3: Lộ trình ---
  getLearningPaths: (params: GetPageRequest) =>
    apiClient.get<LearningPathPageResponse>('/learning-paths/page', { params }),

  getLearningPathDetail: (id: string) => apiClient.get<LearningPath>(`/learning-paths/${id}`),
  getRoadmapData: () => apiClient.get<RoadmapResponse>('/roadmap/me'),

  // --- Giai đoạn 4: Module ---
  getModules: (params: GetPageRequest) =>
    apiClient.get<LearningModulePageResponse>('/learning-modules/page', { params }),

  // --- Giai đoạn 5: Lesson ---
  getLessons: (params: GetPageRequest) =>
    apiClient.get<LessonPageResponse>('/lessons/page', { params }),

  getLessonDetail: (id: string) => apiClient.get<any>(`/lessons/${id}`),

  // --- Giai đoạn 6: Nội dung (Từ vựng & Câu mẫu) ---
  getLessonVocabularies: (params: GetPageRequest) =>
    apiClient.get<LessonVocabularyResponse>('/lesson-vocabulary/page', { params }),

  getVocabularyDetail: (vocabId: string) =>
    apiClient.get<VocabularyDetailResponse>(`/vocabulary/${vocabId}`),

  getExampleSentences: (params: GetPageRequest) =>
    apiClient.get<ExampleSentenceResponse>('/example-sentences/page', { params }),

  // --- Flashcard & Progress ---
  swipeFlashcard: (data: { vocab_id: string; outcome: 'remembered' | 'not_remembered' }) =>
    apiClient.post('/user-vocabulary-progress/flashcard/swipe', data),

  startFlashcardSession: (data: { lesson_id: string; session_size: number }) =>
    apiClient.post('/user-vocabulary-progress/flashcard/session/start', data),

  resetLessonFlashcards: (data: { lesson_id: string }) =>
    apiClient.post('/user-vocabulary-progress/flashcard/reset-lesson', data),

  submitLesson: (data: PostSubmitLessonRequest) =>
    apiClient.post<SubmitLessonResponse>('/user-exercise-attempts', data),

  // --- Exercises (Bài tập chung) ---
  getExercisesPage: (params: any) => apiClient.get('/exercises/page', { params }),

  getExercisesByLesson: (lessonId: string) =>
    apiClient.get<ExercisesByLessonApiResponse>(EXERCISES_ROUTES.exercisesByLessonPath(lessonId)),

  generateLesson: (lessonId: string) =>
    apiClient.post('/exercises/generate-for-lesson', {
      lesson_id: lessonId,
      limit: 10,
    }),

  // --- Speaking Exercises ---
  generateSpeakingForLesson: (data: GenerateSpeakingForLessonRequest) =>
    apiClient.post(EXERCISES_ROUTES.generateSpeakingForLesson, data),

  /** multipart/form-data: audio_file, vocab_id, reference_text, lesson_id (tuỳ chọn) */
  submitSpeakingPronunciation: (formData: FormData) =>
    apiClient.postForm<unknown>(EXERCISES_ROUTES.submitSpeakingPronunciation, formData),
};
