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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#F8FAFC' }}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: 'space-between' }}>
        {/* Header + Progress */}
        <View>
          <ScreenHeader
            title="Vocabulary Flashcard"
            subtitle="Listen + Speak"
            onBack={onBack}
            onClose={onClose}
          />
          <ProgressBar current={progress.current} total={progress.total} />
        </View>
        {/* Card center */}
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <FlashcardCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            onPlayAudio={handlePlayAudio}
          />
        </View>
        {/* Controls bottom */}
        <View style={{ paddingBottom: insets.bottom, paddingTop: 8 }}>
          <FlashcardControls
            onKnowIt={handleKnowIt}
            onDontKnow={handleDontKnow}
            disabled={!isFlipped}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
