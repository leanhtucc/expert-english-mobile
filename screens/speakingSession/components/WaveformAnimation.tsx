import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect, useRef } from 'react';
import { Dimensions, View } from 'react-native';

const BAR_COUNT = 40;
const BAR_WIDTH = 3;
const BAR_SPACING = 1;
const BAR_MIN_HEIGHT = 4;

interface WaveformBarProps {
  amplitude: number;
  isRecording: boolean;
  barMaxHeight: number;
}

const WaveformBar: React.FC<WaveformBarProps> = ({ amplitude, isRecording, barMaxHeight }) => {
  const heightValue = useSharedValue(BAR_MIN_HEIGHT);
  const opacityValue = useSharedValue(0.2);

  useEffect(() => {
    if (isRecording) {
      const processedAmplitude = Math.pow(amplitude, 0.7);
      const baseHeight = BAR_MIN_HEIGHT;
      const maxHeight = barMaxHeight;

      const heightRange = maxHeight - baseHeight;
      const targetHeight = baseHeight + processedAmplitude * heightRange;

      const variation = (Math.random() - 0.5) * 0.1;
      const finalHeight = Math.max(baseHeight, targetHeight + variation * heightRange);

      const springConfig = {
        damping: processedAmplitude > 0.3 ? 8 : 12,
        stiffness: processedAmplitude > 0.3 ? 200 : 150,
        mass: 0.5,
      };

      heightValue.value = withSpring(finalHeight, springConfig);

      const targetOpacity = interpolate(processedAmplitude, [0, 0.05, 0.2, 1], [0.2, 0.4, 0.7, 1]);

      opacityValue.value = withTiming(targetOpacity, {
        duration: 100,
        easing: Easing.out(Easing.quad),
      });
    } else {
      heightValue.value = withSpring(BAR_MIN_HEIGHT, {
        damping: 15,
        stiffness: 100,
      });
      opacityValue.value = withTiming(0.2, {
        duration: 200,
      });
    }
  }, [amplitude, isRecording, barMaxHeight, heightValue, opacityValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightValue.value,
      opacity: opacityValue.value,
      transform: [
        {
          scaleY: isRecording ? 1 : 0.3,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: BAR_WIDTH,
          marginHorizontal: BAR_SPACING / 2,
          borderRadius: BAR_WIDTH / 2,
          alignSelf: 'center',
          backgroundColor: '#EF4444',
        },
        animatedStyle,
      ]}
    />
  );
};

interface WaveformAnimationProps {
  isRecording: boolean;
  barCount?: number;
  amplitudes?: number[];
}

export const WaveformAnimation: React.FC<WaveformAnimationProps> = ({
  isRecording,
  barCount,
  amplitudes = [],
}) => {
  const windowWidth = Dimensions.get('window').width;
  const totalBarWidth = BAR_WIDTH + BAR_SPACING;
  const maxBars = Math.floor((windowWidth - 40) / totalBarWidth);
  const actualBarCount = barCount || Math.min(maxBars, BAR_COUNT);
  const barMaxHeight = 40;

  const waveDataRef = useRef<number[]>(new Array(actualBarCount).fill(0));
  const [displayData, setDisplayData] = React.useState<number[]>(new Array(actualBarCount).fill(0));

  useEffect(() => {
    if (!isRecording) {
      waveDataRef.current = new Array(actualBarCount).fill(0);
      setDisplayData(new Array(actualBarCount).fill(0));
      return;
    }

    const interval = setInterval(() => {
      const newWaveData = [...waveDataRef.current];
      newWaveData.pop();

      const latestAmplitude = amplitudes[amplitudes.length - 1] || Math.random();
      const baseAmplitude = latestAmplitude;
      const randomVariation = (Math.random() - 0.5) * 0.3;
      const finalAmplitude = Math.max(0, Math.min(1, baseAmplitude + randomVariation));

      newWaveData.unshift(finalAmplitude);

      waveDataRef.current = newWaveData;
      setDisplayData([...newWaveData]);
    }, 50);

    return () => clearInterval(interval);
  }, [amplitudes, isRecording, actualBarCount]);

  return (
    <View
      style={{
        height: barMaxHeight + 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
      }}
    >
      {displayData.map((amp, idx) => (
        <WaveformBar
          key={idx}
          amplitude={amp}
          isRecording={isRecording}
          barMaxHeight={barMaxHeight}
        />
      ))}
    </View>
  );
};
