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
    <View className="w-full flex-row items-center gap-2">
      <View className="flex-1 overflow-hidden rounded-full bg-gray-200" style={{ height }}>
        <Animated.View className="h-full rounded-full bg-green-500" style={animatedStyle} />
      </View>
      {showLabel && (
        <Text className="text-sm font-semibold text-green-600">{Math.round(progress)}%</Text>
      )}
    </View>
  );
};
