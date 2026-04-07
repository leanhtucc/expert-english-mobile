import { useCallback, useEffect, useRef, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';
import {
  GenerateSpeakingForLessonRequest,
  SPEAKING_EXERCISE_LV1,
  SpeakingExerciseTypeRef,
} from '@/types/api/speakingExercise.request';

type Options = {
  lessonId: string | undefined;
  exerciseType?: SpeakingExerciseTypeRef;
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
function extractExercises(raw: any): any[] {
  const list = raw?.data?.data ?? raw?.data ?? [];
  return Array.isArray(list) ? list : [];
}

function getSpeakingLevelByType(type: SpeakingExerciseTypeRef): number | null {
  if (type.code === 'speaking_lv1') return 1;
  if (type.code === 'speaking_lv2') return 2;
  return null;
}

function hasExercisesForType(raw: any, type: SpeakingExerciseTypeRef): boolean {
  const list = extractExercises(raw);
  if (!list.length) return false;
  const strictMatches = list.filter((ex: any) => {
    const typeIdMatched = ex?.type_id === type._id;
    const typeCodeMatched = ex?.type_info?.code === type.code;
    return typeIdMatched || typeCodeMatched;
  });
  if (strictMatches.length > 0) return true;

  // Fallback khi backend không trả type_id/type_info ổn định.
  const level = getSpeakingLevelByType(type);
  if (level == null) return false;
  return list.some((ex: any) => ex?.content?.speaking_level === level);
}

async function fetchGenerateSpeaking(
  lessonId: string,
  exerciseType: SpeakingExerciseTypeRef
): Promise<FetchResult> {
  const prettyLog = (label: string, payload: unknown) => {
    try {
      console.log(label, JSON.stringify(payload, null, 2));
    } catch {
      console.log(label, payload);
    }
  };

  try {
    prettyLog('[SpeakingAPI] GET exercises by lesson', {
      lessonId,
      levelCode: exerciseType.code,
      exerciseTypeId: exerciseType._id,
    });
    // 1. Thử lấy danh sách bài tập Speaking theo lesson
    const getRes = await learningApi.getExercisesByLesson(lessonId);

    // Nếu data trả về mảng rỗng, coi như chưa có và ném lỗi để nhảy xuống catch
    if (!hasExercisesForType(getRes.data, exerciseType)) {
      prettyLog('[SpeakingAPI] Missing exercises for level, fallback to generate', {
        lessonId,
        levelCode: exerciseType.code,
      });
      throw new Error('No exercises found, generating new ones...');
    }

    prettyLog('[SpeakingAPI] GET success for level', {
      lessonId,
      levelCode: exerciseType.code,
      totalExercises: extractExercises(getRes.data).length,
      response: getRes.data,
    });

    console.log(
      '[GenerateSpeaking] fetchGenerateSpeaking found exercises:',
      getRes.data?.data?.length
    );
    return {
      exercisesByLesson: getRes.data.data,
      generateSpeaking: null,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    // 2. Nếu lấy thất bại hoặc không có bài, thực hiện lệnh tạo bài tập
    const body: GenerateSpeakingForLessonRequest = {
      lesson_id: lessonId,
      exercise_type: exerciseType,
    };
    prettyLog('[SpeakingAPI] POST generate-speaking-for-lesson', {
      lessonId,
      levelCode: exerciseType.code,
      exerciseTypeId: exerciseType._id,
      requestBody: body,
    });

    const postRes = await learningApi.generateSpeakingForLesson(body);
    prettyLog('[SpeakingAPI] POST generate success', {
      lessonId,
      levelCode: exerciseType.code,
      response: postRes.data,
    });

    // 3. Sau khi tạo xong, lấy lại danh sách một lần nữa
    try {
      const getAfterRes = await learningApi.getExercisesByLesson(lessonId);
      prettyLog('[SpeakingAPI] GET after generate', {
        lessonId,
        levelCode: exerciseType.code,
        totalExercises: extractExercises(getAfterRes.data).length,
        response: getAfterRes.data,
      });
      console.log('[GenerateSpeaking] fetched after generate:', getAfterRes.data?.data?.length);
      return {
        exercisesByLesson: getAfterRes.data?.data || [],
        generateSpeaking: postRes.data,
      };
    } catch (getAfterErr) {
      prettyLog('[SpeakingAPI] GET after generate failed', {
        lessonId,
        levelCode: exerciseType.code,
        error: getAfterErr,
      });
      // Trường hợp tệ nhất: Tạo xong nhưng vẫn không lấy được
      return {
        exercisesByLesson: null,
        generateSpeaking: postRes.data,
      };
    }
  }
}

export function useGenerateSpeakingForLesson({
  lessonId,
  exerciseType = SPEAKING_EXERCISE_LV1,
  enabled = true,
}: Options) {
  const requestIdRef = useRef(0);
  const [data, setData] = useState<any>(null);
  const [exercisesByLesson, setExercisesByLesson] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!lessonId || !enabled) return;
    const requestId = ++requestIdRef.current;

    setIsLoading(true);
    setError(null);
    setData(null);
    setExercisesByLesson(null);
    try {
      const result = await fetchGenerateSpeaking(lessonId, exerciseType);
      if (requestId !== requestIdRef.current) return;
      setExercisesByLesson(result.exercisesByLesson);
      setData(result.generateSpeaking);
    } catch (e) {
      if (requestId !== requestIdRef.current) return;
      setError(e);
      setData(null);
      setExercisesByLesson(null);
    } finally {
      if (requestId !== requestIdRef.current) return;
      setIsLoading(false);
    }
  }, [lessonId, enabled, exerciseType]);

  useEffect(() => {
    if (!lessonId || !enabled) return;

    let isMounted = true;
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);
    setData(null);
    setExercisesByLesson(null);

    fetchGenerateSpeaking(lessonId, exerciseType)
      .then(result => {
        if (!isMounted || requestId !== requestIdRef.current) return;
        setExercisesByLesson(result.exercisesByLesson);
        setData(result.generateSpeaking);
      })
      .catch(e => {
        if (!isMounted || requestId !== requestIdRef.current) return;
        setError(e);
      })
      .finally(() => {
        if (isMounted && requestId === requestIdRef.current) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [lessonId, enabled, exerciseType]);

  return { data, exercisesByLesson, error, isLoading, refetch };
}
