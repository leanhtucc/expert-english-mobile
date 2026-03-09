import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconAvatar1, IconMicrophone, IconPlayVoice } from '@/components/icon';
import { ChatMessage, PracticeMode } from '@/types/speaking.types';

import { ProgressBar } from './ProgressBar';

interface ChatBubbleAIProps {
  message: ChatMessage;
  showAvatar?: boolean;
  role?: string;
  onPlayAudio?: () => void;
  mode?: PracticeMode;
}

export const ChatBubbleAI: React.FC<ChatBubbleAIProps> = ({
  message,
  showAvatar = true,
  role = 'PROJECT MANAGER',
  onPlayAudio,
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
      {/* Header with Avatar and Role - Outside the card */}
      {showAvatar && (
        <View className="mb-2 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-800">
            <IconAvatar1 width={28} height={28} />
          </View>
          <Text className="text-sm font-bold uppercase tracking-wide text-blue-600">{role}</Text>
        </View>
      )}

      {/* Message Card */}
      <View className="rounded-bl-3xl rounded-br-3xl rounded-tr-3xl border border-gray-200 bg-white p-4 shadow-sm">
        {/* Question */}
        {showEnglish && (
          <View className="mb-3">
            <Text className="text-base font-medium leading-6 text-gray-900">
              &ldquo;{message.text}&rdquo;
            </Text>
          </View>
        )}

        {/* Translation */}
        {showVietnamese && message.translation && (
          <View className={showEnglish ? 'mb-4' : 'mb-3'}>
            <Text
              className={
                mode === 'translation-hero'
                  ? 'text-base font-medium leading-6 text-gray-900'
                  : 'text-sm leading-5 text-gray-500'
              }
            >
              &ldquo;{message.translation}&rdquo;
            </Text>
          </View>
        )}

        {/* Progress Bar and Audio Controls */}
        {message.score !== undefined && (
          <View className="flex-row items-center">
            <TouchableOpacity className="h-9 w-9 items-center justify-center">
              <IconMicrophone width={18} height={18} color="#3B82F6" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPlayAudio} className="h-9 w-9 items-center justify-center">
              <IconPlayVoice width={18} height={18} color="#EF4444" />
            </TouchableOpacity>

            <View className="flex-1">
              <ProgressBar progress={message.score} height={8} showLabel={true} />
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
