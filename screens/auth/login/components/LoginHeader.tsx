import React from 'react';
import { Text, View } from 'react-native';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Header của màn đăng nhập với title và subtitle
 */
export const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mb-6">
      <Text className="mb-3 text-center text-2xl font-bold text-gray-900">{title}</Text>
      <Text className="text-center text-sm leading-5 text-gray-600">{subtitle}</Text>
    </View>
  );
};
