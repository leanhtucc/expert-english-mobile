import React from 'react';
import { Text, View } from 'react-native';

import { IconLogoStart } from '@/components/icon';

interface OnboardingHeaderProps {
  appName: string;
  tagline: string;
  title: string;
  description: string;
}

/**
 * Component hiển thị tiêu đề và mô tả cho màn hình onboarding
 */
export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  appName,
  tagline,
  title,
  description,
}) => {
  return (
    <View className="-mt-8 px-6 pb-10">
      {/* App Name with Language Icon */}
      <View className="mb-3 flex-row items-center justify-center">
        <IconLogoStart width={32} height={32} className="mr-2" />
        <Text className="text-3xl font-bold text-white">{appName}</Text>
      </View>

      {/* Tagline */}
      <Text className="mb-9 text-center text-lg font-medium text-white">{tagline}</Text>

      {/* Main Title */}
      <Text className="mb-3 text-center text-[25px] font-bold leading-tight text-white">
        {title}
      </Text>

      {/* Description */}
      <Text className="text-center text-base leading-6 text-white/50">{description}</Text>
    </View>
  );
};
