import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { View } from 'react-native';

/**
 * Email icon component với background màu hồng cho signup screen
 */
export const EmailIcon: React.FC = () => {
  return (
    <View className="mb-8 h-16 w-16 items-center justify-center rounded-2xl bg-pink-50">
      <Ionicons name="mail-outline" size={32} color="#DC2626" />
    </View>
  );
};
