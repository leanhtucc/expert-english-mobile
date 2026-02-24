import { MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import { View } from 'react-native';

/**
 * Icon hiển thị cho màn xác thực OTP
 */
export const VerifyIcon: React.FC = () => {
  return (
    <View className="mb-6 items-center">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-orange-100">
        <MaterialCommunityIcons name="lock-outline" size={48} color="#F97316" />
      </View>
    </View>
  );
};
