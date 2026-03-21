import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface WaveAnimationProps {
  isActive: boolean;
  className?: string;
}

export const WaveAnimation: React.FC<WaveAnimationProps> = ({ isActive }) => {
  const wave1 = useRef(new Animated.Value(0.3)).current;
  const wave2 = useRef(new Animated.Value(0.5)).current;
  const wave3 = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (isActive) {
      const createAnimation = (value: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: 800,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 0.3,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const animations = Animated.parallel([
        createAnimation(wave1, 0),
        createAnimation(wave2, 200),
        createAnimation(wave3, 400),
      ]);

      animations.start();

      return () => {
        animations.stop();
      };
    }

    wave1.setValue(0.3);
    wave2.setValue(0.5);
    wave3.setValue(0.7);
    return undefined;
  }, [isActive, wave1, wave2, wave3]);

  if (!isActive) {
    return null;
  }

  return (
    <View className="flex-row items-center justify-center space-x-2">
      <Animated.View className="h-16 w-1 rounded-full bg-red-500" style={{ opacity: wave1 }} />
      <Animated.View className="h-24 w-1 rounded-full bg-red-500" style={{ opacity: wave2 }} />
      <Animated.View className="h-20 w-1 rounded-full bg-red-500" style={{ opacity: wave3 }} />
      <Animated.View className="h-28 w-1 rounded-full bg-red-500" style={{ opacity: wave1 }} />
      <Animated.View className="h-16 w-1 rounded-full bg-red-500" style={{ opacity: wave2 }} />
    </View>
  );
};
