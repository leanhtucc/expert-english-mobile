import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { FlashcardCard } from './FlashcardCard';
import { FlashcardControls } from './FlashcardControls';
import { FlashcardItem, useFlashcard } from './useFlashcard';

interface FlashcardScreenProps {
  flashcards: FlashcardItem[];
  onComplete?: () => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const FlashcardScreen: React.FC<FlashcardScreenProps> = ({
  flashcards,
  onComplete,
  onBack,
  onClose,
}) => {
  const {
    currentCard,
    isFlipped,
    progress,
    handleFlip,
    handleKnowIt,
    handleDontKnow,
    handlePlayAudio,
  } = useFlashcard({
    flashcards,
    onComplete,
  });

  if (!currentCard) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <ScreenHeader
        title="Vocabulary Flashcard"
        subtitle="Listen + Speak"
        onBack={onBack}
        onClose={onClose}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <ProgressBar current={progress.current} total={progress.total} className="mb-6" />

        {/* Flashcard */}
        <View className="mb-6">
          <FlashcardCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onPlayAudio={handlePlayAudio}
          />
        </View>

        {/* Controls */}
        <FlashcardControls
          onKnowIt={handleKnowIt}
          onDontKnow={handleDontKnow}
          disabled={!isFlipped}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
