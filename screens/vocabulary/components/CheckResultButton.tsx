import { Feather } from '@expo/vector-icons';
import throttle from 'lodash.throttle';

import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomText as Text } from '@/components/ui/CustomText';

export type ResultStatus = 'correct' | 'wrong' | 'warning';

type CheckResultButtonProps = {
  text?: string;
  onPress?: () => void;
  showIconNext?: boolean;
  status?: ResultStatus;
  isProcessing?: boolean;
  correctAnswer?: string;
};

export default function CheckResultButton({
  text,
  onPress,
  showIconNext = false,
  status = 'correct',
  isProcessing = false,
  correctAnswer,
}: Readonly<CheckResultButtonProps>) {
  const slideAnim = useRef(new Animated.Value(80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const insets = useSafeAreaInsets();

  const throttledOnPress = useMemo(
    () =>
      onPress
        ? throttle(() => {
            onPress();
          }, 1000)
        : undefined,
    [onPress]
  );

  useEffect(() => {
    return () => {
      if (throttledOnPress) throttledOnPress.cancel();
    };
  }, [throttledOnPress]);

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 120,
          friction: 9,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [slideAnim, opacityAnim, scaleAnim]);

  // Cấu hình 3 trạng thái đã được dịch sang tiếng Anh
  const config = {
    correct: {
      bg: 'bg-[#dcfce7]',
      borderColor: 'border-[#bbf7d0]',
      title: 'Correct! Keep up the good work',
      titleColor: 'text-[#16a34a]',
      icon: 'check-circle',
      btnColor: '#16a34a',
      defaultBtnText: 'Continue',
    },
    wrong: {
      bg: 'bg-[#ffe4e6]',
      borderColor: 'border-[#fecdd3]',
      title: 'Incorrect!',
      titleColor: 'text-[#dc2626]',
      icon: 'x-circle',
      btnColor: '#ef4444',
      defaultBtnText: 'Continue',
    },
    warning: {
      bg: 'bg-[#fef08a]',
      borderColor: 'border-[#fde047]',
      title: 'Almost there, let’s try again',
      titleColor: 'text-[#a16207]',
      icon: null,
      btnColor: '#eab308',
      defaultBtnText: 'Try Again',
    },
  };

  const currentConfig = config[status];

  // Text nút bấm ưu tiên tiếng Anh
  const buttonText = text || currentConfig.defaultBtnText;

  return (
    <Animated.View
      className={`w-full items-center self-end border-t px-5 pt-4 ${currentConfig.bg} ${currentConfig.borderColor}`}
      style={{
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        opacity: opacityAnim,
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      {/* KHU VỰC TIÊU ĐỀ & ICON */}
      <View className="mb-4 w-full">
        <View className="flex-row items-center">
          {currentConfig.icon && (
            <Feather
              name={currentConfig.icon as any}
              size={22}
              color={status === 'correct' ? '#16a34a' : '#dc2626'}
              style={{ marginRight: 8 }}
            />
          )}
          <Text className={`text-[18px] font-bold ${currentConfig.titleColor}`}>
            {currentConfig.title}
          </Text>
        </View>

        {/* NẾU LÀ TRẠNG THÁI SAI & CÓ TRUYỀN ĐÁP ÁN ĐÚNG VÀO -> Hiện "Correct answer:" */}
        {status === 'wrong' && correctAnswer && (
          <Text className={`mt-2 text-[15px] font-bold ${currentConfig.titleColor}`}>
            Correct answer: {correctAnswer}
          </Text>
        )}
      </View>

      {/* NÚT BẤM */}
      <TouchableOpacity
        className="h-[52px] w-full items-center justify-center rounded-[16px]"
        style={{
          backgroundColor: currentConfig.btnColor,
          shadowColor: currentConfig.btnColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
        }}
        disabled={isProcessing}
        onPress={throttledOnPress}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-center">
          <Text className="text-center text-[17px] font-bold text-white">{buttonText}</Text>
          {showIconNext && (
            <View className="ml-2 h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white">
              <Feather name="arrow-right" size={14} color={currentConfig.btnColor} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
