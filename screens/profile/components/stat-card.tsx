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
      className="w-full items-start justify-center rounded-[24px] p-4"
      style={{
        backgroundColor: isDark ? CARD_BG_DARK : CARD_BG_LIGHT,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View className="mb-4">{icon}</View>

      <Text
        className="mb-1 text-[12px] font-bold uppercase tracking-widest"
        style={{ color: isDark ? '#9CA3AF' : '#64748B' }}
      >
        {label}
      </Text>

      <Text className="text-[17px] font-extrabold" style={{ color: isDark ? '#FFF' : '#1E293B' }}>
        {value}
      </Text>
    </View>
  );
}
