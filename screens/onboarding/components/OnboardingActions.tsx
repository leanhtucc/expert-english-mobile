import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface OnboardingActionsProps {
  onTryNow: () => void;
  onLogin: () => void;
}

/**
 * Component hiển thị các nút hành động (Học thử ngay, Đăng nhập)
 */
export const OnboardingActions: React.FC<OnboardingActionsProps> = ({ onTryNow, onLogin }) => {
  return (
    <View className="gap-4 px-6 pb-10">
      <TouchableOpacity
        className="items-center rounded-xl bg-orange-500 px-8 py-4 shadow-lg"
        onPress={onTryNow}
        activeOpacity={0.8}
      >
        <Text className="text-lg font-bold text-white">Học thử ngay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center justify-center rounded-xl border-[1.5px] border-gray-200 bg-white px-8 py-4"
        onPress={onLogin}
        activeOpacity={0.8}
      >
        <View className="mr-2">
          <Text className="text-lg text-gray-800">◉</Text>
        </View>
        <Text className="text-base font-semibold text-gray-800">Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};
