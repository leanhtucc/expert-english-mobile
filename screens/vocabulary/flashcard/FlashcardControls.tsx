import React from 'react';
import { View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';

interface FlashcardControlsProps {
  onKnowIt: () => void;
  onDontKnow: () => void;
  disabled?: boolean;
}

export const FlashcardControls: React.FC<FlashcardControlsProps> = ({
  onKnowIt,
  onDontKnow,
  disabled = false,
}) => {
  return (
    <View className="w-full space-y-3 px-4">
      <PrimaryButton label="✓ I know it" onPress={onKnowIt} disabled={disabled} className="mb-3" />

      <SecondaryButton label="✕ Don't know" onPress={onDontKnow} disabled={disabled} />
    </View>
  );
};
