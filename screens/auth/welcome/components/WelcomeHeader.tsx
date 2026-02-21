import React from 'react';
import { Text, View } from 'react-native';

interface WelcomeHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Component hiển thị tiêu đề và mô tả màn hình welcome
 */
export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="px-6">
      <Text className="mb-3 text-3xl font-bold text-gray-900">{title}</Text>
      <Text className="text-base leading-6 text-gray-600">{subtitle}</Text>
    </View>
  );
};
