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
  buttonHeight?: number; // 🌟 Đổi sang dùng số để an toàn tuyệt đối
}

export const PrimaryButton = ({
  title,
  onPress,
  icon,
  variant = 'primary',
  rounded = 'full',
  buttonHeight = 56, // Mặc định 56px
}: Props) => {
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

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
          className={`w-full flex-row items-center justify-center ${roundedClass} shadow-md shadow-[#C8102E]/40`}
          style={{ height: buttonHeight }} // 🌟 Ép chiều cao bằng style gốc của React Native
        >
          <Text className="mr-3 text-[17px] font-bold text-white">{title}</Text>
          {icon && icon}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
