import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconNextButtonPage } from '@/components/icon';

import { CARD_BG_DARK } from '../constants/profile.constants';

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  isDark: boolean;
  onPress?: () => void;
  textColor?: string; // Thêm prop này để đổi màu chữ (dùng cho Logout)
  showChevron?: boolean; // Thêm prop này để ẩn hiện mũi tên
}

export function MenuRow({
  icon,
  label,
  subtitle,
  right,
  isDark,
  onPress,
  textColor,
  showChevron = true,
}: MenuRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className="flex-row items-center px-4 py-4"
      style={{ backgroundColor: isDark ? CARD_BG_DARK : '#FFFFFF' }}
    >
      <View className="mr-4">{icon}</View>
      <View className="flex-1 justify-center">
        <Text
          className="text-[16px] font-semibold"
          style={{ color: textColor ? textColor : isDark ? '#FFF' : '#1A1A2E' }}
        >
          {label}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 text-[13px]" style={{ color: '#8A8FA8' }}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* Container bên phải chứa Switch và Mũi tên */}
      <View className="flex-row items-center">
        {right && <View className="mr-2">{right}</View>}
        {showChevron && (
          <IconNextButtonPage width={16} height={16} color={isDark ? '#FFF' : '#C4C4C4'} />
        )}
      </View>
    </TouchableOpacity>
  );
}
