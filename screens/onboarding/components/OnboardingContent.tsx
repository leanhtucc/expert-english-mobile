import React from 'react';
import { Animated, Text, View } from 'react-native';

import FeatureTag from './FeatureTag';

interface OnboardingContentProps {
  animatedValue?: Animated.Value;
}

/**
 * OnboardingContent Component
 * Displays the main content of the onboarding screen:
 * - Title with highlighted text
 * - Description
 * - Feature tags
 */
const OnboardingContent: React.FC<OnboardingContentProps> = ({ animatedValue }) => {
  const animatedStyle = animatedValue
    ? {
        opacity: animatedValue,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }
    : {};

  return (
    <Animated.View style={animatedStyle}>
      <View className="flex-1 items-center px-2">
        {/* Title Section */}
        <View className="mb-5 items-center">
          <Text className="text-display-md max-w-[320px] text-center font-bold leading-tight text-neutral-900">
            Học tiếng Anh chuyên ngành –{`\n`}Dùng được ngay trong thực tế
          </Text>
        </View>

        {/* Description */}
        <Text className="text-body mb-6 max-w-[320px] px-4 text-center text-neutral-500">
          Không học lan man. Không học cho có.{'\n'}Chỉ học đúng thứ bạn cần để học tập và làm việc.
        </Text>

        {/* Feature Tags */}
        <View className="mb-8 flex-row items-center justify-center">
          <FeatureTag icon="🎯" label="Cá nhân hóa" />
          <View className="mx-2 h-1 w-1 rounded-full bg-neutral-300" />
          <FeatureTag icon="🤖" label="AI hỗ trợ" />
        </View>
      </View>
    </Animated.View>
  );
};

export default OnboardingContent;
