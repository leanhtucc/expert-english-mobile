import React from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <View className={`w-full ${className}`}>
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-gray-600">
          {current} / {total}
        </Text>
        <Text className="text-sm font-semibold text-red-600">{percentage}%</Text>
      </View>
      <View className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <View className="h-full rounded-full bg-red-600" style={{ width: `${percentage}%` }} />
      </View>
    </View>
  );
};
