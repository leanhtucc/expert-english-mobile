import { useCallback, useState } from 'react';

export interface FlashcardItem {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  example: string;
  translation: string;
  audioUrl?: string;
  imageUrl?: string;
}

interface UseFlashcardProps {
  flashcards: FlashcardItem[];
  onComplete?: () => void;
}

export const useFlashcard = ({ flashcards, onComplete }: UseFlashcardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [reviewCards, setReviewCards] = useState<string[]>([]);

  const currentCard = flashcards[currentIndex];
  const isLastCard = currentIndex === flashcards.length - 1;

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleKnowIt = useCallback(() => {
    if (!currentCard) return;

    setKnownCards(prev => [...prev, currentCard.id]);

    if (isLastCard) {
      onComplete?.();
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentCard, isLastCard, onComplete]);

  const handleDontKnow = useCallback(() => {
    if (!currentCard) return;

    setReviewCards(prev => [...prev, currentCard.id]);

    if (isLastCard) {
      onComplete?.();
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }, [currentCard, isLastCard, onComplete]);

  const handlePlayAudio = useCallback(() => {
    // Audio playback logic here
    console.log('Playing audio for:', currentCard?.word);
  }, [currentCard]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setReviewCards([]);
  }, []);

  return {
    currentCard,
    currentIndex,
    totalCards: flashcards.length,
    isFlipped,
    isLastCard,
    knownCards,
    reviewCards,
    progress: {
      current: currentIndex + 1,
      total: flashcards.length,
    },
    handleFlip,
    handleKnowIt,
    handleDontKnow,
    handlePlayAudio,
    reset,
  };
};
