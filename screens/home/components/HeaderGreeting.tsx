import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconNotification, IconUserProfile } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

interface HeaderGreetingProps {
  name?: string;
  greeting?: string;
  onNotificationPress?: () => void;
}

const getGreetingTime = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Chào buổi sáng,';
  } else if (currentHour < 18) {
    return 'Chào buổi chiều,';
  } else {
    return 'Chào buổi tối,';
  }
};

export const HeaderGreeting: React.FC<HeaderGreetingProps> = ({
  name,
  greeting = getGreetingTime(),
  onNotificationPress,
}) => {
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
