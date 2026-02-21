import React from 'react';
import { Text, View } from 'react-native';

/**
 * Component hiển thị icon chào mừng (👋)
 */
export const WelcomeIcon: React.FC = () => {
  return (
    <View className="my-10 items-center justify-center">
      <View className="h-32 w-32 items-center justify-center rounded-full bg-orange-100">
        <Text className="text-6xl">👋</Text>
      </View>
    </View>
  );
};
