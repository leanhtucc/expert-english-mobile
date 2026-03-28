import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Audio } from 'expo-av';

import { learningApi } from '@/api/endpoints/learning.api';

const PRELOAD_AUDIO_COUNT = 6;

// ================= TYPES =================
export interface FlashcardItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definitionEn: string;
  definitionVi: string;
  exampleEn: string;
  exampleVi: string;
  audioUrl?: string | null;
  imageUrl?: string | null;
  isRemembered?: boolean;
  rememberedCount?: number;
}

interface UseFlashcardProps {
  flashcards: FlashcardItem[];
  onComplete?: () => void;
}

// ================= HOOK =================
export const useFlashcard = ({ flashcards, onComplete }: UseFlashcardProps) => {
  const [queue, setQueue] = useState<FlashcardItem[]>([]);
  const [currentCard, setCurrentCard] = useState<FlashcardItem | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // STATE lưu tổng số thẻ phải học trong session này
  const [sessionTotal, setSessionTotal] = useState(0);

  const soundRef = useRef<Audio.Sound | null>(null);
  const audioModeReadyRef = useRef<Promise<void> | null>(null);
  const preloadedSoundsRef = useRef<Map<string, Audio.Sound>>(new Map());
  const isCompletingRef = useRef(false);

  const completeSession = useCallback(() => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    setCurrentCard(null);
    setIsFlipped(false);
    onComplete?.();
  }, [onComplete]);

  // ================= INIT QUEUE =================
  useEffect(() => {
    if (!flashcards.length) return;

    isCompletingRef.current = false;

    // Học toàn bộ từ của lesson, không cắt ngẫu nhiên số lượng.
    const fullQueue = [...flashcards];

    setQueue(fullQueue);
    setCurrentCard(fullQueue[0]);
    setSessionTotal(fullQueue.length);
  }, [flashcards]);

  // ================= AUDIO SESSION + CLEANUP =================
  useEffect(() => {
    audioModeReadyRef.current = Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).catch(e => {
      console.log('[useFlashcard] setAudioModeAsync:', e);
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

  // Preload audio cho thẻ đang học + vài thẻ kế tiếp trong queue (giảm trễ do tải mạng).
  useEffect(() => {
    if (!queue.length) return;

    const urls = [
      ...new Set(
        queue
          .slice(0, PRELOAD_AUDIO_COUNT)
          .map(c => c.audioUrl)
          .filter(Boolean)
      ),
    ] as string[];

    const keep = new Set(urls);
    preloadedSoundsRef.current.forEach((sound, uri) => {
      if (keep.has(uri)) return;
      if (soundRef.current === sound) return;
      sound.unloadAsync().catch(() => null);
      preloadedSoundsRef.current.delete(uri);
    });

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
          // Lỗi URL — lúc bấm sẽ thử createAsync lại
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [queue]);

  // ================= ACTIONS =================
  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleKnowIt = useCallback(() => {
    if (!currentCard || isCompletingRef.current) return;

    const swipePayload = {
      vocab_id: currentCard.id,
      outcome: 'remembered' as const,
    };
    console.log('📤 [FLASHCARD SWIPE] Request:', swipePayload);
    learningApi
      .swipeFlashcard(swipePayload)
      .then(res => {
        console.log('📥 [FLASHCARD SWIPE] Response:', res?.data);
        return res;
      })
      .catch(err => {
        console.log('⚠️ [FLASHCARD SWIPE] Error:', err?.response?.data || err?.message);
        return null;
      });

    setQueue(prevQueue => {
      const count = Number(currentCard.rememberedCount || 0);

      let delay = 5;
      if (count >= 2) delay = 8;
      if (count >= 3) delay = 12;

      const newQueue = prevQueue.slice(1);

      if (count < 4) {
        const insertIndex = Math.min(delay, newQueue.length);
        newQueue.splice(insertIndex, 0, {
          ...currentCard,
          rememberedCount: count + 1,
        });
      }

      if (!newQueue.length) {
        completeSession();
        return [];
      }

      setCurrentCard(newQueue[0]);
      setIsFlipped(false);
      return newQueue;
    });
  }, [completeSession, currentCard]);

  const handleDontKnow = useCallback(() => {
    if (!currentCard || isCompletingRef.current) return;

    const swipePayload = {
      vocab_id: currentCard.id,
      outcome: 'not_remembered' as const,
    };
    console.log('📤 [FLASHCARD SWIPE] Request:', swipePayload);
    learningApi
      .swipeFlashcard(swipePayload)
      .then(res => {
        console.log('📥 [FLASHCARD SWIPE] Response:', res?.data);
        return res;
      })
      .catch(err => {
        console.log('⚠️ [FLASHCARD SWIPE] Error:', err?.response?.data || err?.message);
        return null;
      });

    setQueue(prevQueue => {
      const newQueue = prevQueue.slice(1);

      // Nhét lại vào vị trí gần để học lại ngay lập tức
      const insertIndex = Math.min(2, newQueue.length);
      newQueue.splice(insertIndex, 0, {
        ...currentCard,
        rememberedCount: 0,
      });

      if (!newQueue.length) {
        completeSession();
        return [];
      }

      setCurrentCard(newQueue[0]);
      setIsFlipped(false);
      return newQueue;
    });
  }, [completeSession, currentCard]);

  // ================= AUDIO =================
  const handlePlayAudio = useCallback(async () => {
    const audioUrl = currentCard?.audioUrl;
    if (!audioUrl || isPlaying) return;

    try {
      setIsPlaying(true);

      if (!audioModeReadyRef.current) {
        audioModeReadyRef.current = Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        }).catch(e => {
          console.log('[useFlashcard] setAudioModeAsync:', e);
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
        preloaded.setOnPlaybackStatusUpdate(status => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        return;
      }

      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl }, { shouldPlay: true });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => null);
          if (soundRef.current === sound) soundRef.current = null;
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.log('🚨 Audio error:', err);
      setIsPlaying(false);
    }
  }, [currentCard, isPlaying]);

  // ================= PROGRESS TRIGER =================
  const progress = useMemo(() => {
    // SỐ THẺ ĐÃ HỌC XONG = TỔNG BAN ĐẦU - SỐ THẺ CÒN LẠI TRONG QUEUE
    const completedCount = sessionTotal > 0 ? sessionTotal - queue.length : 0;

    return {
      current: completedCount,
      total: sessionTotal,
      percent: sessionTotal === 0 ? 0 : Math.round((completedCount / sessionTotal) * 100),
    };
  }, [sessionTotal, queue.length]); // Khai báo rõ dependency để React biết khi nào cần tính lại

  // ================= RESET =================
  const reset = useCallback(() => {
    // Thường thì reset sẽ do component cha (VocabularyLearning) lo bằng cách đập đi xây lại
  }, []);

  return {
    currentCard,
    isFlipped,
    isPlaying,
    progress,
    queueLength: queue.length,

    handleFlip,
    handleKnowIt,
    handleDontKnow,
    handlePlayAudio,
    reset,
  };
};
