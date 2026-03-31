import { useCallback, useEffect, useRef, useState } from 'react';

import { apiConfig } from '@/api';
import { learningApi } from '@/api/endpoints/learning.api';

// ================= HELPER =================
const resolveAudioUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${apiConfig.baseURL}${url}`;
};

export const useGenerateExercises = ({
  lessonId,
  enabled = false,
}: {
  lessonId: string;
  enabled?: boolean;
}) => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchExercises = useCallback(async () => {
    if (!enabled || isFetchingRef.current || !lessonId) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      console.log(`\n🚀 [EXERCISE] Bắt đầu lấy bài tập cho Lesson: ${lessonId}`);

      // 🌟 ĐÃ THÊM LẠI CONDITION LESSON_ID Ở ĐÂY 🌟
      const params = {
        limit: 100,
        condition: JSON.stringify({ lesson_id: lessonId }), // Lọc bài tập theo đúng bài đang học
      };

      // 1. Thử lấy danh sách bài tập lần đầu
      let res = await learningApi.getExercisesPage(params);
      let rawList = res.data?.data?.result || [];
      console.log(`📥 [EXERCISE] Tìm thấy: ${rawList.length} câu hỏi cho bài này.`);

      // 2. NẾU CHƯA CÓ, GỌI API TẠO MỚI VÀ CHỜ 2 GIÂY
      if (rawList.length === 0) {
        console.log('⚠️ [EXERCISE] Bài này chưa có bài tập. Đang yêu cầu Server tạo mới...');
        try {
          await learningApi.generateLesson(lessonId);
          console.log('⏳ [EXERCISE] Đã gửi lệnh tạo. Đợi Server xử lý 2 giây...');

          await new Promise(resolve => setTimeout(resolve, 2000));

          // Lấy lại sau khi tạo
          res = await learningApi.getExercisesPage(params);
          rawList = res.data?.data?.result || [];
          console.log(`✅ [EXERCISE] Sau khi tạo - Tìm thấy: ${rawList.length} câu hỏi.`);
        } catch (genErr) {
          console.error('🚨 [EXERCISE] Lỗi khi bảo Server tạo bài tập:', genErr);
        }
      }

      if (rawList.length === 0) {
        console.log('❌ [EXERCISE] Vẫn trả về 0 câu hỏi. Hủy load.');
        setExercises([]);
        return;
      }

      // 3. Map dữ liệu chi tiết (Giữ nguyên logic của bạn)
      const formattedNestedList = await Promise.all(
        rawList.map(async (ex: any) => {
          const typeCode = ex.type_info?.code;
          const content = ex.content;
          const results: any[] = [];

          if (typeCode === 'multiple_choice' || typeCode === 'pronunciation') {
            content.questions?.forEach((q: any, i: number) => {
              results.push({
                _id: `${ex._id}_${i}`,
                type: 'multiple_choice',
                questionData: { ...q, id: `${ex._id}_${i}` },
              });
            });
          } else if (typeCode === 'matching') {
            const pairs = content.left?.map((l: any) => ({
              id: l.id,
              term: l.text,
              definition: content.right?.find((r: any) => r.id === l.id)?.text || '',
            }));
            results.push({ _id: ex._id, type: 'matching', pairs });
          } else if (typeCode === 'fill_in_blank') {
            content.sentences?.forEach((s: any, i: number) => {
              const [before, after] = s.sentence.split('[BLANK]');
              results.push({
                _id: `${ex._id}_${i}`,
                type: 'fill_in_blank',
                questionData: {
                  beforeBlank: before?.trim(),
                  afterBlank: after?.trim(),
                  correctAnswer: s.answers[0],
                  options: content.sentences
                    .map((opt: any) => opt.answers[0])
                    .sort(() => Math.random() - 0.5),
                },
              });
            });
          } else if (typeCode === 'speaking_lv1' || typeCode === 'speaking') {
            const vocabId = ex.vocab_id || content?.tasks?.[0]?.vocab_id;
            if (vocabId) {
              try {
                const vRes = await learningApi.getVocabularyDetail(vocabId);
                const rawPayload = vRes.data as any;
                const vData = rawPayload?.data?.data || rawPayload?.data || rawPayload;
                const rawAudioUrl = vData?.audio_url || vData?.audioUrl;
                const finalAudioUrl = resolveAudioUrl(rawAudioUrl);

                results.push({
                  _id: ex._id,
                  type: 'speaking',
                  questionData: {
                    vocab_id: vocabId,
                    type: content.mode || 'word',
                    text: vData?.word || content.tasks?.[0]?.reference_text,
                    phonetic: vData?.phonetic || '',
                    meaning: vData?.definition_vi || '',
                    audioUrl: finalAudioUrl,
                    imageUrl: vData?.image_url || vData?.imageUrl || null,
                  },
                });
              } catch (err) {
                console.error(`🚨 [SPEAKING] Lỗi gọi API Vocab ${vocabId}:`, err);
              }
            }
          }
          return results;
        })
      );

      const formattedList = formattedNestedList.flat();

      const mcqs = formattedList.filter(ex => ex.type === 'multiple_choice');
      const matchings = formattedList.filter(ex => ex.type === 'matching');
      const fillBlanks = formattedList.filter(ex => ex.type === 'fill_in_blank');
      const speakings = formattedList.filter(ex => ex.type === 'speaking');

      const finalSession = [
        ...mcqs.slice(0, 5),
        ...matchings.slice(0, 2),
        ...fillBlanks.slice(0, 5),
        ...speakings.slice(0, 5),
      ];

      console.log(`✅ [EXERCISE] Sắp xếp xong cho bài học! Đưa ${finalSession.length} câu vào UI.`);
      setExercises(finalSession);
    } catch (err: any) {
      console.error('🚨 [EXERCISE] Lỗi tổng:', err.response?.data || err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [lessonId, enabled]);

  useEffect(() => {
    if (enabled && exercises.length === 0) fetchExercises();
  }, [enabled, exercises.length, fetchExercises]);

  return { exercises, isLoading, error, refetch: fetchExercises };
};
