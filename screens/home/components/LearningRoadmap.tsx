import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconCheckCourse, IconLockLession } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CARD_BG_DARK } from '@/screens/profile/constants/profile.constants';

type RoadmapStatus = 'completed' | 'active' | 'locked';

interface RoadmapItemData {
  _id: string;
  displayDate: string;
  name_en: string;
  status: RoadmapStatus;
}

interface LearningRoadmapProps {
  items: RoadmapItemData[];
  onLessonPress?: (lessonId: string, status: RoadmapStatus) => void;
}

const RoadmapDot: React.FC<{ status: RoadmapStatus }> = ({ status }) => {
  const { colors, isDark } = useAppTheme();

  if (status === 'completed')
    return (
      <View
        className="h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: isDark ? '#3F1D1D' : '#FEE2E2' }}
      >
        <View className="h-7 w-7 items-center justify-center rounded-full bg-[#C8102E]">
          <IconCheckCourse width={16} height={16} />
        </View>
      </View>
    );

  if (status === 'active')
    return (
      <View
        className="h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: isDark ? '#3F1D1D' : '#FEE2E2' }}
      >
        <View className="h-7 w-7 items-center justify-center rounded-full border-2 border-[#C8102E] bg-[#C8102E]">
          <View className="h-2 w-2 rounded-full bg-white" />
        </View>
      </View>
    );

  return (
    <View
      className="h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: isDark ? colors.surface : '#F3F4F6' }}
    >
      <View
        className="h-7 w-7 items-center justify-center rounded-full"
        style={{ backgroundColor: isDark ? colors.borderMuted : '#E5E7EB' }}
      >
        <IconLockLession width={18} height={18} />
      </View>
    </View>
  );
};

const RoadmapItem: React.FC<
  RoadmapItemData & { isLast?: boolean; onPress?: (id: string, status: RoadmapStatus) => void }
> = ({ _id, displayDate, name_en, status, isLast, onPress }) => {
  const { colors, isDark } = useAppTheme();
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  const lineColor = isLocked
    ? isDark
      ? colors.border
      : '#F3F4F6'
    : isDark
      ? '#5C1F1F'
      : '#FEE2E2';

  const cardStyle = isDark
    ? {
        backgroundColor: CARD_BG_DARK,
        borderColor: isActive ? '#C8102E' : colors.border,
        borderWidth: 1,
      }
    : isActive
      ? {
          backgroundColor: 'rgba(254, 242, 242, 0.5)',
          borderColor: '#FECACA',
          borderWidth: 1,
        }
      : {
          backgroundColor: '#FFFFFF',
          borderColor: '#F9FAFB',
          borderWidth: 1,
        };

  const dateColor = isActive ? '#C8102E' : colors.muted;
  const titleColor = isLocked ? colors.muted : colors.text;

  return (
    <TouchableOpacity
      className="flex-row"
      activeOpacity={isLocked ? 1 : 0.7}
      onPress={() => onPress?.(_id, status)}
    >
      <View className="w-14 items-center">
        <RoadmapDot status={status} />
        {!isLast && (
          <View className="w-[2px] flex-1" style={{ minHeight: 30, backgroundColor: lineColor }} />
        )}
      </View>

      <View className="mb-5 ml-2 flex-1 rounded-2xl px-4 py-4 shadow-sm" style={cardStyle}>
        <Text
          className="mb-1 text-[11px] font-bold uppercase tracking-wider"
          style={{ color: dateColor }}
        >
          {displayDate}
        </Text>
        <Text className="text-[15px] font-bold" style={{ color: titleColor }} numberOfLines={1}>
          {name_en}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ items, onLessonPress }) => {
  const { colors } = useAppTheme();

  if (!items || items.length === 0) {
    return (
      <View className="mx-5 items-center py-10">
        <Text style={{ color: colors.muted }}>Chưa có lộ trình học tập.</Text>
      </View>
    );
  }

  return (
    <View className="mx-5 mb-10 mt-10">
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          Roadmap học tập
        </Text>
      </View>

      {items.map((item, index) => (
        <RoadmapItem
          key={item._id}
          _id={item._id}
          displayDate={item.displayDate}
          name_en={item.name_en}
          status={item.status}
          isLast={index === items.length - 1}
          onPress={onLessonPress}
        />
      ))}
    </View>
  );
};
