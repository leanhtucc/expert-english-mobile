import React from 'react';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 0,
      }}
    >
      <View style={{ flex: 1, marginRight: 8 }}>
        <SecondaryButton
          label="DON'T KNOW"
          onPress={onDontKnow}
          disabled={disabled}
          icon={<FontAwesome name="close" size={18} color="#334155" />}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 8 }}>
        <PrimaryButton
          label="KNOW IT"
          onPress={onKnowIt}
          disabled={disabled}
          icon={<FontAwesome name="check" size={18} color="#fff" />}
        />
      </View>
    </View>
  );
};
