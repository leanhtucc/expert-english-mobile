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
    <View className="absolute top-52 w-full flex-row items-center px-3">
      {/* Bọc nút 1: Chiếm 1 nửa, có khoảng đệm bên phải (pr-2) */}
      <View className="flex-1">
        <SecondaryButton label="✕ DON'T KNOW" onPress={onDontKnow} disabled={disabled} />
      </View>

      {/* Bọc nút 2: Chiếm 1 nửa, có khoảng đệm bên trái (pl-2) */}
      <View className="flex-1 pl-2">
        <PrimaryButton label="✓ KNOW IT" onPress={onKnowIt} disabled={disabled} />
      </View>
    </View>
  );
};
