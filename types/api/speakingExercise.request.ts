/** Tham chiếu loại bài speaking (theo backend). */
export interface SpeakingExerciseTypeRef {
  code: string;
  _id: string;
}

export interface GenerateSpeakingForLessonRequest {
  lesson_id: string;
  exercise_type: SpeakingExerciseTypeRef;
}

/** speaking_lv1 — id cố định từ API */
export const SPEAKING_EXERCISE_LV1: SpeakingExerciseTypeRef = {
  code: 'speaking_lv1',
  _id: '69c78fbbfafeaed720861032',
};
