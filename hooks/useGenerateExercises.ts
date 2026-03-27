import { useCallback, useEffect, useRef, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';

// =========================================================
// HÀM CHUYỂN ĐỔI DATA TỪ BACKEND SANG FORMAT CỦA UI
// =========================================================
const parseExercisesToUI = (backendExercises: any[]) => {
  const formattedList: any[] = [];

  backendExercises.forEach(ex => {
    const content = ex.content;
    const typeCode = ex.type_info?.code; // Sử dụng type_info.code để check dạng bài

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
        type: 'matching', // Map cho UI hiểu
        pairs: pairs,
      });
    }

    // 2. DẠNG ĐIỀN TỪ (FILL IN THE BLANK)
    else if (typeCode === 'fill_in_blank' && content.sentences) {
      // Gom tất cả các đáp án đúng lại để làm mảng options (đáp án nhiễu)
      const dynamicOptions = content.sentences.map((s: any) => s.answers[0]);

      content.sentences.forEach((item: any, index: number) => {
        // Cắt câu hỏi qua từ khóa [BLANK]
        const [before, after] = item.sentence.split('[BLANK]');
        formattedList.push({
          _id: `${ex._id}_${index}`,
          original_exercise_id: ex._id,
          type: 'fill_in_blank', // Map cho UI hiểu
          questionData: {
            beforeBlank: before?.trim() || '',
            afterBlank: after?.trim() || '',
            correctAnswer: item.answers[0],
            // Dùng mảng dynamicOptions vừa gom và xáo trộn vị trí
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
          type: 'multiple_choice', // Ép về multiple_choice để dùng chung UI Trắc nghiệm
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
  });

  return formattedList;
};

// =========================================================
// HOOK FETCH DATA (LẤY TRỰC TIẾP TỪ PAGE)
// ==========================================
interface UseGenerateExercisesProps {
  lessonId: string; // Vẫn giữ lại để component cha không báo lỗi đỏ
  enabled?: boolean;
}

export const useGenerateExercises = ({ enabled = false }: UseGenerateExercisesProps) => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dùng ref để tránh gọi API nhiều lần
  const isFetchingRef = useRef(false);

  const fetchExercises = useCallback(async () => {
    if (!enabled || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      console.log('⏳ [USE_GENERATE_EXERCISES] Đang lấy danh sách bài tập...');

      // Lấy thẳng data không quan tâm params lesson_id nữa, chỉ dùng page và limit
      const params = {
        page: 1,
        limit: 20,
      };

      const detailRes = await learningApi.getExercisesPage(params);

      // Bóc tách an toàn
      const detailData = detailRes.data as any;
      const rawExercises = detailData?.data?.result || detailData?.result || [];

      console.log(
        `✅ [USE_GENERATE_EXERCISES] Đã lấy thành công ${rawExercises.length} bài tập từ Server.`
      );

      // Đưa qua hàm Parse để bẻ mảng và chuẩn hóa cho UI
      const formattedData = parseExercisesToUI(rawExercises);
      setExercises(formattedData);

      console.log(
        `🎉 [USE_GENERATE_EXERCISES] Đã render ra ${formattedData.length} câu hỏi hiển thị lên màn hình.`
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
