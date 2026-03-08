import React from 'react';
import { View } from 'react-native';

import { IconCommunity, IconLegal, IconMedical, IconRobot } from '@/components/icon';

/**
 * Component hiển thị robot với các icon xung quanh cho màn hình onboarding
 */
export const RobotWithIcons: React.FC = () => {
  return (
    <View className="items-center justify-center py-10">
      {/* Main robot container with backdrop circles */}
      <View className="relative h-[300px] w-[300px] items-center justify-center">
        {/* Backdrop circles */}
        <View className="absolute z-0 h-[200px] w-[200px] rounded-full bg-white/30" />

        {/* Robot SVG Icon */}
        <View className="z-10 items-center justify-center">
          <IconRobot width={160} height={160} />
        </View>

        {/* Floating Icons */}
        {/* Legal Icon - Left */}
        <View className="absolute left-[20px] top-[100px] z-10 h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-lg">
          <IconLegal width={24} height={24} />
        </View>

        {/* Medical Icon - Top Right */}
        <View className="absolute right-[30px] top-[40px] z-10 h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-lg">
          <IconMedical width={24} height={24} />
        </View>

        {/* Community Icon - Bottom Right */}
        <View className="absolute bottom-[60px] right-[20px] z-10 h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-lg">
          <IconCommunity width={24} height={24} />
        </View>
      </View>
    </View>
  );
};
