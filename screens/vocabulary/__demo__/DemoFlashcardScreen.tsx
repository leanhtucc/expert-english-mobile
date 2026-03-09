import React, { useState } from 'react';
import { View } from 'react-native';

import { mockFlashcards } from '../__mocks__';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { FlashcardCard } from '../flashcard/FlashcardCard';
import { FlashcardControls } from '../flashcard/FlashcardControls';

/**
 * Demo screen for testing Flashcard UI with mock data
 * Shows all UI states: default, flipped, known, unknown
 */
export const DemoFlashcardScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = mockFlashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  // const handlePrevious = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //     setIsFlipped(false);
  //   }
  // };

  const handleKnown = () => {
    console.log('Known:', currentCard.word);
    handleNext();
  };

  const handleUnknown = () => {
    console.log('Unknown:', currentCard.word);
    handleNext();
  };

  const handlePlayAudio = () => {
    console.log('Play audio:', currentCard.audioUrl);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScreenHeader title="Flashcards Demo" onBack={() => console.log('Back')} />

      <View className="px-4 pt-6 pb-4">
        <ProgressBar current={currentIndex + 1} total={mockFlashcards.length} />
      </View>

      <View className="flex-1 px-6 pb-8">
        <FlashcardCard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
          onPlayAudio={handlePlayAudio}
        />

        <View className="mt-6">
          <FlashcardControls onKnowIt={handleKnown} onDontKnow={handleUnknown} />
        </View>
      </View>
    </View>
  );
};
