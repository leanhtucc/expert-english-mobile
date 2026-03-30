import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconAvatar1, IconSpeedSpeaking, IconVoiceVocab } from '@/components/icon';
import { ChatMessage, PracticeMode } from '@/types/speaking.types';

import { TypingIndicator } from './TypingIndicator';

interface ChatBubbleAIProps {
  message: ChatMessage;
  showAvatar?: boolean;
  role?: string;
  onPlayAudio?: () => void;
  mode?: PracticeMode;
  /** true: nội dung bubble chỉ hiện 3 chấm (đang tải / chờ). */
  showTypingIndicator?: boolean;
}

export const ChatBubbleAI: React.FC<ChatBubbleAIProps> = ({
  message,
  showAvatar = true,
  role = 'PROJECT MANAGER',
  onPlayAudio,
  mode = 'dual-explorer',
  showTypingIndicator = false,
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
        {showTypingIndicator ? (
          <TypingIndicator />
        ) : (
          <>
            {showEnglish && (
              <View className="mb-3">
                <Text className="text-base font-bold leading-6 text-gray-900">{message.text}</Text>
              </View>
            )}

            {showVietnamese && message.translation && (
              <View className={showEnglish ? 'mb-4' : 'mb-3'}>
                <Text
                  className={
                    mode === 'translation-hero'
                      ? 'text-base font-medium leading-6 text-gray-900'
                      : 'text-sm leading-5 text-gray-500'
                  }
                >
                  {message.translation}
                </Text>
              </View>
            )}

            <View className="mt-1 flex-row items-center gap-3">
              <TouchableOpacity
                onPress={onPlayAudio}
                className="h-9 w-9 items-center justify-center"
                hitSlop={8}
              >
                <IconVoiceVocab width={22} height={22} color="#D32F2F" />
              </TouchableOpacity>
              <View className="flex-row items-center gap-1">
                <IconSpeedSpeaking width={20} height={20} color="#6B7280" />
                <Text className="text-sm font-semibold text-gray-600">0.75x</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </Animated.View>
  );
};
