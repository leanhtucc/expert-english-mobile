import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { IconUserProfile } from '@/components/icon';
import { ChatMessage } from '@/types/speaking.types';

interface ChatBubbleUserProps {
  message: ChatMessage;
  showAvatar?: boolean;
}

export const ChatBubbleUser: React.FC<ChatBubbleUserProps> = ({ message, showAvatar = true }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle} className="mb-4 flex-row items-start justify-end pl-12">
      <View className="flex-1 items-end">
        <View className="max-w-[85%] rounded-2xl rounded-tr-sm bg-red-500 p-4">
          <Text className="text-base leading-6 text-white">{message.text}</Text>
        </View>
      </View>

      {showAvatar && (
        <View className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-gray-300">
          <IconUserProfile width={24} height={24} />
        </View>
      )}
    </Animated.View>
  );
};
