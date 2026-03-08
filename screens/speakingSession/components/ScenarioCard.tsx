import React from 'react';
import { Text, View } from 'react-native';

import { ScenarioPreview } from '@/types/speaking.types';

import { ProgressBar } from './ProgressBar';

interface ScenarioCardProps {
  scenario: ScenarioPreview;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  return (
    <View className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <View className="mb-4 flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <Text className="text-sm font-bold text-red-600">PM</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-wide text-gray-500">{scenario.role}</Text>
        </View>
      </View>

      {/* AI Question */}
      <View className="mb-4 rounded-xl bg-gray-50 p-4">
        <Text className="text-base leading-6 text-gray-800">&ldquo;{scenario.question}&rdquo;</Text>
      </View>

      {/* Progress */}
      <View className="mb-4">
        <ProgressBar progress={scenario.progress} showLabel={false} />
      </View>

      {/* Example Answer */}
      <View className="rounded-xl bg-red-500 p-4">
        <Text className="text-sm leading-6 text-white">{scenario.exampleAnswer}</Text>
      </View>
    </View>
  );
};
