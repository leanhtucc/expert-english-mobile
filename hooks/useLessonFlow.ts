import { useCallback, useEffect, useState } from 'react';

import { apiConfig } from '@/api';
import { learningApi } from '@/api/endpoints/learning.api';

// ================= HELPER =================
const resolveAudioUrl = (url?: string | null) => {
  if (!url) return null;

  // đã là full URL
  if (url.startsWith('http')) return url;

  return `${apiConfig.baseURL}${url}`;
};

// ================= TYPE =================
export interface FlashcardData {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definitionEn: string;
  definitionVi: string;
  exampleEn: string;
  exampleVi: string;
  audioUrl: string | null;
  imageUrl: string | null;
  isRemembered: boolean;
  rememberedCount: number;
}

export const useLessonFlow = (lessonId: string) => {
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLessonData = useCallback(async () => {
    if (!lessonId) return;

    try {
      setLoading(true);
      setError(null);

      // 1. Lấy vocab IDs
      const vocabRes = await learningApi.getLessonVocabularies({
        condition: JSON.stringify({ lesson_id: lessonId }),
        sort: JSON.stringify({ order_index: 1 }),
      });

      const vocabItems = vocabRes.data.data?.result || [];

      if (vocabItems.length === 0) {
        setFlashcards([]);
        return;
      }

      // 2. Lấy detail + sentence
      const fullDataPromises = vocabItems.map(async item => {
        const vocabId = item.vocab_id;

        const [detailRes, sentenceRes] = await Promise.all([
          learningApi.getVocabularyDetail(vocabId).catch(() => null),
          learningApi
            .getExampleSentences({
              condition: JSON.stringify({ vocab_id: vocabId }),
              limit: 1,
            })
            .catch(() => null),
        ]);

        const detail = detailRes?.data.data;
        const sentence = sentenceRes?.data.data?.result?.[0];

        return {
          id: vocabId,
          word: detail?.word || 'Unknown',
          phonetic: detail?.phonetic || '',
          partOfSpeech: detail?.part_of_speech || '',
          definitionEn: detail?.definition_en || '',
          definitionVi: detail?.definition_vi || '',
          exampleEn: sentence?.sentence_en || '',
          exampleVi: sentence?.sentence_vi || '',

          // ✅ FIX CHÍNH Ở ĐÂY
          audioUrl: resolveAudioUrl(detail?.audio_url),

          imageUrl: detail?.image_url || null,
          isRemembered: item.is_remembered || false,
          rememberedCount: item.flashcard_remembered_count || 0,
        };
      });

      const resolvedFlashcards = await Promise.all(fullDataPromises);

      setFlashcards(resolvedFlashcards);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError('Không thể tải dữ liệu bài học');
    } finally {
      setLoading(false);
    }
  }, [lessonId]);

  useEffect(() => {
    fetchLessonData();
  }, [fetchLessonData]);

  return { loading, flashcards, error, refetch: fetchLessonData };
};
