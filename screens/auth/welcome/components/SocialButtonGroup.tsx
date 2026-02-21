import React from 'react';
import { View } from 'react-native';

import { SocialButton } from './SocialButton';

interface SocialButtonGroupProps {
  onGooglePress: () => void;
  onEmailPress: () => void;
  onFacebookPress: () => void;
}

/**
 * Component nhóm các button đăng nhập
 */
export const SocialButtonGroup: React.FC<SocialButtonGroupProps> = ({
  onGooglePress,
  onEmailPress,
  onFacebookPress,
}) => {
  return (
    <View className="gap-4 px-6">
      <SocialButton icon="G" label="Tiếp tục với Google" onPress={onGooglePress} variant="google" />

      <SocialButton icon="✉" label="Tiếp tục với Email" onPress={onEmailPress} variant="email" />

      <SocialButton
        icon="f"
        label="Tiếp tục với Facebook"
        onPress={onFacebookPress}
        variant="facebook"
      />
    </View>
  );
};
