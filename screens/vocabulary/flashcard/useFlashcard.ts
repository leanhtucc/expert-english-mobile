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
  // Thay thế mảng Queue phức tạp bằng một Index đơn giản
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const audioModeReadyRef = useRef<Promise<void> | null>(null);
  const preloadedSoundsRef = useRef<Map<string, Audio.Sound>>(new Map());
  const isCompletingRef = useRef(false);

  const currentCard = flashcards[currentIndex] || null;
  const sessionTotal = flashcards.length;

  const completeSession = useCallback(() => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    onComplete?.();
  }, [onComplete]);

  // ================= AUDIO SESSION + CLEANUP =================
  useEffect(() => {
    audioModeReadyRef.current = Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).catch(e => console.log('[useFlashcard] setAudioModeAsync:', e));

    const preloadedMap = preloadedSoundsRef.current;

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      preloadedMap.forEach(s => s.unloadAsync().catch(() => null));
      preloadedMap.clear();
    };
  }, []);

  // Preload audio cho thẻ đang học + vài thẻ kế tiếp
  useEffect(() => {
    if (!flashcards.length || currentIndex >= flashcards.length) return;

    const urls = [
      ...new Set(
        flashcards
          .slice(currentIndex, currentIndex + PRELOAD_AUDIO_COUNT)
          .map(c => c.audioUrl)
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
          // Ignore
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [flashcards, currentIndex]);

  // ================= ACTIONS =================
  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  // Hàm xử lý chung cho cả 2 nút (Gọn gàng, không nhét lại card)
  const handleSwipe = useCallback(
    (outcome: 'remembered' | 'not_remembered') => {
      if (!currentCard || isCompletingRef.current) return;

      // 1. Gọi API lưu trạng thái ngầm
      learningApi.swipeFlashcard({ vocab_id: currentCard.id, outcome }).catch(err => {
        console.log('⚠️ [FLASHCARD SWIPE] Error:', err?.response?.data || err?.message);
      });

      // 2. Chuyển sang thẻ tiếp theo
      setIsFlipped(false);
      if (currentIndex + 1 < sessionTotal) {
        setCurrentIndex(prev => prev + 1);
      } else {
        completeSession();
      }
    },
    [currentCard, currentIndex, sessionTotal, completeSession]
  );

  const handleKnowIt = useCallback(() => handleSwipe('remembered'), [handleSwipe]);
  const handleDontKnow = useCallback(() => handleSwipe('not_remembered'), [handleSwipe]);

  // ================= AUDIO =================
  const handlePlayAudio = useCallback(async () => {
    const audioUrl = currentCard?.audioUrl;
    if (!audioUrl || isPlaying) return;

    try {
      setIsPlaying(true);
      await audioModeReadyRef.current;

      const preloaded = preloadedSoundsRef.current.get(audioUrl);

      if (soundRef.current) {
        const prev = soundRef.current;
        await prev.stopAsync().catch(() => null);
        if (![...preloadedSoundsRef.current.values()].includes(prev)) {
          await prev.unloadAsync().catch(() => null);
        }
        soundRef.current = null;
      }

      if (preloaded) {
        soundRef.current = preloaded;
        await preloaded.setPositionAsync(0);
        await preloaded.playAsync();
        preloaded.setOnPlaybackStatusUpdate(status => {
          if (status.isLoaded && status.didJustFinish) setIsPlaying(false);
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
    return {
      current: currentIndex, // Đã học được bao nhiêu thẻ
      total: sessionTotal,
      percent: sessionTotal === 0 ? 0 : Math.round((currentIndex / sessionTotal) * 100),
    };
  }, [sessionTotal, currentIndex]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    isCompletingRef.current = false;
  }, []);

  return {
    currentCard,
    isFlipped,
    isPlaying,
    progress,
    queueLength: sessionTotal - currentIndex, // Số thẻ còn lại

    handleFlip,
    handleKnowIt,
    handleDontKnow,
    handlePlayAudio,
    reset,
  };
};
