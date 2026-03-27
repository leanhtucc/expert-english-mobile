import axios from 'axios';

import { useCallback, useEffect, useState } from 'react';

export interface LessonVocabulary {
  _id: string;
  lesson_id: string;
  vocab_id: string;
  order_index: number;
  vocabulary: {
    _id: string;
    word: string;
    domain: string;
    phonetic: string;
    part_of_speech: string;
    definition_en: string;
    definition_vi: string;
    difficulty_level: string;
    audio_url: string;
    image_url: string | null;
    createdAt: string;
    created_at: string;
  };
  example_sentences: {
    _id: string;
    vocab_id: string;
    sentence_en: string;
    sentence_vi: string;
    context: string | null;
    audio_url: string;
  }[];
}

interface UseLessonVocabularyResult {
  loading: boolean;
  error: string | null;
  vocabList: LessonVocabulary[];
  refresh: () => Promise<void>;
}

export const useLessonVocabulary = (lessonId: string, token: string): UseLessonVocabularyResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vocabList, setVocabList] = useState<LessonVocabulary[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const condition = encodeURIComponent(JSON.stringify({ lesson_id: lessonId }));
      const url = `https://prolingo-be.iuptit.com/lesson-vocabulary/page?page=1&limit=20&condition=${condition}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVocabList(res.data?.data?.result || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Lỗi khi tải danh sách từ vựng');
    } finally {
      setLoading(false);
    }
  }, [lessonId, token]);

  useEffect(() => {
    if (lessonId && token) fetchData();
  }, [fetchData, lessonId, token]);

  return { loading, error, vocabList, refresh: fetchData };
};
