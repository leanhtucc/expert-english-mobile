import { AxiosError } from 'axios';

import { apiConfig } from '@/api/config/api.config';
import { learningApi } from '@/api/endpoints/learning.api';
import { useAuthStore } from '@/stores/auth.store';
import { EXERCISES_ROUTES, buildApiUrl } from '@/types/api/exercises.routes';
import {
  type PronunciationFeedback,
  mapSubmitPronunciationResponse,
} from '@/types/api/submitPronunciation.response';

function escapeShellSingleQuotes(s: string): string {
  return s.replace(/'/g, `'\\''`);
}

function guessAudioNameAndMime(audioUri: string): { name: string; mime: string } {
  const clean = audioUri.split('?')[0] || '';
  const base = clean.split('/').pop() || 'pronunciation.m4a';
  const ext = (base.includes('.') ? base.split('.').pop() : '')?.toLowerCase() || 'm4a';

  const mimeByExt: Record<string, string> = {
    m4a: 'audio/mp4',
    mp4: 'audio/mp4',
    caf: 'audio/x-caf',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    webm: 'audio/webm',
    '3gp': 'audio/3gpp',
  };

  return {
    name: base.includes('.') ? base : `pronunciation.${ext}`,
    mime: mimeByExt[ext] || 'audio/mp4',
  };
}

export type SubmitSpeakingPronunciationParams = {
  audioUri: string;
  vocabId: string;
  referenceText: string;
  /** Tuỳ chọn — chỉ append khi có giá trị */
  lessonId?: string;
};

/**
 * POST multipart: `audio_file` = file m4a (AAC), MIME `audio/mp4`.
 */
export async function submitSpeakingPronunciation(
  params: SubmitSpeakingPronunciationParams
): Promise<PronunciationFeedback | null> {
  const { audioUri, vocabId, referenceText, lessonId } = params;
  const url = buildApiUrl(apiConfig.baseURL || '', EXERCISES_ROUTES.submitSpeakingPronunciation);
  const { name, mime } = guessAudioNameAndMime(audioUri);

  const { accessToken, token } = useAuthStore.getState() as {
    accessToken?: string | null;
    token?: string | null;
  };
  const bearer = accessToken ?? token ?? '';
  const tokenForCurl = __DEV__ ? bearer : bearer ? `${bearer.slice(0, 20)}…(ẩn)` : '';

  const form = new FormData();
  form.append('audio_file', {
    uri: audioUri,
    name,
    type: mime,
  } as unknown as Blob);
  form.append('vocab_id', vocabId);
  form.append('reference_text', referenceText);
  if (lessonId) {
    form.append('lesson_id', lessonId);
  }

  const fieldsLog = {
    vocab_id: vocabId,
    reference_text: referenceText,
    lesson_id: lessonId ?? '(không gửi)',
    audio_file: { name, type: mime },
  };

  console.log('[submit-pronunciation] POST gửi:', url);
  console.log('[submit-pronunciation] fields (multipart):', JSON.stringify(fieldsLog, null, 2));

  const curlParts = [
    `curl --location '${escapeShellSingleQuotes(url)}' \\`,
    `  --header 'Authorization: Bearer ${escapeShellSingleQuotes(tokenForCurl)}' \\`,
    `  -F 'audio_file=@./${escapeShellSingleQuotes(name)};type=${mime}' \\`,
    `  -F 'vocab_id=${escapeShellSingleQuotes(vocabId)}' \\`,
    `  -F 'reference_text=${escapeShellSingleQuotes(referenceText)}'`,
  ];
  if (lessonId) {
    curlParts[curlParts.length - 1] += ' \\';
    curlParts.push(`  -F 'lesson_id=${escapeShellSingleQuotes(lessonId)}'`);
  }
  console.log('[submit-pronunciation] curl tương đương:\n' + curlParts.join('\n'));
  if (!__DEV__) {
    console.log('[submit-pronunciation] (production: token curl đã rút gọn)');
  }

  try {
    const res = await learningApi.submitSpeakingPronunciation(form);
    console.log('[submit-pronunciation] response:', JSON.stringify(res.data, null, 2));
    return mapSubmitPronunciationResponse(res.data);
  } catch (e) {
    const err = e as AxiosError<unknown>;
    const data = err.response?.data as
      | {
          detail?: {
            exception?: { message?: string; status?: number; code?: string };
            message?: string;
          };
        }
      | undefined;

    console.log('[submit-pronunciation] error status:', err.response?.status);
    console.log(
      '[submit-pronunciation] error body:',
      err.response?.data !== undefined
        ? JSON.stringify(err.response.data, null, 2)
        : String(err.message ?? e)
    );

    const upstream = data?.detail?.exception;
    if (upstream?.status === 400 || upstream?.code === 'ERR_BAD_REQUEST') {
      console.warn(
        '[submit-pronunciation] Gốc lỗi: API đánh giá phát âm phía server (aivocabio) trả 400. ' +
          'prolingo-be chỉ bọc lại thành 500. Cần team backend log `response.data` khi gọi ' +
          '`pronunciation-assessment` để biết lý do (tên field multipart, định dạng audio, validation reference_text, v.v.).'
      );
      if (upstream.message) {
        console.warn(
          '[submit-pronunciation] exception.message (upstream axios):',
          upstream.message
        );
      }
    }
    throw e;
  }
}
