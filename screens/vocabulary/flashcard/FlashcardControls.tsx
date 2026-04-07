import React, { memo } from 'react';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { SecondaryButton } from '../components';
// Tùy đường dẫn của bạn nhé
import { PrimaryButton } from '../components/PrimaryButton';

interface FlashcardControlsProps {
  onKnowIt: () => void;
  onDontKnow: () => void;
}

export const FlashcardControls: React.FC<FlashcardControlsProps> = memo(
  ({ onKnowIt, onDontKnow }) => {
    return (
      <View className="mt-4 w-full flex-row items-center px-4 pb-2">
        {/* NÚT DON'T KNOW */}
        <View className="mr-2 flex-1">
          <SecondaryButton
            label="DON'T KNOW"
            onPress={onDontKnow}
            icon={<FontAwesome name="close" size={16} color="#475569" />}
            labelClassName="text-[#475569] text-[15px]"
            centered={true}
            style={{ borderWidth: 0, backgroundColor: '#F1F5F9' }}
          />
        </View>

        {/* NÚT KNOW IT */}
        <View className="ml-2 flex-1">
          <PrimaryButton
            label="KNOW IT"
            onPress={onKnowIt}
            icon={<FontAwesome name="check" size={16} color="#fff" />}
          />
        </View>
      </View>
    );
  }
);
FlashcardControls.displayName = 'FlashcardControls';
