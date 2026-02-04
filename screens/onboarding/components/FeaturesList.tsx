import React from 'react';
import { View } from 'react-native';

import { FeatureBadge } from './FeatureBadge';

interface Feature {
  icon: string;
  label: string;
}

interface FeaturesListProps {
  features: readonly Feature[];
}

/**
 * Component hiển thị danh sách các tính năng nổi bật
 */
export const FeaturesList: React.FC<FeaturesListProps> = ({ features }) => {
  return (
    <View className="my-6 flex-row flex-wrap items-center justify-center px-6">
      {features.map((feature, index) => (
        <FeatureBadge key={index} icon={feature.icon} label={feature.label} />
      ))}
    </View>
  );
};
