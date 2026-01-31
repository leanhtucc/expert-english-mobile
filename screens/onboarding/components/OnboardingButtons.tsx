import { Ionicons } from '@expo/vector-icons';

import React, { useCallback, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

interface OnboardingButtonsProps {
  onStartPress: () => void;
  onLoginPress: () => void;
  animatedValue?: Animated.Value;
}

/**
 * OnboardingButtons Component
 * Contains the primary "Bắt đầu" (Start) button and
 * secondary "Đăng nhập" (Login) button
 */
const OnboardingButtons: React.FC<OnboardingButtonsProps> = ({
  onStartPress,
  onLoginPress,
  animatedValue,
}) => {
  const [isPrimaryPressed, setIsPrimaryPressed] = useState(false);
  const [isSecondaryPressed, setIsSecondaryPressed] = useState(false);

  const handlePrimaryPressIn = useCallback(() => {
    setIsPrimaryPressed(true);
  }, []);

  const handlePrimaryPressOut = useCallback(() => {
    setIsPrimaryPressed(false);
  }, []);

  const handleSecondaryPressIn = useCallback(() => {
    setIsSecondaryPressed(true);
  }, []);

  const handleSecondaryPressOut = useCallback(() => {
    setIsSecondaryPressed(false);
  }, []);

  const animatedStyle = animatedValue
    ? {
        opacity: animatedValue,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
        ],
      }
    : {};

  return (
    <Animated.View style={animatedStyle}>
      <View className="px-6 pb-8">
        {/* Primary Button - Bắt đầu */}
        <Pressable
          onPress={onStartPress}
          onPressIn={handlePrimaryPressIn}
          onPressOut={handlePrimaryPressOut}
          className={`mb-3 w-full items-center justify-center rounded-3xl py-5 ${
            isPrimaryPressed ? 'bg-warning-600' : 'bg-warning-400'
          }`}
          style={{
            shadowColor: '#F5A623',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <Text className="text-lg font-semibold text-white">Bắt đầu</Text>
        </Pressable>

        {/* Secondary Button - Đăng nhập */}
        <Pressable
          onPress={onLoginPress}
          onPressIn={handleSecondaryPressIn}
          onPressOut={handleSecondaryPressOut}
          className={`w-full flex-row items-center justify-center rounded-3xl border-2 border-neutral-200 py-4 ${
            isSecondaryPressed ? 'bg-neutral-100' : 'bg-white'
          }`}
        >
          <Ionicons name="globe-outline" size={20} color="#374151" style={{ marginRight: 8 }} />
          <Text className="text-base font-semibold text-neutral-700">Đăng nhập</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default OnboardingButtons;
