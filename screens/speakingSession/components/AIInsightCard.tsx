import React from 'react';
import { Text, View } from 'react-native';

import { IconAiRobot } from '@/components/icon';

interface AIInsightCardProps {
  insight: string;
  title?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight, title = 'AI Insight' }) => {
  return (
    <View className="mb-4">
      {/* Header with Icon and Title - Outside the card */}
      <View className="mb-2 flex-row items-center">
        <View className="mr-3 h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-red-50">
          <IconAiRobot width={28} height={28} />
        </View>
        <Text className="text-base font-bold uppercase tracking-wide text-gray-900">{title}</Text>
      </View>

      {/* Message Card */}
      <View className="rounded-bl-3xl rounded-br-3xl rounded-tr-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <Text className="text-base leading-6 text-gray-800">{insight}</Text>
      </View>
    </View>
  );
};
