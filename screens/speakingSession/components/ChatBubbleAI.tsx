import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { IconRobot } from '@/components/icon';
import { ChatMessage } from '@/types/speaking.types';

import { ProgressBar } from './ProgressBar';

interface ChatBubbleAIProps {
  message: ChatMessage;
  showAvatar?: boolean;
}

export const ChatBubbleAI: React.FC<ChatBubbleAIProps> = ({ message, showAvatar = true }) => {
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
    <Animated.View style={animatedStyle} className="mb-4 flex-row items-start pr-12">
      {showAvatar && (
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-500">
          <IconRobot width={24} height={24} color="white" />
        </View>
      )}

      <View className="flex-1">
        <View className="rounded-2xl rounded-tl-sm bg-gray-100 p-4">
          <Text className="text-base leading-6 text-gray-800">{message.text}</Text>

          {message.translation && (
            <Text className="mt-2 text-sm italic text-gray-500">{message.translation}</Text>
          )}
        </View>

        {message.score !== undefined && (
          <View className="mt-2 px-2">
            <ProgressBar progress={message.score} height={6} showLabel={false} />
          </View>
        )}
      </View>
    </Animated.View>
  );
};
