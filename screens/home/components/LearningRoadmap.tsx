import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconCheckCourse, IconLockLession } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { CARD_BG_DARK } from '@/screens/profile/constants/profile.constants';

// Định nghĩa kiểu dữ liệu
export type RoadmapStatus = 'completed' | 'active' | 'locked';

export interface RoadmapItemData {
  _id: string;
  displayDate: string;
  name_en: string;
  status: RoadmapStatus;
}

export interface RoadmapModuleData {
  id: string;
  number: number;
  label: string;
  status: 'completed' | 'current' | 'locked';
}

interface LearningRoadmapProps {
  pathTitle?: string;
  modules?: RoadmapModuleData[];
  items: RoadmapItemData[];
  onLessonPress?: (lessonId: string, status: RoadmapStatus) => void;
}

const HorizontalModuleTracker: React.FC<{ modules: RoadmapModuleData[] }> = ({ modules }) => {
  if (!modules || modules.length === 0) return null;

  const displayModules = [...modules];
  while (displayModules.length < 4) {
    const nextIndex = displayModules.length;
    displayModules.push({
      id: `fake-locked-mod-${nextIndex}`,
      number: nextIndex + 1,
      label: `Tuần ${nextIndex + 1}`,
      status: 'locked',
    });
  }

  return (
    <View className="mb-10 flex-row items-center justify-between px-2">
      {displayModules.map((mod, index) => {
        const isLast = index === displayModules.length - 1;
        const isCompleted = mod.status === 'completed';
        const isCurrent = mod.status === 'current';
        const isLocked = mod.status === 'locked';

        const lineClass = isCompleted ? 'bg-[#F7D7DE]' : 'bg-[#FCECEF]';

        return [
          <View key={`node-${mod.id}`} className="relative z-10 items-center">
            <View
              className={`items-center justify-center rounded-full ${
                isCurrent
                  ? 'h-[44px] w-[44px] border-[4px] border-white bg-[#C8102E]'
                  : 'h-[36px] w-[36px]'
              } ${isCompleted ? 'bg-[#C8102E]' : ''} ${isLocked ? 'bg-[#FCF0F1]' : ''} `}
              style={
                isCurrent
                  ? {
                      elevation: 6,
                      shadowColor: '#C8102E',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.35,
                      shadowRadius: 8,
                    }
                  : {}
              }
            >
              {isCompleted && <IconCheckCourse width={16} height={16} color="white" />}
              {isCurrent && <Text className="text-[16px] font-bold text-white">{mod.number}</Text>}
              {isLocked && <IconLockLession width={18} height={18} color="#B5A9A9" />}
            </View>

            {/* Chữ hiển thị bên dưới */}
            <Text
              className={`absolute top-[52px] w-[70px] whitespace-nowrap text-center text-[12px] font-bold ${
                isCurrent ? 'text-[#C8102E]' : 'text-[#8C7A78]'
              } `}
            >
              {mod.label}
            </Text>
          </View>,

          /* Đường gạch ngang (Nằm xen giữa các node) */
          !isLast ? (
            <View key={`line-${mod.id}`} className={`z-0 mx-[-2px] h-[4px] flex-1 ${lineClass}`} />
          ) : null,
        ];
      })}
    </View>
  );
};

const RoadmapDot: React.FC<{ status: RoadmapStatus }> = ({ status }) => {
  const { colors, isDark } = useAppTheme();

  if (status === 'completed') {
    return (
      <View
        className="h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: isDark ? '#3F1D1D' : '#FDECEF' }}
      >
        <View
          className="h-8 w-8 items-center justify-center rounded-full bg-[#C8102E]"
          style={{
            shadowColor: '#C8102E',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDark ? 0.25 : 0.16,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <IconCheckCourse width={16} height={16} color="white" />
        </View>
      </View>
    );
  }

  if (status === 'active') {
    return (
      <View
        className="h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: isDark ? '#3F1D1D' : '#FDECEF' }}
      >
        <View
          className="h-8 w-8 items-center justify-center rounded-full border-2 border-[#C8102E] bg-[#C8102E]"
          style={{
            shadowColor: '#C8102E',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDark ? 0.22 : 0.14,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="h-2.5 w-2.5 rounded-full bg-white" />
        </View>
      </View>
    );
  }

  return (
    <View
      className="h-11 w-11 items-center justify-center rounded-full"
      style={{ backgroundColor: isDark ? colors.surface : '#EEF2F7' }}
    >
      <View
        className="h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: isDark ? colors.borderMuted : '#DDE5EF' }}
      >
        <IconLockLession width={16} height={16} color="#94A3B8" />
      </View>
    </View>
  );
};

const RoadmapItem: React.FC<
  RoadmapItemData & { isLast?: boolean; onPress?: (id: string, status: RoadmapStatus) => void }
> = ({ _id, displayDate, name_en, status, isLast, onPress }) => {
  const { colors, isDark } = useAppTheme();
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';

  const lineColor = isDark ? colors.border : '#E7ECF2';

  const cardStyle = isDark
    ? {
        backgroundColor: CARD_BG_DARK,
        borderColor: isActive ? '#C8102E' : colors.border,
        borderWidth: 1,
      }
    : isActive
      ? {
          backgroundColor: '#FFFFFF',
          borderColor: '#F3C5CF',
          borderWidth: 1.5,
          shadowColor: '#C8102E',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.08,
          shadowRadius: 14,
          elevation: 3,
        }
      : isCompleted
        ? {
            backgroundColor: '#F1F5F9',
            borderColor: '#E7ECF2',
            borderWidth: 1,
          }
        : {
            backgroundColor: '#F8FAFC',
            borderColor: '#EAF0F6',
            borderWidth: 1,
          };

  const dateColor = isDark ? colors.muted : isActive ? '#C8102E' : isLocked ? '#B8C2D0' : '#94A3B8';

  const titleColor = isDark
    ? isLocked
      ? colors.muted
      : colors.text
    : isLocked
      ? '#6B7280'
      : '#0F172A';

  return (
    <TouchableOpacity
      className="flex-row"
      activeOpacity={isLocked ? 1 : 0.72}
      onPress={() => onPress?.(_id, status)}
    >
      <View className="w-14 items-center">
        <RoadmapDot status={status} />
        {!isLast && (
          <View className="w-[2px] flex-1" style={{ minHeight: 36, backgroundColor: lineColor }} />
        )}
      </View>

      <View className="mb-4 ml-2 flex-1 rounded-[18px] px-4 py-3.5" style={cardStyle}>
        <Text
          className="mb-1 text-[11px] font-bold uppercase tracking-[1px]"
          style={{ color: dateColor }}
        >
          {displayDate}
        </Text>
        <Text
          className="text-[15px] font-extrabold leading-[21px]"
          style={{ color: titleColor }}
          numberOfLines={2}
        >
          {name_en}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ========================================================
// COMPONENT CHÍNH (WRAPPER)
// ========================================================
export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({
  pathTitle,
  modules,
  items,
  onLessonPress,
}) => {
  const { colors } = useAppTheme();

  if (!items || items.length === 0) {
    return (
      <View className="mx-5 items-center py-10">
        <Text style={{ color: colors.muted }}>Chưa có lộ trình học tập.</Text>
      </View>
    );
  }

  return (
    <View className="mx-5 mb-10">
      {/* Tiêu đề Khóa học */}
      <View className="mb-5 flex-row items-center justify-between">
        <View className="mb-2">
          <Text className="text-[22px] font-black tracking-tight text-[#0F172A]">
            Learning Roadmap
          </Text>
          {pathTitle && <Text className="mt-1 text-[14px] text-[#8C7A78]">{pathTitle}</Text>}
        </View>
      </View>

      {/* Dải phân cách Tuần (Nằm ngang) */}
      <HorizontalModuleTracker modules={modules || []} />

      {/* Danh sách bài học (Dọc) */}
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
