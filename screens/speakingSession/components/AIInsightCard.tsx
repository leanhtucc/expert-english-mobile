import React from 'react';
import { Text, View } from 'react-native';

import { IconRobot } from '@/components/icon';

interface AIInsightCardProps {
  insight: string;
  title?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight, title = 'AI Insight' }) => {
  return (
    <View className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <View className="mb-2 flex-row items-center">
        <View className="mr-2 h-6 w-6 items-center justify-center">
          <IconRobot width={24} height={24} />
        </View>
        <Text className="text-sm font-semibold text-blue-700">{title}</Text>
      </View>
      <Text className="text-base leading-6 text-gray-800">{insight}</Text>
    </View>
  );
};
