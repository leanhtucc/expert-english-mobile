import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { IconNotifiRed, IconUserProfileAvatar } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

// 🌟 IMPORT HOOK THEME

interface HeaderGreetingProps {
  name?: string;
  greeting?: string;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

const getGreetingTime = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Good morning,';
  if (currentHour < 18) return 'Good afternoon,';
  return 'Good evening,';
};

export const HeaderGreeting: React.FC<HeaderGreetingProps> = ({
  name = 'Alex Rivera',
  greeting = getGreetingTime(),
  onNotificationPress,
  onMenuPress,
}) => {
  const navigation = useNavigation<any>(); // Khởi tạo navigation
  const { colors, isDark } = useAppTheme(); // Lấy theme hiện tại (Light/Dark)

  return (
    <View className="mb-4 mt-2 flex-row items-center justify-between px-5">
      {/* 1. KHỐI BÊN TRÁI: Menu + Lời chào */}
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={onMenuPress} activeOpacity={0.7} className="p-1">
          {/* Đổi màu icon Hamburger theo Dark Mode */}
          <Feather name="list" size={26} color={colors.text} />
        </TouchableOpacity>

        <View>
          <Text className="text-[14px] font-medium" style={{ color: colors.muted }}>
            {greeting}
          </Text>
          <Text className="text-[18px] font-black tracking-tight" style={{ color: colors.text }}>
            {name}
          </Text>
        </View>
      </View>

      {/* 2. KHỐI BÊN PHẢI: Chuông + Avatar */}
      <View className="flex-row items-center gap-4">
        {/* Nút Notification */}
        <TouchableOpacity
          onPress={onNotificationPress}
          className="h-[44px] w-[44px] items-center justify-center rounded-full"
          style={{ backgroundColor: isDark ? colors.surface : '#FFE4E6' }}
          activeOpacity={0.7}
        >
          <IconNotifiRed
            width={22}
            height={22}
            color={isDark ? '#FF8A8A' : '#C8102E'} // Đổi màu chuông cho hợp Dark Mode
          />
        </TouchableOpacity>

        {/* Nút Avatar chuyển sang ProfileScreen */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}
        >
          <View
            className="h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full border-[2px]"
            style={{
              borderColor: isDark ? colors.border : '#FFE4E6',
              backgroundColor: isDark ? colors.surfaceElevated : '#F1F5F9',
            }}
          >
            <IconUserProfileAvatar width={46} height={46} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
