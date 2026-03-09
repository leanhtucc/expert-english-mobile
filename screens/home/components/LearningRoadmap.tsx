import React from 'react';
import { Text, View } from 'react-native';

import { IconCheckCourse, IconLockLession } from '@/components/icon';

type RoadmapStatus = 'completed' | 'active' | 'locked';

interface RoadmapItemData {
  day: string;
  title: string;
  status: RoadmapStatus;
  isLast?: boolean;
}

const ROADMAP_ITEMS: RoadmapItemData[] = [
  { day: 'MON • JUL 10', title: 'Fundamentals & Jargon', status: 'completed' },
  { day: 'TUE • TODAY', title: 'Vocabulary & Speaking', status: 'active' },
  { day: 'WED • JUL 12', title: 'Email Etiquette & Tone', status: 'locked', isLast: true },
];

const RoadmapDot: React.FC<{ status: RoadmapStatus }> = ({ status }) => {
  if (status === 'completed')
    return (
      <View className="h-10 w-10 items-center justify-center rounded-full bg-red-100">
        <View className="h-7 w-7 items-center justify-center rounded-full bg-[#C8102E]">
          <IconCheckCourse width={16} height={16} />
        </View>
      </View>
    );
  if (status === 'active')
    return (
      <View className="h-10 w-10 items-center justify-center rounded-full bg-red-100">
        <View className="h-7 w-7 items-center justify-center rounded-full border-2 border-[#C8102E] bg-[#C8102E]">
          <View className="h-2 w-2 rounded-full bg-white" />
        </View>
      </View>
    );
  return (
    <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
      <View className="h-7 w-7 items-center justify-center rounded-full bg-gray-200">
        <IconLockLession width={18} height={18} />
      </View>
    </View>
  );
};

const RoadmapItem: React.FC<RoadmapItemData> = ({ day, title, status, isLast }) => {
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  return (
    <View className="flex-row">
      {/* Left: dot + line */}
      <View className="w-14 items-center">
        <RoadmapDot status={status} />
        {!isLast && <View className="w-0.5 flex-1 bg-gray-200" style={{ minHeight: 24 }} />}
      </View>

      {/* Content card */}
      <View
        className={`mb-4 ml-3 flex-1 rounded-2xl px-4 py-3 ${
          isActive ? 'border border-[#C8102E] bg-red-50' : isLocked ? 'bg-gray-50' : 'bg-gray-50'
        }`}
      >
        <View className="mb-1 flex-row items-center gap-1.5">
          <Text
            className={`text-[11px] font-semibold ${isActive ? 'text-[#C8102E]' : 'text-gray-400'}`}
          >
            {day}
          </Text>
        </View>
        <Text
          className={`text-sm font-bold ${
            isLocked ? 'text-gray-400' : isActive ? 'text-[#C8102E]' : 'text-gray-800'
          }`}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export const LearningRoadmap: React.FC = () => {
  return (
    <View className="mx-5">
      <Text className="mb-4 text-base font-bold text-gray-900">Learning Roadmap</Text>
      {ROADMAP_ITEMS.map((item, i) => (
        <RoadmapItem key={i} {...item} isLast={i === ROADMAP_ITEMS.length - 1} />
      ))}
    </View>
  );
};
