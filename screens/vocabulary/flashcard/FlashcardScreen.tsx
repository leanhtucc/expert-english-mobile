import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
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
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      <View className="mt-6 flex-1 px-3">
        <View>
          <ScreenHeader
            title="Vocabulary Flashcard"
            subtitle="Listen + Speak"
            onBack={onBack}
            onClose={onClose}
          />
          <ProgressBar current={progress.current} total={progress.total} variant="flashcard" />
        </View>

        <View className="w-full flex-1 items-center justify-center pb-6">
          <FlashcardCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onPlayAudio={handlePlayAudio}
          />
        </View>
      </View>

      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="w-full border-t border-slate-200 bg-white"
      >
        <FlashcardControls
          onKnowIt={handleKnowIt}
          onDontKnow={handleDontKnow}
          disabled={!isFlipped}
        />
      </View>
    </SafeAreaView>
  );
};
