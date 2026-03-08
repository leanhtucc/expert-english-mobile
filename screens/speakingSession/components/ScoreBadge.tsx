import React from 'react';
import { Text, View } from 'react-native';

interface ScoreBadgeProps {
  label: string;
  score: number;
  type: 'pronunciation' | 'grammar';
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ label, score }) => {
  const getScoreColor = () => {
    if (score >= 85) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusText = () => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Checking...';
  };

  const scoreColor = getScoreColor();
  const statusText = getStatusText();

  return (
    <View className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2">
      <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
        {label.toUpperCase()}
      </Text>
      <View className="flex-row items-baseline gap-2">
        <Text className="text-2xl font-bold text-gray-900">{score}%</Text>
        <Text className="text-sm font-semibold" style={{ color: scoreColor }}>
          {statusText}
        </Text>
      </View>
    </View>
  );
};
