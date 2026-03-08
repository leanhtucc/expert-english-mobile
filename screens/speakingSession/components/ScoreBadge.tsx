import React from 'react';
import { Text, View } from 'react-native';

interface ScoreBadgeProps {
  label: string;
  score: number;
  type: 'pronunciation' | 'grammar';
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ label, score }) => {
  const getScoreColor = () => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBackgroundColor = () => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <View className="items-center">
      <View
        className={`h-20 w-20 rounded-full ${getBackgroundColor()} mb-2 items-center justify-center`}
      >
        <Text className={`text-2xl font-bold ${getScoreColor()}`}>{score}%</Text>
      </View>
      <Text className="text-sm font-medium text-gray-600">{label}</Text>
    </View>
  );
};
