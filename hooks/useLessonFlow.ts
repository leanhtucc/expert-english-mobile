import { useCallback, useEffect, useRef, useState } from 'react';

import { Audio } from 'expo-av';

import { apiConfig } from '@/api';
import { learningApi } from '@/api/endpoints/learning.api';

const PRELOAD_AUDIO_COUNT = 6;

const LOG = '[useLessonFlow]';

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

  const soundRef = useRef<Audio.Sound | null>(null);
  const audioModeReadyRef = useRef<Promise<void> | null>(null);
  const preloadedSoundsRef = useRef<Map<string, Audio.Sound>>(new Map());

  const fetchLessonData = useCallback(async () => {
    if (!lessonId) return;

    try {
      setLoading(true);
      setError(null);
      console.log('🚀 --- BẮT ĐẦU FETCH DATA CHO LESSON ID:', lessonId, '---');

      // 1. Lấy vocab IDs
      const vocabRes = await learningApi.getLessonVocabularies({
        condition: JSON.stringify({ lesson_id: lessonId }),
        sort: JSON.stringify({ order_index: 1 }),
      });

      const vocabItems = vocabRes.data.data?.result || [];
      console.log(`📍 1. Đã lấy được Vocab IDs (Tổng: ${vocabItems.length}):`, vocabItems);

      if (vocabItems.length === 0) {
        console.log('⚠️ Lesson này không có từ vựng nào.');
        setFlashcards([]);
        return;
      }

      // Khởi tạo flashcard session theo lesson, lấy toàn bộ từ để học.
      const sessionPayload = {
        lesson_id: lessonId,
        session_size: vocabItems.length,
      };
      console.log('📤 [FLASHCARD SESSION START] Request:', sessionPayload);
      await learningApi
        .startFlashcardSession(sessionPayload)
        .then(res => {
          console.log('📥 [FLASHCARD SESSION START] Response:', res?.data);
          return res;
        })
        .catch(err => {
          console.log('⚠️ [FLASHCARD SESSION START] Error:', err?.response?.data || err?.message);
          return null;
        });

      // 2. Lấy detail + sentence
      console.log('⏳ Đang gọi API lấy chi tiết từng từ vựng và câu ví dụ...');
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

      // LOG KẾT QUẢ CUỐI CÙNG (JSON.stringify để in ra dạng cây đẹp mắt)
      console.log('✅ 2. DỮ LIỆU ĐÃ MAP HOÀN CHỈNH:', JSON.stringify(resolvedFlashcards, null, 2));

      setFlashcards(resolvedFlashcards);
    } catch (err: any) {
      console.error('🚨 LỖI LẤY DATA FLASHCARD:', err?.response?.data || err.message);
      setError('Không thể tải dữ liệu bài học');
    } finally {
      setLoading(false);
      console.log('🏁 --- KẾT THÚC FETCH DATA ---');
    }
  }, [lessonId]);

  useEffect(() => {
    fetchLessonData();
  }, [fetchLessonData]);

  useEffect(() => {
    audioModeReadyRef.current = Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).catch(e => {
      console.log(`${LOG} setAudioModeAsync:`, e);
    });

    const preloadedMap = preloadedSoundsRef.current;

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      preloadedMap.forEach(s => {
        s.unloadAsync().catch(() => null);
      });
      preloadedMap.clear();
    };
  }, []);

  useEffect(() => {
    if (!flashcards?.length) return;

    const urls = [
      ...new Set(
        flashcards
          .slice(0, PRELOAD_AUDIO_COUNT)
          .map(f => f.audioUrl)
          .filter(Boolean)
      ),
    ] as string[];

    let cancelled = false;

    (async () => {
      await audioModeReadyRef.current;
      if (cancelled) return;

      for (const uri of urls) {
        if (cancelled || preloadedSoundsRef.current.has(uri)) continue;
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: false, volume: 1 }
          );
          if (cancelled) {
            await sound.unloadAsync();
            continue;
          }
          preloadedSoundsRef.current.set(uri, sound);
        } catch {
          // URL lỗi — lúc bấm sẽ thử createAsync lại
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [flashcards]);

  const playAudio = useCallback(async (audioUrl: string | null | undefined) => {
    if (!audioUrl) {
      console.log(`${LOG} Không có URL audio`);
      return;
    }
    try {
      if (!audioModeReadyRef.current) {
        audioModeReadyRef.current = Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        }).catch(e => {
          console.log(`${LOG} setAudioModeAsync:`, e);
        });
      }
      await audioModeReadyRef.current;

      const preloaded = preloadedSoundsRef.current.get(audioUrl);

      if (soundRef.current) {
        const prev = soundRef.current;
        await prev.stopAsync().catch(() => null);
        const prevIsPreloaded = [...preloadedSoundsRef.current.values()].includes(prev);
        if (!prevIsPreloaded) {
          await prev.unloadAsync().catch(() => null);
        }
        soundRef.current = null;
      }

      if (preloaded) {
        soundRef.current = preloaded;
        await preloaded.setPositionAsync(0);
        await preloaded.playAsync();
        return;
      }

      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl }, { shouldPlay: true });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => null);
          if (soundRef.current === sound) soundRef.current = null;
        }
      });
    } catch (err) {
      console.log(`${LOG} Lỗi phát audio:`, err);
    }
  }, []);

  return { loading, flashcards, error, refetch: fetchLessonData, playAudio };
};
