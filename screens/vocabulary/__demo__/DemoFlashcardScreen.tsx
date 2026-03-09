import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { mockFlashcards } from '../__mocks__';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { SecondaryButton } from '../components/SecondaryButton';
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

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

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

        {/* Navigation buttons */}
        <View className="mt-6 flex-row gap-3">
          <SecondaryButton
            label="← Previous"
            onPress={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1"
          />
          <SecondaryButton
            label="Next →"
            onPress={handleNext}
            disabled={currentIndex === mockFlashcards.length - 1}
            className="flex-1"
          />
        </View>
      </View>

      {/* Debug Controls */}
      <View className="bg-gray-100 px-6 pb-6 dark:bg-gray-800">
        <Text className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
          Debug Controls:
        </Text>
        <Pressable
          onPress={() => setIsFlipped(!isFlipped)}
          className="rounded-lg bg-blue-500 py-2 px-4"
        >
          <Text className="text-center text-sm text-white">
            Toggle Flip (Current: {isFlipped ? 'Back' : 'Front'})
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
