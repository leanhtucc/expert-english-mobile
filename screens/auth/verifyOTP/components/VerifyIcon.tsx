import { MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import { View } from 'react-native';

/**
 * Icon hiển thị cho màn xác thực OTP
 */
export const VerifyIcon: React.FC = () => {
  return (
    <View className="mb-8">
      <View
        className="h-16 w-16 items-center justify-center rounded-2xl bg-rose-50"
        style={{
          shadowColor: '#C6102E',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        }}
      >
        <MaterialCommunityIcons name="email-outline" size={32} color="#C6102E" />
      </View>
    </View>
  );
};
