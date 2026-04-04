import { FontAwesome } from '@expo/vector-icons';
// Added Feather import
import throttle from 'lodash.throttle';

import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

// import { IconCheckCourse } from '@/components/icon'; // Removed old icon import
import { CustomText as Text } from '@/components/ui/CustomText';

export type ResultStatus = 'correct' | 'wrong' | 'warning';

type CheckResultButtonProps = {
  text?: string;
  onPress?: () => void;
  status?: ResultStatus;
  isProcessing?: boolean;
  description?: string;
  proTip?: string;
};

export default function CheckResultButton({
  text,
  onPress,
  status = 'correct',
  isProcessing = false,
  description = 'This is a Convolutional Neural Network (CNN), primarily used for visual pattern recognition in medical imaging and security.',
  proTip = 'CNNs are inspired by the biological processes of the visual cortex.',
}: Readonly<CheckResultButtonProps>) {
  const slideAnim = useRef(new Animated.Value(200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
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
    // Chạy song song animation mờ nền và trượt modal lên
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 70,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, opacityAnim]);

  if (status !== 'correct') {
    return null;
  }

  const buttonText = text || 'Next Question';

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 100, justifyContent: 'flex-end' }]}>
      {/* LỚP PHỦ TỐI (DARK OVERLAY) CHÍNH XÁC NHƯ FIGMA */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Nền đen mờ 60%
          opacity: opacityAnim,
        }}
      />

      {/* MODAL CHÍNH */}
      <Animated.View
        className="w-full rounded-t-[32px] bg-white px-6 pt-8 shadow-2xl"
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          paddingBottom: Math.max(insets.bottom, 24),
        }}
      >
        {/* TIÊU ĐỀ */}
        <View className="mb-5 flex-row items-center">
          <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-[#C8102E] shadow-sm">
            <View className="h-[18px] w-[18px] items-center justify-center rounded-full bg-white">
              {/* Dùng FontAwesome nét sẽ dày và đậm hơn hẳn Feather */}
              <FontAwesome name="check" size={14} color="#C8102E" />
            </View>
          </View>
          <Text className="text-[26px] font-extrabold text-[#C8102E]">Correct Answer!</Text>
        </View>

        {/* ĐOẠN GIẢI THÍCH */}
        {description && (
          <Text className="mb-6 text-[16px] leading-[24px] text-[#4A4A4A]">{description}</Text>
        )}

        {/* KHUNG PRO TIP (Bo tròn, viền trái đậm) */}
        {proTip && (
          <View
            className="mb-8 overflow-hidden rounded-[12px] border border-[#F0EAEA] bg-white"
            style={{
              borderLeftWidth: 4,
              borderLeftColor: '#005468', // Màu xanh cổ vịt giống ảnh
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
            }}
          >
            <View className="p-4">
              <Text className="mb-1 text-[11px] font-extrabold tracking-widest text-[#005468]">
                PRO TIP
              </Text>
              <Text className="text-[14px] leading-[22px] text-[#4A4A4A]">{proTip}</Text>
            </View>
          </View>
        )}

        {/* NÚT BẤM NEXT HOÀN TOÀN BO TRÒN - ĐÃ THÊM LINEAR GRADIENT 🌟 */}
        <TouchableOpacity
          className="h-[56px] w-full overflow-hidden rounded-full shadow-lg"
          style={{ shadowColor: '#EE3D4A', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 }}
          disabled={isProcessing}
          onPress={throttledOnPress}
          activeOpacity={0.8}
        >
          {/* CẤU HÌNH MÀU GRADIENT CHUẨN FIGMA */}
          <LinearGradient
            colors={['#EE3D4A', '#D3102E']} // Đỏ tươi -> Đỏ đậm
            start={{ x: 0, y: 0.5 }} // Bắt đầu từ bên trái
            end={{ x: 1, y: 0.5 }} // Kết thúc bên phải
            className="h-full w-full items-center justify-center"
          >
            <Text className="text-[18px] font-bold text-white">{buttonText}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
