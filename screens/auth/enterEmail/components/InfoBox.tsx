import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';

interface InfoBoxProps {
  message: string;
}

/**
 * Box hiển thị thông tin quan trọng với icon info
 */
export const InfoBox: React.FC<InfoBoxProps> = ({ message }) => {
  return (
    <View className="flex-row rounded-xl bg-blue-50 p-4">
      <Ionicons name="information-circle" size={20} color="#3B82F6" style={{ marginTop: 2 }} />
      <Text className="ml-3 flex-1 text-sm leading-5 text-blue-700">{message}</Text>
    </View>
  );
};
