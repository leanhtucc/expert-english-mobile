import React from 'react';
import { Text, View } from 'react-native';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Header component với title và subtitle
 */
export const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mb-8">
      <Text className="mb-3 text-3xl font-bold tracking-tight text-gray-900">{title}</Text>
      <Text className="text-base leading-6 text-gray-400">{subtitle}</Text>
    </View>
  );
};
