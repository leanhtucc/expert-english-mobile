import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';

import { IconBackLession } from '@/components/icon';

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
  return (
    <View className={`flex-row items-center justify-between bg-white px-2 py-3 ${className}`}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

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
      <View className="flex-1 items-center">
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
