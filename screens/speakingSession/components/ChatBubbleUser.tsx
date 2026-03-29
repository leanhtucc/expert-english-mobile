import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconAvatar2, IconPLay, IconPlayVoice, IconSpeedSpeaking } from '@/components/icon';
import { ChatMessage, HighlightedText, PracticeMode } from '@/types/speaking.types';

import { ProgressBar } from './ProgressBar';

interface ChatBubbleUserProps {
  message: ChatMessage;
  showAvatar?: boolean;
  role?: string;
  mode?: PracticeMode;
  /** Hiển thị tô màu từng từ (Nâng cao) */
  showWordFeedback?: boolean;
}

const PINK_BG = '#FFF0EF';
const PINK_BORDER = '#FCE4E4';

export const ChatBubbleUser: React.FC<ChatBubbleUserProps> = ({
  message,
  showAvatar = true,
  role = 'FRONTEND DEVELOPER',
  mode = 'dual-explorer',
  showWordFeedback = false,
}) => {
  const showEnglish = mode !== 'translation-hero';
  const showVietnamese = mode !== 'english-master';
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  const segments: HighlightedText[] | undefined =
    showWordFeedback && message.pronunciationSegments?.length
      ? message.pronunciationSegments
      : undefined;

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

  const renderEnglish = () => {
    if (segments && segments.length > 0) {
      // Một Text cha + Text con lồng nhau → chảy inline, xuống dòng đúng cả câu (tránh flex-row tách từng cụm).
      return (
        <Text className="mb-2 text-[15px] font-semibold leading-6">
          {segments.map((seg, index) => (
            <Text key={index} style={{ color: seg.isCorrect ? '#059669' : '#DC2626' }}>
              {seg.text}
            </Text>
          ))}
        </Text>
      );
    }
    return (
      <Text className="mb-2 text-[15px] font-semibold leading-6 text-gray-900">{message.text}</Text>
    );
  };

  return (
    <Animated.View style={animatedStyle} className="mb-4">
      {showAvatar && (
        <View className="mb-2 flex-row items-center justify-end">
          <Text className="mr-3 text-xs font-bold uppercase tracking-wide text-[#D32F2F]">
            {role}
          </Text>
          <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-800">
            <IconAvatar2 width={28} height={28} />
          </View>
        </View>
      )}

      <View className="items-end">
        <View
          className="min-w-0 max-w-[92%] rounded-3xl border px-4 py-4 shadow-sm"
          style={{ backgroundColor: PINK_BG, borderColor: PINK_BORDER }}
        >
          {showEnglish && renderEnglish()}

          {showVietnamese && message.translation && (
            <Text
              className={
                mode === 'translation-hero'
                  ? 'text-[15px] font-semibold leading-6 text-gray-900'
                  : 'text-[13px] leading-5 text-gray-500'
              }
            >
              {message.translation}
            </Text>
          )}

          <View className="mt-3 flex-row flex-wrap items-center gap-2">
            <TouchableOpacity className="h-9 w-9 items-center justify-center" hitSlop={8}>
              <IconPlayVoice width={20} height={20} color="#D32F2F" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-0.5">
              <IconSpeedSpeaking width={18} height={18} color="#6B7280" />
              <Text className="text-xs font-semibold text-gray-600">0.75x</Text>
            </View>
            <TouchableOpacity
              className="h-8 w-8 items-center justify-center rounded-full bg-white/90"
              hitSlop={8}
            >
              <IconPLay width={12} height={12} color="#D32F2F" />
            </TouchableOpacity>
          </View>
          {message.score !== undefined && (
            <View className="mt-3 w-full min-w-0 self-stretch" style={{ maxWidth: '100%' }}>
              <ProgressBar
                progress={message.score}
                height={6}
                showLabel
                fillColor="#22c55e"
                trackColor="#E5E7EB"
                labelColor="#16a34a"
              />
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};
