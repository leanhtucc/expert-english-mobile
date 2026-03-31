import { useCallback, useEffect, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';
import {
  GenerateSpeakingForLessonRequest,
  SPEAKING_EXERCISE_LV1,
} from '@/types/api/speakingExercise.request';

type Options = {
  lessonId: string | undefined;
  enabled?: boolean;
};

type FetchResult = {
  exercisesByLesson: any;
  generateSpeaking: any;
};

/**
 * Logic:
 * 1) Thử lấy bài tập đã có.
 * 2) Nếu chưa có (lỗi), gọi lệnh tạo bài mới (Generate).
 * 3) Lấy lại danh sách sau khi tạo.
 */
async function fetchGenerateSpeaking(lessonId: string): Promise<FetchResult> {
  try {
    // 1. Thử lấy danh sách bài tập Speaking theo lesson
    const getRes = await learningApi.getExercisesByLesson(lessonId);

    // Nếu data trả về mảng rỗng, coi như chưa có và ném lỗi để nhảy xuống catch
    if (!getRes.data?.data || getRes.data.data.length === 0) {
      throw new Error('No exercises found, generating new ones...');
    }

    return {
      exercisesByLesson: getRes.data,
      generateSpeaking: null,
    };
  } catch (err) {
    // 2. Nếu lấy thất bại hoặc không có bài, thực hiện lệnh tạo bài tập
    const body: GenerateSpeakingForLessonRequest = {
      lesson_id: lessonId,
      exercise_type: SPEAKING_EXERCISE_LV1,
    };

    const postRes = await learningApi.generateSpeakingForLesson(body);

    // 3. Sau khi tạo xong, lấy lại danh sách một lần nữa
    try {
      const getAfterRes = await learningApi.getExercisesByLesson(lessonId);
      return {
        exercisesByLesson: getAfterRes.data,
        generateSpeaking: postRes.data,
      };
    } catch (getAfterErr) {
      // Trường hợp tệ nhất: Tạo xong nhưng vẫn không lấy được
      return {
        exercisesByLesson: null,
        generateSpeaking: postRes.data,
      };
    }
  }
}

export function useGenerateSpeakingForLesson({ lessonId, enabled = true }: Options) {
  const [data, setData] = useState<any>(null);
  const [exercisesByLesson, setExercisesByLesson] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!lessonId || !enabled) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchGenerateSpeaking(lessonId);
      setExercisesByLesson(result.exercisesByLesson);
      setData(result.generateSpeaking);
    } catch (e) {
      setError(e);
      setData(null);
      setExercisesByLesson(null);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId, enabled]);

  useEffect(() => {
    if (!lessonId || !enabled) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchGenerateSpeaking(lessonId)
      .then(result => {
        if (!isMounted) return;
        setExercisesByLesson(result.exercisesByLesson);
        setData(result.generateSpeaking);
      })
      .catch(e => {
        if (!isMounted) return;
        setError(e);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [lessonId, enabled]);

  return { data, exercisesByLesson, error, isLoading, refetch };
}
