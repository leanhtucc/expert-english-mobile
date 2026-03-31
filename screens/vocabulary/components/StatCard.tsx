import React from 'react';
import { Text, View } from 'react-native';

interface StatCardProps {
  icon?: React.ReactNode;
  value: string | number;
  label: string;
  iconColor?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  iconColor = 'text-red-600',
  className = '',
}) => {
  return (
    <View className={`items-center ${className}`}>
      {icon && <View className={`mb-2 ${iconColor}`}>{icon}</View>}
      <Text className="text-2xl font-bold text-gray-800">{value}</Text>
      <Text className="mt-1 text-sm text-gray-500">{label}</Text>
    </View>
  );
};
