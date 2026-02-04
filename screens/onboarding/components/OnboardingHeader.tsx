import React from 'react';
import { Text, View } from 'react-native';

interface OnboardingHeaderProps {
  title: string;
  description: string;
}

/**
 * Component hiển thị tiêu đề và mô tả cho màn hình onboarding
 */
export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ title, description }) => {
  return (
    <View className="my-10 px-6">
      <Text className="mb-4 text-center text-[28px] font-bold leading-9 text-gray-800">
        {title}
      </Text>
      <Text className="text-center text-base font-normal leading-6 text-gray-500">
        {description}
      </Text>
    </View>
  );
};
