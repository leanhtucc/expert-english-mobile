import React from 'react';
import { Text, View } from 'react-native';

interface ResultStatCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  iconColor?: string;
  valueColor?: string;
  className?: string;
}

export const ResultStatCard: React.FC<ResultStatCardProps> = ({
  icon,
  value,
  label,
  iconColor = 'text-red-600',
  valueColor = 'text-gray-800',
  className = '',
}) => {
  return (
    <View className={`items-center justify-center ${className}`}>
      {/* Icon */}
      {icon && <View className={`mb-3 ${iconColor}`}>{icon}</View>}

      {/* Value */}
      <Text className={`text-3xl font-bold ${valueColor} mb-1`}>{value}</Text>

      {/* Label */}
      <Text className="text-center text-sm text-gray-500">{label}</Text>
    </View>
  );
};
