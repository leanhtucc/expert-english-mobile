import { useCallback, useEffect, useRef, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';

// =========================================================
// HÀM CHUYỂN ĐỔI DATA TỪ BACKEND SANG FORMAT CỦA UI
// =========================================================
const parseExercisesToUI = (backendExercises: any[]) => {
  const formattedList: any[] = [];

  backendExercises.forEach(ex => {
    const content = ex.content;
    const typeCode = ex.type_info?.code;

    if (!content || !typeCode) return;

    // 1. DẠNG NỐI TỪ (MATCHING)
    if (typeCode === 'matching' && content.left && content.right) {
      const pairs = content.left.map((leftItem: any) => {
        const rightItem = content.right.find((r: any) => r.id === leftItem.id);
        return {
          id: leftItem.id,
          term: leftItem.text,
          definition: rightItem ? rightItem.text : '',
        };
      });

      formattedList.push({
        _id: ex._id,
        type: 'matching',
        pairs: pairs,
      });
    }

    // 2. DẠNG ĐIỀN TỪ (FILL IN THE BLANK)
    else if (typeCode === 'fill_in_blank' && content.sentences) {
      const dynamicOptions = content.sentences.map((s: any) => s.answers[0]);

      content.sentences.forEach((item: any, index: number) => {
        const [before, after] = item.sentence.split('[BLANK]');
        formattedList.push({
          _id: `${ex._id}_${index}`,
          original_exercise_id: ex._id,
          type: 'fill_in_blank',
          questionData: {
            beforeBlank: before?.trim() || '',
            afterBlank: after?.trim() || '',
            correctAnswer: item.answers[0],
            options: [...dynamicOptions].sort(() => Math.random() - 0.5),
            hint: 'Choose the best word to complete the sentence.',
          },
        });
      });
    }

    // 3. DẠNG TRẮC NGHIỆM PHÁT ÂM (PRONUNCIATION / MULTIPLE CHOICE)
    else if (typeCode === 'pronunciation' && content.questions) {
      content.questions.forEach((item: any, index: number) => {
        formattedList.push({
          _id: `${ex._id}_${index}`,
          original_exercise_id: ex._id,
          type: 'multiple_choice',
          questionData: {
            word: item.correctAnswer,
            question: item.question,
            options: item.options,
            correctAnswer: item.correctAnswer,
            phonetic: item.phonetic,
          },
        });
      });
    }

    // 4. DẠNG LUYỆN NÓI (SPEAKING)
    else if ((typeCode === 'speaking_lv1' || typeCode === 'speaking') && content.tasks) {
      content.tasks.forEach((task: any, index: number) => {
        formattedList.push({
          _id: `${ex._id}_${index}`,
          original_exercise_id: ex._id,
          type: 'speaking',
          questionData: {
            type: content.mode || 'word',
            text: task.reference_text,
            phonetic: task.phonetic || '',
            meaning: 'Tap the microphone and say the word above clearly.',
            correctAnswer: task.reference_text,
            imageUrl: null,
          },
        });
      });
    }
  });

  return formattedList;
};

interface UseGenerateExercisesProps {
  lessonId: string;
  enabled?: boolean;
}

export const useGenerateExercises = ({ enabled = false }: UseGenerateExercisesProps) => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isFetchingRef = useRef(false);

  const fetchExercises = useCallback(async () => {
    if (!enabled || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      console.log('⏳ [USE_GENERATE_EXERCISES] Đang lấy toàn bộ danh sách bài tập...');

      // 1. Lấy toàn bộ Data từ Backend (Giới hạn 1000 bài để đảm bảo không sót)
      const params = {
        limit: 1000,
      };

      const detailRes = await learningApi.getExercisesPage(params);

      const detailData = detailRes.data as any;
      const rawExercises = detailData?.data?.result || detailData?.result || [];

      console.log(
        `✅ [USE_GENERATE_EXERCISES] Đã lấy thành công ${rawExercises.length} bài tập (Exercise Objects) gốc từ Server.`
      );

      // 2. Bóc tách data thành mảng các câu hỏi nhỏ riêng lẻ
      const allFormattedData = parseExercisesToUI(rawExercises);

      // 🌟 3. LOGIC "BỐC THĂM CHIA RỔ"
      // Phân loại các câu hỏi vào từng rổ tương ứng với dạng bài
      const mcqs = allFormattedData.filter(ex => ex.type === 'multiple_choice');
      const matchings = allFormattedData.filter(ex => ex.type === 'matching');
      const fillBlanks = allFormattedData.filter(ex => ex.type === 'fill_in_blank');
      const speakings = allFormattedData.filter(ex => ex.type === 'speaking');

      const finalSession = [
        ...mcqs.slice(0, 5),
        ...matchings.slice(0, 2),
        ...fillBlanks.slice(0, 5),
        ...speakings.slice(0, 5),
      ];

      setExercises(finalSession);

      console.log(
        `🎉 [USE_GENERATE_EXERCISES] Đã lọc ra ${finalSession.length} câu hỏi CHUẨN CHỈ đưa lên UI.`
      );
    } catch (err: any) {
      console.error('🚨 [USE_GENERATE_EXERCISES] LỖI:', err?.response?.data || err.message);
      setError(err?.message || 'Có lỗi xảy ra khi tải bài tập.');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled && exercises.length === 0) {
      fetchExercises();
    }
  }, [enabled, exercises.length, fetchExercises]);

  return { exercises, isLoading, error, refetch: fetchExercises };
};
