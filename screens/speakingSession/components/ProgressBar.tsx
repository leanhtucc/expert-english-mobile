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
  /** Màu thanh tiến độ (mặc định xanh lá – điểm phát âm) */
  fillColor?: string;
  trackColor?: string;
  labelColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = true,
  height = 8,
  fillColor = '#22c55e',
  trackColor = '#e5e7eb',
  labelColor = '#16a34a',
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
    <View className="w-full min-w-0 flex-row items-center gap-2" style={{ maxWidth: '100%' }}>
      <View
        className="min-w-0 flex-1 overflow-hidden rounded-full"
        style={{ height, backgroundColor: trackColor }}
      >
        <Animated.View
          className="h-full rounded-full"
          style={[animatedStyle, { backgroundColor: fillColor }]}
        />
      </View>
      {showLabel && (
        <Text
          className="shrink-0 text-xs font-semibold"
          style={{ color: labelColor }}
          numberOfLines={1}
        >
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
};
