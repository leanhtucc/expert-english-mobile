import React from 'react';
import { Animated, View } from 'react-native';

import BookStackIcon from './BookStackIcon';

interface OnboardingHeaderProps {
  animatedValue?: Animated.Value;
}

/**
 * OnboardingHeader Component
 * Displays the book stack icon at the top of the onboarding screen
 * Includes optional animation support for entrance effects
 */
const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ animatedValue }) => {
  const animatedStyle = animatedValue
    ? {
        opacity: animatedValue,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }
    : {};

  return (
    <Animated.View style={animatedStyle}>
      <View className="mb-6 mt-12 items-center">
        <View className="h-28 w-28 items-center justify-center">
          <BookStackIcon width={120} height={110} />
        </View>
      </View>
    </Animated.View>
  );
};

export default OnboardingHeader;
