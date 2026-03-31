import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

type Props = {
  dotColor?: string;
};

/**
 * Ba chấm “đang gõ” trong bubble AI.
 */
export function TypingIndicator({ dotColor = '#6B7280' }: Props) {
  const a0 = useRef(new Animated.Value(0.35)).current;
  const a1 = useRef(new Animated.Value(0.35)).current;
  const a2 = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const makeLoop = (v: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(v, { toValue: 1, duration: 320, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0.35, duration: 320, useNativeDriver: true }),
        ])
      );

    const l0 = makeLoop(a0, 0);
    const l1 = makeLoop(a1, 160);
    const l2 = makeLoop(a2, 320);
    l0.start();
    l1.start();
    l2.start();
    return () => {
      l0.stop();
      l1.stop();
      l2.stop();
    };
  }, [a0, a1, a2]);

  return (
    <View className="flex-row items-center gap-1.5 py-1">
      {[a0, a1, a2].map((op, i) => (
        <Animated.Text
          key={i}
          style={{ opacity: op, color: dotColor, fontSize: 22, lineHeight: 26, fontWeight: '800' }}
        >
          •
        </Animated.Text>
      ))}
    </View>
  );
}
