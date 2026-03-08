import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconAvatar2, IconMicrophone } from '@/components/icon';
import { ChatMessage, PracticeMode } from '@/types/speaking.types';

interface ChatBubbleUserProps {
  message: ChatMessage;
  showAvatar?: boolean;
  role?: string;
  mode?: PracticeMode;
}

export const ChatBubbleUser: React.FC<ChatBubbleUserProps> = ({
  message,
  showAvatar = true,
  role = 'FRONTEND DEVELOPER',
  mode = 'dual-explorer',
}) => {
  const showEnglish = mode !== 'translation-hero';
  const showVietnamese = mode !== 'english-master';
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
    <Animated.View style={animatedStyle} className="mb-3">
      {/* Header with Role and Avatar - Outside the card */}
      {showAvatar && (
        <View className="mb-2 flex-row items-center justify-end">
          <Text className="mr-3 text-sm font-bold uppercase tracking-wide text-red-600">
            {role}
          </Text>
          <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-800">
            <IconAvatar2 width={28} height={28} />
          </View>
        </View>
      )}

      {/* Message bubble */}
      <View className="items-end">
        <View className="max-w-[85%] rounded-bl-3xl rounded-br-3xl rounded-tl-3xl bg-red-500 px-6 py-5 shadow-md">
          {showEnglish && (
            <Text className="text-base font-medium leading-6 text-white">{message.text}</Text>
          )}

          {showVietnamese && message.translation && (
            <Text
              className={
                mode === 'translation-hero'
                  ? 'text-base font-medium leading-6 text-white'
                  : `text-sm italic leading-5 text-white opacity-90 ${showEnglish ? 'mt-3' : ''}`
              }
            >
              &ldquo;{message.translation}&rdquo;
            </Text>
          )}

          {/* Microphone icon at bottom left */}
          <View className="mt-4">
            <TouchableOpacity className="h-10 w-10 items-center justify-center self-start rounded-full bg-white">
              <IconMicrophone width={20} height={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
