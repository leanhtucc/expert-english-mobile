import React from 'react';
import { Text, View } from 'react-native';

interface VerifyHeaderProps {
  title: string;
}

/**
 * Header của màn xác thực OTP
 */
export const VerifyHeader: React.FC<VerifyHeaderProps> = ({ title }) => {
  return (
    <View className="mb-4">
      <Text className="text-center text-2xl font-bold text-gray-900">{title}</Text>
    </View>
  );
};
