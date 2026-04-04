import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { FlashcardItem } from './useFlashcard';

interface FlashcardCardProps {
  card: FlashcardItem;
  isFlipped: boolean;
  onFlip: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPlayAudio?: () => void;
  imageUrl?: string;
}

const SWIPE_THRESHOLD = 110;
const SWIPE_OFFSCREEN_X = 420;

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  isFlipped,
  onFlip,
  onSwipeLeft,
  onSwipeRight,
  onPlayAudio,
}) => {
  const displayImage =
    card.imageUrl ||
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop';

  const flipAnim = useRef(new Animated.Value(isFlipped ? 1 : 0)).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const isResolvingSwipeRef = useRef(false);

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 8,
      tension: 70,
      useNativeDriver: true,
    }).start();
  };

  const completeSwipe = (direction: 'left' | 'right') => {
    if (isResolvingSwipeRef.current) return;
    isResolvingSwipeRef.current = true;

    Animated.timing(pan, {
      toValue: { x: direction === 'right' ? SWIPE_OFFSCREEN_X : -SWIPE_OFFSCREEN_X, y: 0 },
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      isResolvingSwipeRef.current = false;

      if (direction === 'right') {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const horizontalMove = Math.abs(gestureState.dx) > 10;
        const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        return horizontalMove && isHorizontal;
      },
      onPanResponderMove: (_, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          completeSwipe('right');
          return;
        }

        if (gestureState.dx < -SWIPE_THRESHOLD) {
          completeSwipe('left');
          return;
        }

        resetPosition();
      },
      onPanResponderTerminate: resetPosition,
    })
  ).current;

  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 1 : 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [flipAnim, isFlipped]);

  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
  }, [pan, card.id]);

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

  const cardRotate = pan.x.interpolate({
    inputRange: [-160, 0, 160],
    outputRange: ['-8deg', '0deg', '8deg'],
    extrapolate: 'clamp',
  });

  const knowOpacity = pan.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dontKnowOpacity = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{ transform: [{ translateX: pan.x }, { rotate: cardRotate }] }}
      className="w-full max-w-[340px]"
      {...panResponder.panHandlers}
    >
      <Animated.View style={{ opacity: dontKnowOpacity }} className="absolute left-4 top-5 z-20">
        <View className="rounded-xl border-2 border-[#DC2626] bg-white/90 px-3 py-1.5">
          <Text className="text-xs font-black tracking-wider text-[#DC2626]">DON&apos;T KNOW</Text>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity: knowOpacity }} className="absolute right-4 top-5 z-20">
        <View className="rounded-xl border-2 border-[#16A34A] bg-white/90 px-3 py-1.5">
          <Text className="text-xs font-black tracking-wider text-[#16A34A]">KNOW IT</Text>
        </View>
      </Animated.View>

      <TouchableOpacity activeOpacity={1} onPress={onFlip} className="w-full">
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
                      className="text-center text-base font-bold italic text-[#C70F2B]"
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
                  <Text className="text-[20px] font-extrabold tracking-wide text-white">
                    Listen
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          {/* MẶT SAU */}
          <Animated.View
            style={[
              styles.cardBase,
              styles.shadow,
              {
                transform: [{ perspective: 1000 }, { rotateY: backRotateY }],
                opacity: backOpacity,
              },
            ]}
            className="absolute inset-0 z-[-1] bg-white"
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ padding: 32, paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
              bounces={true}
            >
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
            </ScrollView>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
