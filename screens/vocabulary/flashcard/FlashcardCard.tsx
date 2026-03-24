import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { FlashcardItem } from './useFlashcard';

interface FlashcardCardProps {
  card: FlashcardItem;
  isFlipped: boolean;
  onFlip: () => void;
  onPlayAudio?: () => void;
  imageUrl?: string;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  isFlipped,
  onFlip,
  onPlayAudio,
}) => {
  const displayImage =
    card.imageUrl ||
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop';

  const flipAnim = useRef(new Animated.Value(isFlipped ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 1 : 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [flipAnim, isFlipped]);

  const frontRotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const backRotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={onFlip} className="w-full max-w-[340px]">
      <View className="relative h-[460px] w-full">
        {/* MẶT TRƯỚC */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.shadow,
            {
              transform: [{ perspective: 1000 }, { rotateY: frontRotateY }],
              opacity: frontOpacity,
            },
          ]}
          className="absolute inset-0 bg-white"
        >
          <View className="flex-1 items-center justify-center p-8">
            <View className="relative mb-8">
              <View className="absolute -inset-4 scale-110 rounded-full bg-red-50 opacity-40" />
              <Image
                source={{ uri: displayImage }}
                className="h-40 w-56 rounded-[32px]"
                resizeMode="cover"
              />
            </View>

            <View className="mb-6 items-center">
              <Text className="text-center text-[36px] font-black leading-tight tracking-tight text-slate-900">
                {card.word}
              </Text>
              {card.phonetic ? (
                <View className="w-full items-center rounded-full px-4 py-1.5">
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    className="text-center text-lg font-bold italic text-[#C70F2B]"
                  >
                    {card.phonetic}
                  </Text>
                </View>
              ) : null}
            </View>

            {onPlayAudio && (
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  onPlayAudio();
                }}
                className="mt-4 flex-row items-center justify-center rounded-[32px] bg-[#C70F2B] px-8 py-4 shadow-lg shadow-red-300"
                activeOpacity={0.85}
              >
                <View className="mr-3">
                  <FontAwesome name="volume-up" size={24} color="#fff" />
                </View>
                <Text className="text-[20px] font-extrabold tracking-wide text-white">Listen</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* MẶT SAU */}
        <Animated.View
          style={[
            styles.cardBase,
            styles.shadow,
            { transform: [{ perspective: 1000 }, { rotateY: backRotateY }], opacity: backOpacity },
          ]}
          className="absolute inset-0 z-[-1] bg-white"
        >
          <View className="flex-1 p-8">
            {/* Vietnamese Meaning */}
            <View className="mb-8 mt-2">
              <View className="mb-3 flex-row items-center">
                <Text className="text-[11px] font-black uppercase tracking-[2px] text-[#94A3B8]">
                  Vietnamese Meaning
                </Text>
              </View>
              <Text className="mb-2 text-2xl font-black text-[#C70F2B]">
                {card.definitionVi || 'Đang cập nhật...'}
              </Text>
              <Text className="text-[17px] font-medium leading-relaxed text-slate-600">
                {card.definitionEn}
              </Text>
            </View>

            {/* Usage Example */}
            <View>
              <View className="mb-4 flex-row items-center">
                <Text className="text-[11px] font-black uppercase tracking-[2px] text-[#94A3B8]">
                  Usage Example
                </Text>
              </View>
              {card.exampleEn ? (
                <View className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                  <Text className="text-[16px] italic leading-relaxed text-slate-700">
                    {/* Bôi đỏ chữ đang học bất chấp viết hoa thường */}
                    {card.exampleEn.split(new RegExp(`(${card.word})`, 'gi')).map((part, idx) =>
                      part.toLowerCase() === card.word.toLowerCase() ? (
                        <Text key={idx} className="font-extrabold text-[#C70F2B]">
                          {part}
                        </Text>
                      ) : (
                        <React.Fragment key={idx}>{part}</React.Fragment>
                      )
                    )}
                  </Text>
                  {card.exampleVi ? (
                    <Text className="mt-3 text-[14px] text-slate-500">{card.exampleVi}</Text>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardBase: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  shadow: {
    shadowColor: '#C70F2B',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 15,
  },
});
