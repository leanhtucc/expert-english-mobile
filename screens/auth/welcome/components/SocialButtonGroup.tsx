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
    <View className="px-6">
      <View className="mb-4">
        <SocialButton
          iconName="google"
          label="Tiếp tục với Google"
          onPress={onGooglePress}
          variant="google"
        />
      </View>

      <View className="mb-4">
        <SocialButton
          iconName="email"
          label="Tiếp tục với Email"
          onPress={onEmailPress}
          variant="email"
        />
      </View>

      <View>
        <SocialButton
          iconName="facebook"
          label="Tiếp tục Facebook"
          onPress={onFacebookPress}
          variant="facebook"
        />
      </View>
    </View>
  );
};
