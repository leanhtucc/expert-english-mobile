import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconNotification, IconUserProfile } from '@/components/icon';

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
  return (
    <View className="flex-row items-center justify-between px-5 py-4">
      {/* Left: avatar + text */}
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-full border border-red-200 bg-red-100">
          <IconUserProfile width={26} height={26} />
        </View>
        <View>
          <Text className="text-xs text-gray-500">{greeting}</Text>
          <Text className="text-base font-bold text-gray-900">{name}</Text>
        </View>
      </View>

      {/* Right: notification bell */}
      <TouchableOpacity
        onPress={onNotificationPress}
        className="h-11 w-11 items-center justify-center rounded-full bg-gray-100"
        activeOpacity={0.7}
      >
        <IconNotification width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
};
