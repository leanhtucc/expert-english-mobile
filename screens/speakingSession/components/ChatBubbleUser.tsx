import { Feather } from '@expo/vector-icons';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// 🌟 THÊM IMPORT NÀY

import { IconAvatar2, IconSpeedSpeaking, IconVoiceVocab } from '@/components/icon';
import { ChatMessage, HighlightedText, PracticeMode } from '@/types/speaking.types';

import { ProgressBar } from './ProgressBar';

interface ChatBubbleUserProps {
  message: ChatMessage;
  showAvatar?: boolean;
  role?: string;
  mode?: PracticeMode;
  showWordFeedback?: boolean;
  // 🌟 THÊM 2 PROPS NÀY ĐỂ ĐIỀU KHIỂN NÚT NHẬN XÉT
  onToggleFeedback?: () => void;
  isFeedbackVisible?: boolean;
}

const PINK_BG = '#FFF0EF';
const PINK_BORDER = '#FCE4E4';

export const ChatBubbleUser: React.FC<ChatBubbleUserProps> = ({
  message,
  showAvatar = true,
  role = 'FRONTEND DEVELOPER',
  mode = 'dual-explorer',
  showWordFeedback = false,
  onToggleFeedback,
  isFeedbackVisible = false,
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

          {/* 🌟 CHỈNH SỬA LẠI ROW NÀY: Thêm nút Xem/Ẩn nhận xét */}
          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <TouchableOpacity className="h-9 w-9 items-center justify-center" hitSlop={8}>
                <IconVoiceVocab width={20} height={20} color="#D32F2F" />
              </TouchableOpacity>
              <View className="flex-row items-center gap-0.5">
                <IconSpeedSpeaking width={18} height={18} color="#6B7280" />
                <Text className="text-xs font-semibold text-gray-600">0.75x</Text>
              </View>
            </View>

            {onToggleFeedback && message.score !== undefined && (
              <TouchableOpacity
                onPress={onToggleFeedback}
                activeOpacity={0.7}
                // Thêm items-center để icon và text thẳng hàng tuyệt đối
                className="flex-row items-center justify-center rounded-full px-3 py-1.5"
                style={{
                  backgroundColor: isFeedbackVisible ? '#D32F2F' : '#FCE4E4',
                  minHeight: 32, // Đảm bảo chiều cao cố định để không bị lệch
                }}
              >
                <Feather
                  name={isFeedbackVisible ? 'chevron-up' : 'message-circle'}
                  size={14}
                  color={isFeedbackVisible ? '#FFFFFF' : '#D32F2F'}
                  style={{ marginRight: 4 }} // Thay gap bằng marginRight để kiểm soát chính xác hơn
                />
                <Text
                  className="text-[12px] font-bold tracking-tight"
                  style={{
                    color: isFeedbackVisible ? '#FFFFFF' : '#D32F2F',
                    textAlignVertical: 'center', // Căn giữa chữ theo chiều dọc trên Android
                    lineHeight: 16, // Khớp với size của icon
                  }}
                >
                  {isFeedbackVisible ? 'Đóng' : 'Nhận xét'}
                </Text>
              </TouchableOpacity>
            )}
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
