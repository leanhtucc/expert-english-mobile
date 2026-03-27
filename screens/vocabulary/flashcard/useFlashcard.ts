import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Audio } from 'expo-av';

import { learningApi } from '@/api/endpoints/learning.api';

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

  // ================= CLEANUP AUDIO =================
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

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
    if (!currentCard?.audioUrl || isPlaying) return;

    try {
      setIsPlaying(true);
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: currentCard.audioUrl },
        { shouldPlay: true }
      );
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
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
