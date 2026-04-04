import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';

import { WeekItem } from '../types/progress.types';

export const WeekTimeline = ({ items }: { items: WeekItem[] }) => {
  return (
    // Chừa khoảng trống bên dưới (mb-8) để text hiển thị dạng absolute không bị cắt
    <View className="mb-8 mt-5 flex-row items-center justify-between px-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isDone = item.status === 'done';
        const isCurrent = item.status === 'current';
        const isLocked = item.status === 'locked';

        // Gạch ngang: Đỏ đậm nếu đã xong, màu hồng nhạt nếu chưa tới
        const lineClass = isDone ? 'bg-[#C8102E]' : 'bg-[#FCE4E4]';

        return (
          <React.Fragment key={item.id}>
            {/* Vùng Node (Chấm tròn + Chữ) */}
            <View className="relative z-10 items-center">
              {/* Hình tròn */}
              <View
                className={`items-center justify-center rounded-full ${isCurrent ? 'h-[44px] w-[44px] border-[4px] border-white bg-[#C8102E]' : 'h-[36px] w-[36px]'} ${isDone ? 'bg-[#C8102E]' : ''} ${isLocked ? 'bg-[#FBDBDA]' : ''} `}
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
                {isDone && <Feather name="check" size={16} color="white" />}
                {isCurrent && <Text className="text-[16px] font-bold text-white">{item.id}</Text>}
                {isLocked && <Feather name="lock" size={18} color="#B5A9A9" />}
              </View>

              {/* Chữ hiển thị bên dưới (Dùng absolute để không làm hỏng cấu trúc flex-row của đường gạch ngang) */}
              <Text
                className={`absolute top-[52px] w-[70px] text-center text-[12px] font-bold ${isCurrent ? 'text-[#C8102E]' : 'text-[#7A6F6F]'} `}
              >
                {item.label}
              </Text>
            </View>

            {/* Đường gạch ngang (Nằm xen giữa các node) */}
            {!isLast && <View className={`z-0 mx-[-2px] h-[4px] flex-1 ${lineClass}`} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};
