import React from 'react';
import { Text, View } from 'react-native';

interface VerifyHeaderProps {
  title: string;
  subtitle?: string;
}

/**
 * Header của màn xác thực OTP
 */
export const VerifyHeader: React.FC<VerifyHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mb-8">
      <Text className="mb-3 text-4xl font-bold tracking-tight text-gray-900">{title}</Text>
      {subtitle && <Text className="text-base leading-7 text-gray-400">{subtitle}</Text>}
    </View>
  );
};
