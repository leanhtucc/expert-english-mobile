import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Audio } from 'expo-av';

import { learningApi } from '@/api/endpoints/learning.api';

const PRELOAD_AUDIO_COUNT = 6;
const REQUEUE_GAP = 3;

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
  const [studyQueue, setStudyQueue] = useState<FlashcardItem[]>(flashcards);
  const [masteredCount, setMasteredCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const audioModeReadyRef = useRef<Promise<void> | null>(null);
  const preloadedSoundsRef = useRef<Map<string, Audio.Sound>>(new Map());
  const isCompletingRef = useRef(false);
  const isHandlingActionRef = useRef(false);

  const currentCard = studyQueue[0] || null;
  const sessionTotal = flashcards.length;

  useEffect(() => {
    setStudyQueue(flashcards);
    setMasteredCount(0);
    setIsFlipped(false);
    isCompletingRef.current = false;
  }, [flashcards]);

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

  // Preload audio cho thẻ hiện tại + vài thẻ kế tiếp trong queue
  useEffect(() => {
    if (!studyQueue.length) return;

    const urls = [
      ...new Set(
        studyQueue
          .slice(0, PRELOAD_AUDIO_COUNT)
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
  }, [studyQueue]);

  // ================= ACTIONS =================
  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  // DON'T KNOW: đẩy thẻ hiện tại ra sau vài vị trí để ôn lại sớm.
  // KNOW IT: loại thẻ khỏi queue.
  const handleSwipe = useCallback(
    (outcome: 'remembered' | 'not_remembered') => {
      if (!currentCard || isCompletingRef.current || isHandlingActionRef.current) return;

      isHandlingActionRef.current = true;

      learningApi.swipeFlashcard({ vocab_id: currentCard.id, outcome }).catch(err => {
        console.log('⚠️ [FLASHCARD SWIPE] Error:', err?.response?.data || err?.message);
      });

      setIsFlipped(false);

      const [head, ...rest] = studyQueue;
      if (!head) {
        isHandlingActionRef.current = false;
        return;
      }

      let nextQueue = rest;

      if (outcome === 'not_remembered') {
        const insertIndex = Math.min(REQUEUE_GAP, rest.length);
        nextQueue = [...rest];
        nextQueue.splice(insertIndex, 0, head);
      }

      setStudyQueue(nextQueue);

      if (outcome === 'remembered') {
        setMasteredCount(prev => Math.min(prev + 1, sessionTotal));
      }

      if (nextQueue.length === 0) {
        completeSession();
      }

      requestAnimationFrame(() => {
        isHandlingActionRef.current = false;
      });
    },
    [currentCard, completeSession, sessionTotal, studyQueue]
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
      current: masteredCount,
      total: sessionTotal,
      percent: sessionTotal === 0 ? 0 : Math.round((masteredCount / sessionTotal) * 100),
    };
  }, [sessionTotal, masteredCount]);

  const reset = useCallback(() => {
    setStudyQueue(flashcards);
    setMasteredCount(0);
    setIsFlipped(false);
    isCompletingRef.current = false;
  }, [flashcards]);

  return {
    currentCard,
    isFlipped,
    isPlaying,
    progress,
    queueLength: studyQueue.length,

    handleFlip,
    handleKnowIt,
    handleDontKnow,
    handlePlayAudio,
    reset,
  };
};
