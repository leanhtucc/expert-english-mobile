import React from 'react';
import { Text, View } from 'react-native';

interface FeatureTagProps {
  icon: string;
  label: string;
}

/**
 * FeatureTag Component
 * Displays a small tag with an emoji icon and text label
 * Used to show key features on the onboarding screen
 */
const FeatureTag: React.FC<FeatureTagProps> = ({ icon, label }) => {
  return (
    <View className="flex-row items-center px-3 py-2">
      <Text className="mr-1.5 text-base">{icon}</Text>
      <Text className="text-sm font-medium text-neutral-600">{label}</Text>
    </View>
  );
};

export default FeatureTag;
