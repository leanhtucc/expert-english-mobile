import { Ionicons } from '@expo/vector-icons';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface HintVocabItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definitionVi: string;
  exampleEn: string;
  exampleVi: string;
  imageUrl?: string | null;
  audioUrl?: string | null;
  isNew?: boolean;
}

interface HintBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  vocabList: HintVocabItem[];
  onPlayAudio?: (url: string) => void;
}

const getPosStyle = (pos: string) => {
  const p = pos?.toUpperCase() || '';
  if (p === 'NOUN') return { bg: 'bg-[#E3F2FD]', text: 'text-[#1976D2]' };
  if (p === 'VERB') return { bg: 'bg-[#E8F5E9]', text: 'text-[#388E3C]' };
  if (p === 'ADJ') return { bg: 'bg-[#F3E5F5]', text: 'text-[#7B1FA2]' };
  return { bg: 'bg-[#F1F5F9]', text: 'text-[#64748B]' };
};

export const HintBottomSheet: React.FC<HintBottomSheetProps> = ({
  isVisible,
  onClose,
  vocabList,
  onPlayAudio,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20, stiffness: 90 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isVisible]);

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // 🌟 ĐÃ XÓA DÒNG CHECK VALUE GÂY LỖI REANIMATED Ở ĐÂY 🌟

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={isVisible ? 'auto' : 'none'}
      className="z-[100] justify-end"
    >
      {/* LỚP PHỦ MỜ NỀN */}
      <Animated.View style={[StyleSheet.absoluteFill, animatedOverlayStyle]}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill}>
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />
        </BlurView>
      </Animated.View>

      {/* NỘI DUNG CHÍNH TRƯỢT LÊN */}
      <Animated.View
        style={[{ height: SCREEN_HEIGHT * 0.75 }, animatedSheetStyle]}
        className="w-full rounded-t-[32px] bg-white pb-6 pt-2 shadow-2xl"
      >
        {/* Thanh gạt (Drag Handle) */}
        <View className="mb-4 w-full items-center">
          <View className="h-1.5 w-12 rounded-full bg-slate-200" />
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {vocabList.map((item, index) => {
            const seed = item.word ? (item.word.length % 10) + 1 : 1;
            const fallbackImage = `https://picsum.photos/seed/${seed}10/200/200`;
            const posStyle = getPosStyle(item.partOfSpeech);

            return (
              <View
                key={item.id || index}
                className="mb-4 w-full rounded-[20px] border border-[#FCE4E4] bg-white p-4 shadow-sm"
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: item.imageUrl || fallbackImage }}
                    className="mr-4 h-[60px] w-[60px] rounded-[14px] bg-gray-100"
                  />

                  <View className="flex-1 justify-center pt-1">
                    <Text className="text-[18px] font-bold text-[#1E293B]">{item.word}</Text>
                    <View className="mt-1 mb-1 self-start">
                      <View
                        className={`items-center justify-center rounded-[6px] px-2 py-0.5 ${posStyle.bg}`}
                      >
                        <Text
                          className={`text-[10px] font-bold uppercase tracking-wider ${posStyle.text}`}
                        >
                          {item.partOfSpeech || 'NEW'}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-[14px] font-medium text-[#C8102E]">{item.phonetic}</Text>
                  </View>

                  <View className="flex-row items-start pt-1">
                    {item.audioUrl && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        className="h-8 w-8 items-center justify-center rounded-full bg-[#C8102E]"
                        onPress={() => onPlayAudio?.(item.audioUrl!)}
                      >
                        <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
                      </TouchableOpacity>
                    )}
                    <View className="ml-2 items-center justify-center rounded-[6px] border border-red-100 bg-[#FCF0F1] px-2 py-0.5">
                      <Text className="text-[10px] font-bold uppercase tracking-wider text-[#3B2828]">
                        NEW
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="my-4 h-[1px] w-full bg-slate-100" />
                <Text className="mb-2 text-[15px] font-semibold text-[#C8102E]">
                  {item.definitionVi}
                </Text>
                <View>
                  <Text className="mb-1 text-[14px] italic leading-5 text-[#475569]">
                    &quot;{item.exampleEn}&quot;
                  </Text>
                  <Text className="text-[13px] text-[#94A3B8]">{item.exampleVi}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};
