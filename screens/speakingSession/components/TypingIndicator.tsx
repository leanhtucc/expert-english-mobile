import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { View } from 'react-native';

export const TypingIndicator: React.FC = () => {
  const dot1Scale = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot3Scale = useSharedValue(1);

  useEffect(() => {
    const animationConfig = {
      duration: 400,
    };

    dot1Scale.value = withRepeat(
      withSequence(withTiming(1.3, animationConfig), withTiming(1, animationConfig)),
      -1,
      false
    );

    dot2Scale.value = withDelay(
      150,
      withRepeat(
        withSequence(withTiming(1.3, animationConfig), withTiming(1, animationConfig)),
        -1,
        false
      )
    );

    dot3Scale.value = withDelay(
      300,
      withRepeat(
        withSequence(withTiming(1.3, animationConfig), withTiming(1, animationConfig)),
        -1,
        false
      )
    );
  }, [dot1Scale, dot2Scale, dot3Scale]);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
  }));

  return (
    <View className="mb-4 flex-row items-start pr-12">
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-500">
        <View className="text-sm font-bold text-white" />
      </View>

      <View className="flex-row gap-2 rounded-2xl rounded-tl-sm bg-gray-100 px-5 py-4">
        <Animated.View style={dot1Style} className="h-2 w-2 rounded-full bg-gray-400" />
        <Animated.View style={dot2Style} className="h-2 w-2 rounded-full bg-gray-400" />
        <Animated.View style={dot3Style} className="h-2 w-2 rounded-full bg-gray-400" />
      </View>
    </View>
  );
};
