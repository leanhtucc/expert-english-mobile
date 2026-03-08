import React from 'react';
import { View } from 'react-native';

/**
 * Component hiển thị icon sách cho màn hình onboarding
 */
export const OnboardingIcon: React.FC = () => {
  return (
    <View className="my-19 items-center justify-center">
      <View className="relative h-[100px] w-[100px] items-center justify-center">
        {/* Stack of books */}
        <View
          className="absolute bottom-5 h-4 w-[70px] rounded bg-blue-600 shadow-md"
          style={{ transform: [{ rotate: '-5deg' }] }}
        />
        <View
          className="absolute bottom-[30px] h-4 w-[70px] rounded bg-red-600 shadow-md"
          style={{ transform: [{ rotate: '2deg' }] }}
        />
        <View
          className="absolute bottom-10 h-4 w-[70px] rounded bg-green-600 shadow-md"
          style={{ transform: [{ rotate: '-3deg' }] }}
        />
      </View>
    </View>
  );
};
