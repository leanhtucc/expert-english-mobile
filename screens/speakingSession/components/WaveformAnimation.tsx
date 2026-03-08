import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { View } from 'react-native';

interface WaveformBarProps {
  delay: number;
  isRecording: boolean;
}

const WaveformBar: React.FC<WaveformBarProps> = ({ isRecording }) => {
  const scaleY = useSharedValue(0.3);

  useEffect(() => {
    if (isRecording) {
      scaleY.value = withRepeat(
        withSequence(
          withTiming(1, {
            duration: 300 + Math.random() * 200,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.3, {
            duration: 300 + Math.random() * 200,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
    } else {
      scaleY.value = withTiming(0.3, { duration: 200 });
    }
  }, [isRecording, scaleY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: scaleY.value }],
  }));

  return (
    <Animated.View
      style={[animatedStyle, { width: 4, backgroundColor: '#ef4444', borderRadius: 2, height: 40 }]}
    />
  );
};

interface WaveformAnimationProps {
  isRecording: boolean;
  barCount?: number;
}

export const WaveformAnimation: React.FC<WaveformAnimationProps> = ({
  isRecording,
  barCount = 20,
}) => {
  return (
    <View className="h-12 flex-row items-center justify-center gap-1">
      {Array.from({ length: barCount }).map((_, index) => (
        <WaveformBar key={index} delay={index * 50} isRecording={isRecording} />
      ))}
    </View>
  );
};
