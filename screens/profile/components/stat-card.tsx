import React from 'react';
import { Text, View } from 'react-native';

import { CARD_BG_DARK, CARD_BG_LIGHT } from '../profile.constants';

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
}

export function StatCard({ value, label, icon, isDark }: StatCardProps) {
  return (
    <View
      className="flex-1 items-center justify-center rounded-xl py-4"
      style={{
        backgroundColor: isDark ? CARD_BG_DARK : CARD_BG_LIGHT,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        maxWidth: 100,
      }}
    >
      <View className="mb-1">{icon}</View>
      <Text
        className="mb-0.5 text-lg font-extrabold"
        style={{ color: isDark ? '#FFF' : '#1A1A2E' }}
      >
        {value}
      </Text>
      <Text className="text-[12px] font-semibold tracking-wider" style={{ color: '#8A8FA8' }}>
        {label}
      </Text>
    </View>
  );
}
