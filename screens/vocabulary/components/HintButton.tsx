import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import React from 'react';
import { Pressable, Text } from 'react-native';

import { IconConceptVocab } from '@/components/icon';

interface HintButtonProps {
  onPress: () => void;
  isUsed?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --- 1. DẠNG TO (HINT BUTTON CHÍNH) ---
const MainHintButton: React.FC<HintButtonProps> = ({ onPress, isUsed = false }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isUsed) scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    if (!isUsed) scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={isUsed}
      style={animatedStyle}
      className={`mt-6 flex-row items-center justify-center self-center rounded-full px-6 py-3.5 ${
        isUsed ? 'bg-slate-100' : 'border border-rose-100 bg-[#FFF0F1] shadow-sm'
      }`}
    >
      <IconConceptVocab width={20} height={20} color={isUsed ? '#CBD5E1' : '#E11D48'} />
      <Text
        className={`ml-2 text-[15px] font-extrabold tracking-wide ${
          isUsed ? 'text-slate-400' : 'text-[#C8102E]'
        }`}
      >
        {isUsed ? 'Đã dùng gợi ý' : 'Xem Gợi ý'}
      </Text>
    </AnimatedPressable>
  );
};

// --- 2. DẠNG NHỎ (INLINE HINT BUTTON) ---
const InlineHintButton: React.FC<HintButtonProps> = ({ onPress, isUsed = false }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isUsed) scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    if (!isUsed) scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={isUsed}
      style={animatedStyle}
      className={`flex-row items-center justify-center rounded-full px-3 py-1.5 ${
        isUsed
          ? 'border border-slate-200 bg-slate-100'
          : 'border border-rose-100 bg-[#FFF0F1] shadow-sm'
      }`}
    >
      <IconConceptVocab width={16} height={16} color={isUsed ? '#CBD5E1' : '#E11D48'} />
      <Text
        className={`ml-1.5 text-[12px] font-bold tracking-wide ${
          isUsed ? 'text-slate-400' : 'text-[#C8102E]'
        }`}
      >
        {isUsed ? 'Đã dùng' : 'Gợi ý'}
      </Text>
    </AnimatedPressable>
  );
};

// Gộp cả 2 vào một object để export
export const HintButton = Object.assign(MainHintButton, {
  Inline: InlineHintButton,
});
