import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconCheckCourse, IconLockLession } from '@/components/icon';

// Định nghĩa kiểu dữ liệu cho trạng thái bài học
type RoadmapStatus = 'completed' | 'active' | 'locked';

interface RoadmapItemData {
  _id: string;
  displayDate: string; // SAT • MAR 21 hoặc MON • TODAY
  name_en: string;
  status: RoadmapStatus;
}

interface LearningRoadmapProps {
  items: RoadmapItemData[];
  onLessonPress?: (lessonId: string, status: RoadmapStatus) => void;
}

// Component vẽ cái chấm tròn trạng thái (Dot)
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

  // Mặc định là Locked
  return (
    <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
      <View className="h-7 w-7 items-center justify-center rounded-full bg-gray-200">
        <IconLockLession width={18} height={18} />
      </View>
    </View>
  );
};

const RoadmapItem: React.FC<
  RoadmapItemData & { isLast?: boolean; onPress?: (id: string, status: RoadmapStatus) => void }
> = ({ _id, displayDate, name_en, status, isLast, onPress }) => {
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  return (
    <TouchableOpacity
      className="flex-row"
      activeOpacity={isLocked ? 1 : 0.7} // Khóa thì không có hiệu ứng mờ khi bấm
      onPress={() => onPress?.(_id, status)}
    >
      {/* ... (Giữ nguyên toàn bộ nội dung View Cột trái và Cột phải bên trong) ... */}
      {/* Cột trái */}
      <View className="w-14 items-center">
        <RoadmapDot status={status} />
        {!isLast && (
          <View
            className={`w-[2px] flex-1 ${isLocked ? 'bg-gray-100' : 'bg-red-100'}`}
            style={{ minHeight: 30 }}
          />
        )}
      </View>

      {/* Cột phải */}
      <View
        className={`mb-5 ml-2 flex-1 rounded-2xl px-4 py-4 shadow-sm ${
          isActive ? 'border border-red-200 bg-red-50/50' : 'border border-gray-50 bg-white'
        }`}
      >
        <Text
          className={`mb-1 text-[11px] font-bold uppercase tracking-wider ${
            isActive ? 'text-[#C8102E]' : 'text-gray-400'
          }`}
        >
          {displayDate}
        </Text>
        <Text
          className={`text-[15px] font-bold ${
            isLocked ? 'text-gray-400' : isActive ? 'text-gray-900' : 'text-gray-700'
          }`}
          numberOfLines={1}
        >
          {name_en}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ items, onLessonPress }) => {
  if (!items || items.length === 0) {
    return (
      <View className="mx-5 items-center py-10">
        <Text className="text-gray-400">Chưa có lộ trình học tập.</Text>
      </View>
    );
  }

  return (
    <View className="mx-5 mb-10">
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">Learning Roadmap</Text>
      </View>

      {items.map((item, index) => (
        <RoadmapItem
          key={item._id}
          _id={item._id}
          displayDate={item.displayDate}
          name_en={item.name_en}
          status={item.status}
          isLast={index === items.length - 1}
          onPress={onLessonPress} // Truyền hàm xuống đây
        />
      ))}
    </View>
  );
};
