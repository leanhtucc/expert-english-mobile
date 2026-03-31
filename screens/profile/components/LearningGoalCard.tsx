import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { PRIMARY } from '../constants/profile.constants';

interface Props {
  minutes: number;
  progress: number;
  onChange?: () => void;
}

export const LearningGoalCard = ({ minutes, progress, onChange }: Props) => (
  <View className="mb-4 rounded-3xl p-5" style={{ backgroundColor: PRIMARY }}>
    <View className="mb-2 flex-row items-center justify-between">
      <Text className="text-[17px] font-medium text-white">Mục tiêu mỗi ngày</Text>

      <TouchableOpacity className="rounded-full bg-white/20 px-3 py-1.5" onPress={onChange}>
        <Text className="text-[11px] font-bold uppercase tracking-wider text-white">ĐỔI</Text>
      </TouchableOpacity>
    </View>

    <Text className="mb-4 text-[20px] font-medium text-white">{minutes} phút mỗi ngày</Text>

    <View className="h-2.5 w-full overflow-hidden rounded-full bg-white/30">
      <View className="h-full rounded-full bg-white" style={{ width: `${progress * 100}%` }} />
    </View>
  </View>
);
