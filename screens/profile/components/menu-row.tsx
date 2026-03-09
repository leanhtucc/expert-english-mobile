import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CARD_BG_DARK } from '../profile.constants';

interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  isDark: boolean;
  onPress?: () => void;
}

export function MenuRow({ icon, label, subtitle, right, isDark, onPress }: MenuRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3.5"
      style={{ backgroundColor: isDark ? CARD_BG_DARK : '#FFFFFF' }}
    >
      <View className="mr-3">{icon}</View>
      <View className="flex-1">
        <Text
          className="mb-0.5 text-[15px] font-semibold"
          style={{ color: isDark ? '#FFF' : '#1A1A2E' }}
        >
          {label}
        </Text>
        {subtitle ? (
          <Text className="text-xs" style={{ color: '#8A8FA8' }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View>{right}</View>
    </TouchableOpacity>
  );
}
