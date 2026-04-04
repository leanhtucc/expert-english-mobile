import React from 'react';
import { Text, View } from 'react-native';

import { ImageMascoForHomes } from '@/components/icon';

interface HeroGoalCardProps {
  level?: string;
  title?: string;
  subtitle?: string;
}

export const HeroGoalCard: React.FC<HeroGoalCardProps> = ({
  level = 'LEVEL B2',
  title = 'Cùng bắt đầu học tiếng Anh ngay hôm nay!',
  subtitle = 'Bạn có 3 bài học cho hôm nay.',
}) => {
  return (
    <View className="mx-5 rounded-3xl bg-[#C8102E]">
      <View className="flex-row items-end justify-between px-5 pt-5">
        {/* Left text block */}
        <View className="flex-1 pb-5 pr-4">
          {/* Level badge */}
          <View className="mb-3 flex-row items-center gap-1.5 self-start rounded-full bg-white/20 px-3 py-1">
            <Text className="text-xs font-bold tracking-widest text-white">{level}</Text>
          </View>

          <Text className="mb-2 text-xl font-extrabold leading-7 text-white">{title}</Text>
          <Text className="text-sm leading-5 text-white/80">{subtitle}</Text>
        </View>

        {/* Right illustration — rounded corners, anchored to bottom */}
        <View
          className="overflow-hidden rounded-br-3xl rounded-tl-[20px]"
          style={{ marginRight: -20 }}
        >
          <ImageMascoForHomes width={160} height={180} />
        </View>
      </View>
    </View>
  );
};
