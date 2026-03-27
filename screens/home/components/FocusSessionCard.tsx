import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { IconNotificationUser } from '@/components/icon';

interface FocusSessionCardProps {
  category?: string;
  title?: string;
  description?: string;
  participantCount?: number;
  onPress?: () => void;
  onViewAll?: () => void;
}

export const FocusSessionCard: React.FC<FocusSessionCardProps> = ({
  category = 'SPEAKING MASTERY',
  title = 'Industry Pitch Prep',
  description = 'Master 10 high-impact industry terms and practice your delivery style with AI feedback.',
  participantCount = 12,
  onPress,
  onViewAll,
}) => {
  return (
    <View className="mx-5">
      {/* Section header */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-bold text-gray-900">Bài học hôm nay</Text>
        <Pressable onPress={onViewAll} hitSlop={8}>
          <Text className="text-sm font-semibold text-[#C8102E]">Xem tất cả</Text>
        </Pressable>
      </View>

      {/* Card */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.92 : 1 },
          { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
        ]}
        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
      >
        {/* Top row: icon left | category + title + description right */}
        <View className="mb-3 flex-row items-start gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <IconNotificationUser width={32} height={32} />
          </View>
          <View className="flex-1">
            <Text className="mb-0.5 text-[11px] font-bold tracking-widest text-[#C8102E]">
              {category}
            </Text>
            <Text className="mb-1 text-base font-bold text-gray-900">{title}</Text>
            <Text className="mb-3 text-sm leading-5 text-gray-500">{description}</Text>

            {/* Avatars + count + Start button */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                {[0, 1, 2].map(i => (
                  <View
                    key={i}
                    className="h-7 w-7 rounded-full bg-gray-200"
                    style={{ marginLeft: i === 0 ? 0 : -8 }}
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
};
