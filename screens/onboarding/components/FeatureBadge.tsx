import React from 'react';
import { Text, View } from 'react-native';

interface FeatureBadgeProps {
  icon: string;
  label: string;
}

/**
 * Component hiển thị badge tính năng với icon và nhãn
 */
export const FeatureBadge: React.FC<FeatureBadgeProps> = ({ icon, label }) => {
  return (
    <View className="mx-1.5 flex-row items-center rounded-full bg-gray-100 px-5 py-2.5 shadow-sm">
      <Text className="mr-2 text-lg">{icon}</Text>
      <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};
