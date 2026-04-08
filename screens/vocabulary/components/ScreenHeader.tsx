import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { IconBackLession } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onClose?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  onClose,
  className = '',
  rightAction,
}) => {
  const { isDark } = useAppTheme();
  return (
    <View className={`flex-row items-center justify-between bg-white px-2 py-3 ${className}`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* GỠ BỎ ĐIỀU KIỆN ẨN NÚT: Nút Back giờ sẽ luôn luôn hiện */}
      <View className="w-16 items-start justify-center pl-2">
        <TouchableOpacity
          onPress={() => {
            // Ưu tiên gọi onBack, nếu không có thì gọi onClose
            if (onBack) {
              onBack();
            } else if (onClose) {
              onClose();
            }
          }}
          className="p-1"
        >
          <IconBackLession width={20} height={20} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-[17px] font-bold text-gray-800">{title}</Text>
        {typeof subtitle === 'string' ? (
          <Text className="mt-0.5 text-[10px] font-black uppercase tracking-widest text-[#E11D48]">
            {subtitle}
          </Text>
        ) : (
          subtitle
        )}
      </View>

      {/* Right Action */}
      <View className="w-16 items-end justify-center">{rightAction}</View>
    </View>
  );
};
