import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { IconNotificationUser } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

interface FocusSessionCardProps {
  category?: string;
  title?: string;
  description?: string;
  participantCount?: number;
  onPress?: () => void;
  onViewAll?: () => void;
}

export const FocusSessionCard: React.FC<FocusSessionCardProps> = memo(
  ({
    category = 'SPEAKING MASTERY',
    title = 'Industry Pitch Prep',
    description = 'Master 10 high-impact industry terms and practice your delivery style with AI feedback.',
    participantCount = 12,
    onPress,
    onViewAll,
  }) => {
    const { colors, isDark } = useAppTheme();

    return (
      <View className="mx-5">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-bold" style={{ color: colors.text }}>
            Bài học hôm nay
          </Text>
          <Pressable onPress={onViewAll} hitSlop={8}>
            <Text className="text-sm font-semibold text-[#C8102E]">Xem tất cả</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            { opacity: pressed ? 0.92 : 1 },
            {
              shadowColor: '#000',
              shadowOpacity: isDark ? 0.25 : 0.06,
              shadowRadius: 8,
              elevation: 3,
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 16,
              padding: 16,
            },
          ]}
        >
          <View className="mb-3 flex-row items-start gap-3">
            <View
              className="h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: isDark ? colors.surface : '#FEF2F2' }}
            >
              <IconNotificationUser width={32} height={32} />
            </View>
            <View className="flex-1">
              <Text className="mb-0.5 text-[11px] font-bold tracking-widest text-[#C8102E]">
                {category}
              </Text>
              <Text className="mb-1 text-base font-bold" style={{ color: colors.text }}>
                {title}
              </Text>
              <Text className="mb-3 text-sm leading-5" style={{ color: colors.muted }}>
                {description}
              </Text>

              {/* Avatars + count + Start button */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  {[0, 1].map(i => (
                    <View
                      key={i}
                      className="h-7 w-7 rounded-full"
                      style={{
                        marginLeft: i === 0 ? 0 : -8,
                        backgroundColor: isDark ? colors.border : '#E5E7EB',
                      }}
                    />
                  ))}
                  <View
                    className="h-7 w-7 items-center justify-center rounded-full bg-[#C8102E]"
                    style={{ marginLeft: -8 }}
                  >
                    <Text className="text-[10px] font-bold text-white">+{participantCount}</Text>
                  </View>
                </View>

                <Pressable
                  onPress={onPress}
                  style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
                  className="rounded-full bg-[#C8102E] px-5 py-2"
                >
                  <Text className="text-sm font-bold text-white">Bắt đầu bài học</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
);
FocusSessionCard.displayName = 'FocusSessionCard';
