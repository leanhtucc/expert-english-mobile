import { MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';
import { View } from 'react-native';

/**
 * Icon hiển thị cho màn đăng nhập email
 */
export const LoginIcon: React.FC = () => {
  return (
    <View className="mb-10">
      <View
        className="h-20 w-20 items-center justify-center rounded-3xl bg-rose-50"
        style={{
          shadowColor: '#C6102E',
          shadowOpacity: 0.12,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        }}
      >
        <MaterialCommunityIcons name="email-outline" size={38} color="#C6102E" />
      </View>
    </View>
  );
};
