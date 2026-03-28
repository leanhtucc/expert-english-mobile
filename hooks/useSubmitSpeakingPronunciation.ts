import { useCallback } from 'react';

import { submitSpeakingPronunciation } from '@/api/submitSpeakingPronunciation';
import type { SpeakingLessonExercise } from '@/types/api/speakingExercise.response';
import type { PronunciationFeedback } from '@/types/api/submitPronunciation.response';
import type { ScenarioPreview } from '@/types/speaking.types';

type Params = {
  exercises: SpeakingLessonExercise[];
  currentExerciseIndex: number;
  scenario: ScenarioPreview | null;
  lessonId: string | undefined;
};

/**
 * Sau khi dừng ghi âm: map bài hiện tại → vocab_id / reference_text / lesson_id và gọi submit-pronunciation.
 */
export function useSubmitSpeakingPronunciation({
  exercises,
  currentExerciseIndex,
  scenario,
  lessonId,
}: Params) {
  const submitAfterRecording = useCallback(
    async (audioUri: string | null): Promise<PronunciationFeedback | null> => {
      const ex = exercises[currentExerciseIndex];
      if (audioUri && ex && lessonId) {
        const task = ex.content?.tasks?.[0];
        const vocabId = ex.vocab_id;
        const referenceText =
          (task?.reference_text || '').trim() || (scenario?.exampleAnswer || '').trim() || '';

        if (vocabId && referenceText) {
          try {
            return await submitSpeakingPronunciation({
              audioUri,
              vocabId,
              lessonId,
              referenceText,
            });
          } catch {
            /* đã log trong submitSpeakingPronunciation */
            return null;
          }
        }
        console.warn('[submit-pronunciation] thiếu vocab_id hoặc reference_text — không gửi API.');
        return null;
      }
      if (!audioUri && exercises.length > 0) {
        console.warn('[submit-pronunciation] không có file audio (web hoặc lỗi ghi).');
      }
      return null;
    },
    [exercises, currentExerciseIndex, scenario, lessonId]
  );

  return { submitAfterRecording };
}
