import { AxiosError } from 'axios';

import { learningApi } from '@/api/endpoints/learning.api';
import {
  type PronunciationFeedback,
  mapSubmitPronunciationResponse,
} from '@/types/api/submitPronunciation.response';

/**
 * Helper: Xác định tên file và định dạng âm thanh từ URI
 * Đảm bảo gửi đúng MIME type để Server AI có thể đọc được file
 */
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
  lessonId?: string;
};

/**
 * API Chấm điểm phát âm: Gửi file ghi âm lên Server
 * Sử dụng định dạng multipart/form-data
 */
export async function submitSpeakingPronunciation(
  params: SubmitSpeakingPronunciationParams
): Promise<PronunciationFeedback | null> {
  const { audioUri, vocabId, referenceText, lessonId } = params;

  // 1. Chuẩn bị thông tin file
  const { name, mime } = guessAudioNameAndMime(audioUri);

  // 2. Khởi tạo FormData
  const form = new FormData();

  // Ép kiểu 'as any' cho React Native FormData trơn tru
  form.append('audio_file', {
    uri: audioUri,
    name,
    type: mime,
  } as any);

  form.append('vocab_id', vocabId);
  form.append('reference_text', referenceText);

  if (lessonId) {
    form.append('lesson_id', lessonId);
  }

  try {
    console.log(`🎙️ [SUBMIT] Đang gửi bài chấm điểm cho từ: "${referenceText}"`);

    // 3. Gọi API qua service đã tập trung (learningApi)
    const res = await learningApi.submitSpeakingPronunciation(form);

    // 4. Map dữ liệu trả về thành dạng UI dễ dùng
    const feedback = mapSubmitPronunciationResponse(res.data);

    console.log(`✅ [SUBMIT] Chấm điểm thành công: ${feedback?.score}%`);
    return feedback;
  } catch (e) {
    const err = e as AxiosError<any>;

    // Log lỗi chi tiết để dev dễ xử lý
    console.error('[SUBMIT ERROR] Status:', err.response?.status);
    console.error('[SUBMIT ERROR] Data:', JSON.stringify(err.response?.data, null, 2));

    // Nếu server báo lỗi 400 (thường do file audio lỗi hoặc text không khớp)
    if (err.response?.status === 400) {
      console.warn('⚠️ Lỗi định dạng âm thanh hoặc dữ liệu đầu vào không hợp lệ.');
    }

    throw e;
  }
}
