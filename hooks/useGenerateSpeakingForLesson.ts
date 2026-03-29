import { useCallback, useEffect, useState } from 'react';

import { apiConfig } from '@/api/config/api.config';
import { learningApi } from '@/api/endpoints/learning.api';
import { useAuthStore } from '@/stores/auth.store';
import { EXERCISES_ROUTES, buildApiUrl } from '@/types/api/exercises.routes';
import {
  GenerateSpeakingForLessonRequest,
  SPEAKING_EXERCISE_LV1,
} from '@/types/api/speakingExercise.request';

type Options = {
  lessonId: string | undefined;
  enabled?: boolean;
};

function escapeShellSingleQuotes(s: string): string {
  return s.replace(/'/g, `'\\''`);
}

function logCurlGenerateSpeaking(body: GenerateSpeakingForLessonRequest) {
  const url = buildApiUrl(apiConfig.baseURL || '', EXERCISES_ROUTES.generateSpeakingForLesson);
  const { accessToken, token } = useAuthStore.getState() as {
    accessToken?: string | null;
    token?: string | null;
  };
  const bearer = accessToken ?? token ?? '';
  const json = JSON.stringify(body);
  const tokenForCurl = __DEV__ ? bearer : bearer ? `${bearer.slice(0, 20)}…(ẩn)` : '';

  const curl = [
    `curl --location '${escapeShellSingleQuotes(url)}' \\`,
    `  --header 'Content-Type: application/json' \\`,
    `  --header 'Authorization: Bearer ${escapeShellSingleQuotes(tokenForCurl)}' \\`,
    `  --data '${escapeShellSingleQuotes(json)}'`,
  ].join('\n');

  console.log(
    '[generate-speaking-for-lesson] curl tương đương (copy chạy terminal / đối chiếu Postman):\n' +
      curl
  );
  if (!__DEV__) {
    console.log(
      '[generate-speaking-for-lesson] (production: token đã rút gọn; dùng bản dev để copy đủ Bearer)'
    );
  }
}

function logCurlGetExercisesByLesson(lessonId: string) {
  const url = buildApiUrl(
    apiConfig.baseURL || '',
    EXERCISES_ROUTES.exercisesByLessonPath(lessonId)
  );
  const { accessToken, token } = useAuthStore.getState() as {
    accessToken?: string | null;
    token?: string | null;
  };
  const bearer = accessToken ?? token ?? '';
  const tokenForCurl = __DEV__ ? bearer : bearer ? `${bearer.slice(0, 20)}…(ẩn)` : '';
  const curl = `curl --location '${escapeShellSingleQuotes(url)}' --header 'Authorization: Bearer ${escapeShellSingleQuotes(tokenForCurl)}'`;
  console.log('[exercises/by-lesson] curl tương đương:\n' + curl);
}

type FetchResult = {
  exercisesByLesson: unknown;
  generateSpeaking: unknown;
};

async function fetchGenerateSpeaking(lessonId: string): Promise<FetchResult> {
  const getPath = EXERCISES_ROUTES.exercisesByLessonPath(lessonId);
  const getUrl = buildApiUrl(apiConfig.baseURL || '', getPath);

  console.log('[exercises/by-lesson] GET gọi:', getUrl);
  logCurlGetExercisesByLesson(lessonId);

  try {
    const getRes = await learningApi.getExercisesByLesson(lessonId);
    console.log('[exercises/by-lesson] GET response:', JSON.stringify(getRes.data, null, 2));
    console.log('[generate-speaking-for-lesson] Bỏ qua POST — GET đã thành công.');
    return {
      exercisesByLesson: getRes.data,
      generateSpeaking: null,
    };
  } catch (getErr) {
    console.log('[exercises/by-lesson] GET lỗi, gọi tiếp POST generate-speaking:', getErr);

    const body: GenerateSpeakingForLessonRequest = {
      lesson_id: lessonId,
      exercise_type: SPEAKING_EXERCISE_LV1,
    };

    logCurlGenerateSpeaking(body);
    console.log(
      '[generate-speaking-for-lesson] POST gửi (application/json):',
      JSON.stringify(body, null, 2)
    );

    const postRes = await learningApi.generateSpeakingForLesson(body);
    console.log(
      '[generate-speaking-for-lesson] POST response:',
      JSON.stringify(postRes.data, null, 2)
    );

    console.log('[exercises/by-lesson] GET (sau POST) gọi:', getUrl);
    logCurlGetExercisesByLesson(lessonId);

    try {
      const getAfterRes = await learningApi.getExercisesByLesson(lessonId);
      console.log(
        '[exercises/by-lesson] GET (sau POST) response:',
        JSON.stringify(getAfterRes.data, null, 2)
      );
      return {
        exercisesByLesson: getAfterRes.data,
        generateSpeaking: postRes.data,
      };
    } catch (getAfterErr) {
      console.log('[exercises/by-lesson] GET (sau POST) lỗi:', getAfterErr);
      return {
        exercisesByLesson: null,
        generateSpeaking: postRes.data,
      };
    }
  }
}

/**
 * 1) GET by-lesson — thành công thì dừng (không POST).
 * 2) GET lỗi → POST generate-speaking → GET by-lesson lại (lấy bài mới tạo).
 */
export function useGenerateSpeakingForLesson({ lessonId, enabled = true }: Options) {
  const [data, setData] = useState<unknown>(null);
  const [exercisesByLesson, setExercisesByLesson] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);
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
      console.log('[useGenerateSpeakingForLesson] lỗi (GET thất bại và POST cũng thất bại):', e);
      setError(e);
      setData(null);
      setExercisesByLesson(null);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId, enabled]);

  useEffect(() => {
    if (!lessonId || !enabled) return;

    let cancelled = false;

    setIsLoading(true);
    setError(null);

    void (async () => {
      try {
        const result = await fetchGenerateSpeaking(lessonId);
        if (cancelled) return;
        setExercisesByLesson(result.exercisesByLesson);
        setData(result.generateSpeaking);
      } catch (e) {
        if (cancelled) return;
        console.log('[useGenerateSpeakingForLesson] lỗi (GET thất bại và POST cũng thất bại):', e);
        setError(e);
        setData(null);
        setExercisesByLesson(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lessonId, enabled]);

  return { data, exercisesByLesson, error, isLoading, refetch };
}
