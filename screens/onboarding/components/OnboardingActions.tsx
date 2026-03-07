import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconEmail, IconGoogle, IconNextButton } from '@/components/icon';

interface OnboardingActionsProps {
  step: number;
  onGetStarted: () => void;
  onLogin: () => void;
  onGoogleLogin: () => void;
  onEmailLogin: () => void;
  getStartedText: string;
  loginText: string;
  termsText: string;
}

/**
 * Component hiển thị các nút hành động (Get Started, Login link)
 */
export const OnboardingActions: React.FC<OnboardingActionsProps> = ({
  step,
  onGetStarted,
  onLogin,
  onGoogleLogin,
  onEmailLogin,
  getStartedText,
  loginText,
  termsText,
}) => {
  const insets = useSafeAreaInsets();

  if (step === 1) {
    return (
      <View className="px-6 pb-8">
        <TouchableOpacity
          className="mb-4 flex-row items-center justify-center rounded-full bg-white px-8 py-4 shadow-lg"
          onPress={onGoogleLogin}
          activeOpacity={0.8}
        >
          <IconGoogle width={22} height={22} />
          <Text className="ml-3 text-base font-semibold text-gray-800">Continue with Google</Text>
        </TouchableOpacity>

        {/* Email Button */}
        <TouchableOpacity
          className="mb-6 flex-row items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 py-4"
          onPress={onEmailLogin}
          activeOpacity={0.8}
        >
          <IconEmail width={22} height={22} />
          <Text className="ml-3 text-base font-medium text-white">Continue with Email</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text className="text-center text-xs leading-5 text-white/70">
          By signing up, you agree to our{' '}
          <Text className="text-white/90 underline">Terms of Service</Text> and{' '}
          <Text className="text-white/90 underline">Privacy Policy</Text>
        </Text>

        {/* Bottom indicator */}
        <View
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
          className="mt-3 items-center"
        ></View>
      </View>
    );
  }

  return (
    <View className="px-6 pb-8">
      {/* Get Started Button */}
      <TouchableOpacity
        className="mb-5 flex-row items-center justify-center rounded-full bg-white px-8 py-4 shadow-lg"
        onPress={onGetStarted}
        activeOpacity={0.8}
      >
        <Text className="text-lg font-bold text-[#C6102E]">{getStartedText}</Text>
        <View className="ml-2">
          <IconNextButton width={18} height={18} />
        </View>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity
        className="mb-6 items-center rounded-full border-[1.5px] border-white/30 px-8 py-4"
        onPress={onLogin}
        activeOpacity={0.8}
      >
        <Text className="text-base font-medium text-white">{loginText}</Text>
      </TouchableOpacity>

      {/* Terms and Privacy */}
      <Text className="text-center text-xs leading-5 text-white/50">{termsText}</Text>

      {/* Bottom indicator */}
      <View style={{ paddingBottom: Math.max(insets.bottom, 16) }} className="items-center"></View>
    </View>
  );
};
