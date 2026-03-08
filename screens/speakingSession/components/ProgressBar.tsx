import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = true,
  height = 8,
}) => {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(progress, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progress, progressWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View className="w-full">
      <View className="w-full overflow-hidden rounded-full bg-gray-200" style={{ height }}>
        <Animated.View className="h-full rounded-full bg-green-500" style={animatedStyle} />
      </View>
      {showLabel && <Text className="mt-1 text-xs text-gray-500">{Math.round(progress)}%</Text>}
    </View>
  );
};
