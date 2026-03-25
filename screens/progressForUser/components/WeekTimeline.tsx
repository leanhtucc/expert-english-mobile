import { Feather } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';

import { WeekItem } from '../types/progress.types';

export const WeekTimeline = ({ items }: { items: WeekItem[] }) => {
  return (
    // Thêm mb-8 (margin-bottom) để chừa khoảng trống cho các dòng text (vì text đang dùng absolute)
    <View className="mt-4 mb-8 flex-row items-center justify-between px-1">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isDone = item.status === 'done';
        const isCurrent = item.status === 'current';
        const isLocked = item.status === 'locked';

        // Màu của đường line nối với node tiếp theo (Nút Done thì line đỏ, nút Current/Locked thì line hồng lợt)
        const lineClass = isDone ? 'bg-[#C8102E]' : 'bg-[#FCE4E4]';

        return (
          <React.Fragment key={item.id}>
            {/* Khối chứa Vòng tròn (Node) */}
            <View className="relative z-10 items-center">
              <View
                className={`items-center justify-center rounded-full ${isCurrent ? 'h-[42px] w-[42px] border-[4px] border-white bg-[#C8102E]' : 'h-[34px] w-[34px]'} ${isDone ? 'bg-[#C8102E]' : ''} ${isLocked ? 'bg-[#FCE4E4]' : ''} `}
                style={
                  isCurrent
                    ? {
                        elevation: 6,
                        shadowColor: '#C8102E',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                      }
                    : {}
                }
              >
                {isDone && <Feather name="check" size={16} color="white" />}
                {isCurrent && <Text className="text-[16px] font-bold text-white">{item.id}</Text>}
                {isLocked && <Feather name="lock" size={14} color="#9B8282" />}
              </View>

              {/* Chữ hiển thị ở dưới cùng (Absolute để KHÔNG đẩy lệch đường Line) */}
              <Text
                className={`absolute top-[50px] w-[70px] text-center text-[12px] font-bold ${isCurrent ? 'text-[#C8102E]' : 'text-[#7A6F6F]'} `}
              >
                {item.label}
              </Text>
            </View>

            {/* Đường gạch ngang (Line) */}
            {!isLast && (
              // mx-[-2px] giúp đường line đâm hơi lún vào dưới các vòng tròn tạo cảm giác liền mạch
              <View className={`z-0 mx-[-2px] h-[3px] flex-1 ${lineClass}`} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};
