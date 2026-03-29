import { Feather } from '@expo/vector-icons';

// 🌟 1. IMPORT HOOK NÀY
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { IconNotifiRed, IconUserProfileAvatar } from '@/components/icon';
import { IconNotification, IconUserProfile } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

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
  const navigation = useNavigation<any>(); // 🌟 2. KHỞI TẠO NAVIGATION

  return (
    <View className="mb-4 mt-2 flex-row items-center justify-between px-5">
      {/* 1. KHỐI BÊN TRÁI */}
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={onMenuPress} activeOpacity={0.7} className="p-1">
          <Feather name="list" size={26} color="#0F172A" />
        </TouchableOpacity>
        <View>
          <Text className="text-[14px] font-medium text-[#64748B]">{greeting}</Text>
          <Text className="text-[18px] font-black tracking-tight text-[#0F172A]">{name}</Text>
        </View>
      </View>

      {/* 2. KHỐI BÊN PHẢI */}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity
          onPress={onNotificationPress}
          className="h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FFE4E6]"
          activeOpacity={0.7}
        >
          <IconNotifiRed width={22} height={22} color="#C8102E" />
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ProfileScreen'); // 🌟 Đã dùng được navigation ở đây
          }}
        >
          <View className="h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full border-[2px] border-[#FFE4E6] bg-slate-100">
            <IconUserProfileAvatar width={46} height={46} />
          </View>
        </TouchableOpacity>
      </View>
  const { colors, isDark } = useAppTheme();

  return (
    <View className="flex-row items-center justify-between px-5 py-4">
      <View className="flex-row items-center gap-3">
        <View
          className="h-11 w-11 items-center justify-center rounded-full border"
          style={{
            borderColor: isDark ? colors.border : '#FECACA',
            backgroundColor: isDark ? colors.surface : '#FEE2E2',
          }}
        >
          <IconUserProfile width={26} height={26} />
        </View>
        <View>
          <Text className="text-xs" style={{ color: colors.muted }}>
            {greeting}
          </Text>
          <Text className="text-base font-bold" style={{ color: colors.text }}>
            {name}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onNotificationPress}
        className="h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: isDark ? colors.surface : '#F3F4F6' }}
        activeOpacity={0.7}
      >
        <IconNotification width={22} height={22} iconColor={isDark ? '#FFFFFF' : '#334155'} />
      </TouchableOpacity>
    </View>
  );
};
