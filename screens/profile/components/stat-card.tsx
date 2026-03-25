import React from 'react';
import { Text, View } from 'react-native';

import { CARD_BG_DARK, CARD_BG_LIGHT } from '../constants/profile.constants';

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
}

export function StatCard({ value, label, icon, isDark }: StatCardProps) {
  return (
    <View
      className="w-full items-center justify-center rounded-2xl py-4"
      style={{
        backgroundColor: isDark ? CARD_BG_DARK : CARD_BG_LIGHT,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View className="mb-2">{icon}</View>
      <Text className="text-[11px] font-bold uppercase tracking-[1px]" style={{ color: '#9CA3AF' }}>
        {label}
      </Text>
      <Text
        className="mb-1 text-[20px] font-extrabold"
        style={{ color: isDark ? '#FFF' : '#111827' }}
      >
        {value}
      </Text>
    </View>
  );
}
