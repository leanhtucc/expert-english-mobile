import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconEmail, IconGoogle } from '@/components/icon';

interface OnboardingActionsProps {
  onGoogleLogin: () => void;
  onEmailLogin: () => void;
  termsText: string;
}

/**
 * Component hiển thị các nút đăng nhập onboarding (Google, Email)
 */
export const OnboardingActions: React.FC<OnboardingActionsProps> = ({
  onGoogleLogin,
  onEmailLogin,
  termsText,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="px-6 pb-8">
      <TouchableOpacity
        className="mb-4 flex-row items-center justify-center rounded-full bg-white px-8 py-4 shadow-lg"
        onPress={onGoogleLogin}
        activeOpacity={0.8}
      >
        <IconGoogle width={22} height={22} />
        <Text className="ml-3 text-lg font-semibold text-gray-800">Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mb-6 flex-row items-center justify-center rounded-full border border-white/50 bg-white px-8 py-4"
        onPress={onEmailLogin}
        activeOpacity={0.8}
      >
        <IconEmail width={22} height={22} />
        <Text className="ml-3 text-lg font-semibold text-gray-800">Continue with Email</Text>
      </TouchableOpacity>

      <Text className="text-center text-xs leading-5 text-white/70">{termsText}</Text>

      <View style={{ paddingBottom: Math.max(insets.bottom, 16) }} className="mt-3 items-center" />
    </View>
  );
};
