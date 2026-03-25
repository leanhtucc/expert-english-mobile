import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';

import { DailyProgress } from '../types/progress.types';
import { ProgressChart } from './ProgressChart';

interface Props {
  words: number;
  increase: number;
  chartData: DailyProgress[];
}

export const PerformanceCard = ({ words, increase, chartData }: Props) => (
  <View
    className="mb-6 rounded-[24px] bg-white p-5 shadow-sm"
    style={{
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
    }}
  >
    <View className="mb-6 flex-row items-start justify-between">
      <View>
        <Text className="text-[12px] font-bold tracking-wider text-[#7A6F6F]">
          TOTAL WORDS LEARNED
        </Text>
        <Text className="text-[32px] font-extrabold text-[#D90429]">{words}</Text>
      </View>
      <View className="items-end">
        <View className="flex-row items-center rounded-full bg-[#FFF0F0] px-2 py-1">
          <Feather name="trending-up" size={12} color="#D90429" />
          <Text className="ml-1 text-[12px] font-bold text-[#D90429]">+{increase}%</Text>
        </View>
        <Text className="mt-1 text-[11px] text-[#7A6F6F]">vs last week</Text>
      </View>
    </View>
    <ProgressChart data={chartData} />
  </View>
);
