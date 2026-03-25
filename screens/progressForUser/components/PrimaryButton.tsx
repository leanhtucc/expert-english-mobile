import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import React from 'react';
import { Pressable, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
}

export const PrimaryButton = ({ title, onPress, icon }: Props) => {
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[rStyle, { width: '100%' }]}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
      >
        <LinearGradient
          colors={['#D90429', '#EF233C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-[56px] w-full flex-row items-center justify-center rounded-full shadow-md shadow-[#D90429]/40"
        >
          <Text className="mr-2 text-[17px] font-bold text-white">{title}</Text>
          {icon && icon}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};
