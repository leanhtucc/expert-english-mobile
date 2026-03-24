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

// ================= HELPERS =================
const shuffle = <T>(arr: T[]): T[] => {
  const cloned = [...arr];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};

// ================= HOOK =================
export const useFlashcard = ({ flashcards, onComplete }: UseFlashcardProps) => {
  const [queue, setQueue] = useState<FlashcardItem[]>([]);
  const [currentCard, setCurrentCard] = useState<FlashcardItem | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // STATE lưu tổng số thẻ phải học trong session này
  const [sessionTotal, setSessionTotal] = useState(0);

  const soundRef = useRef<Audio.Sound | null>(null);

  // ================= INIT QUEUE =================
  useEffect(() => {
    if (!flashcards.length) return;

    const weak = flashcards.filter(c => (c.rememberedCount || 0) < 3);
    const learning = flashcards.filter(
      c => (c.rememberedCount || 0) >= 3 && (c.rememberedCount || 0) < 5
    );
    const mastered = flashcards.filter(c => c.isRemembered || (c.rememberedCount || 0) >= 5);

    const mixedQueue = [
      ...shuffle(weak),
      ...shuffle(learning),
      ...shuffle(mastered).slice(0, Math.ceil(mastered.length * 0.2)),
    ];

    setQueue(mixedQueue);
    setCurrentCard(mixedQueue[0]);
    setSessionTotal(mixedQueue.length); // LƯU LẠI TỔNG SỐ CỦA SESSION
  }, [flashcards]);

  // ================= CLEANUP AUDIO =================
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // ================= NEXT CARD =================
  const goToNextCard = useCallback(
    (newQueue: FlashcardItem[]) => {
      if (!newQueue.length) {
        onComplete?.();
        return;
      }
      setQueue(newQueue);
      setCurrentCard(newQueue[0]);
      setIsFlipped(false);
    },
    [onComplete]
  );

  // ================= ACTIONS =================
  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleKnowIt = useCallback(() => {
    if (!currentCard) return;

    learningApi
      .swipeFlashcard({
        vocab_id: currentCard.id,
        outcome: 'remembered',
      })
      .catch(() => null);

    const count = currentCard.rememberedCount || 0;

    let delay = 5;
    if (count >= 2) delay = 8;
    if (count >= 3) delay = 12;

    const newQueue = queue.slice(1);

    // THAY ĐỔI Ở ĐÂY: Nếu count < 4 thì nhét lại vào Queue (tăng lên thành 5 lần là Tốt nghiệp)
    if (count < 4) {
      const insertIndex = Math.min(delay, newQueue.length);
      newQueue.splice(insertIndex, 0, {
        ...currentCard,
        rememberedCount: count + 1,
      });
    }
    // NẾU COUNT >= 4 -> Thẻ bị văng ra khỏi Queue hoàn toàn -> Được tính là 1 điểm

    goToNextCard(newQueue);
  }, [currentCard, queue, goToNextCard]);

  const handleDontKnow = useCallback(() => {
    if (!currentCard) return;

    learningApi
      .swipeFlashcard({
        vocab_id: currentCard.id,
        outcome: 'not_remembered',
      })
      .catch(() => null);

    const newQueue = queue.slice(1);

    // Nhét lại vào vị trí gần để học lại ngay lập tức
    const insertIndex = Math.min(2, newQueue.length);
    newQueue.splice(insertIndex, 0, {
      ...currentCard,
      rememberedCount: 0, // Reset điểm nhớ
    });

    goToNextCard(newQueue);
  }, [currentCard, queue, goToNextCard]);

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
