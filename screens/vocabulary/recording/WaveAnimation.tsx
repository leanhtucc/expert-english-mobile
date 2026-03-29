import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

interface WaveformProps {
  isRecording: boolean;
  barCount?: number;
}

const BAR_WIDTH = 4;
const MAX_HEIGHT = 40;

const WaveBar = ({ isRecording }: { delay: number; isRecording: boolean }) => {
  const scale = useSharedValue(0.3);

  useEffect(() => {
    if (isRecording) {
      scale.value = withRepeat(
        withTiming(Math.random() * 1 + 0.5, {
          duration: 400 + Math.random() * 300,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    } else {
      scale.value = withTiming(0.2);
    }
  }, [isRecording, scale]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: scale.value }],
      opacity: 0.9,
    };
  });

  return (
    <Animated.View
      style={[
        styles.bar,
        style,
        {
          height: MAX_HEIGHT,
          marginHorizontal: 2,
        },
      ]}
    />
  );
};

export const Waveform = ({ isRecording, barCount = 20 }: WaveformProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: barCount }).map((_, i) => (
        <WaveBar key={i} delay={i * 80} isRecording={isRecording} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  bar: {
    width: BAR_WIDTH,
    backgroundColor: '#D32F2F',
    borderRadius: 4,
  },
});
