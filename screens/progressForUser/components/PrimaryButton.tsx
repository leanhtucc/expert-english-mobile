import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import React from 'react';
import { Pressable, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  rounded?: 'full' | '2xl';
}

export const PrimaryButton = ({
  title,
  onPress,
  icon,
  variant = 'primary',
  rounded = 'full',
}: Props) => {
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // THÊM `as const` VÀO ĐÂY ĐỂ FIX LỖI TYPESCRIPT
  const gradientColors =
    variant === 'primary' ? (['#C8102E', '#9E001F'] as const) : (['#E52E4D', '#C8102E'] as const);

  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-2xl';

  return (
    <Animated.View style={[rStyle, { width: '100%' }]}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={`h-[56px] w-full flex-row items-center justify-center ${roundedClass} shadow-md shadow-[#C8102E]/40`}
        >
          <Text className="mr-4 text-[17px] font-bold text-white">{title}</Text>
          {icon && icon}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
