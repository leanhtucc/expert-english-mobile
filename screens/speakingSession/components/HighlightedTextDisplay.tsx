import React from 'react';
import { Text, View } from 'react-native';

import { HighlightedText } from '@/types/speaking.types';

interface HighlightedTextDisplayProps {
  segments: HighlightedText[];
  title?: string;
}

export const HighlightedTextDisplay: React.FC<HighlightedTextDisplayProps> = ({
  segments,
  title = 'Your Answer',
}) => {
  return (
    <View className="mb-4">
      {/* Title outside card, top right */}
      <View className="mb-2 flex-row justify-end">
        <Text className="text-sm font-semibold text-gray-700">{title}</Text>
      </View>

      {/* Card content */}
      <View className="rounded-xl border border-gray-200 bg-white p-4">
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            rowGap: 20, // Thu nhỏ khoảng cách giữa các dòng cho vừa với chữ nhỏ
          }}
        >
          {segments.map((segment, index) => {
            // 1. Từ đúng
            if (segment.isCorrect) {
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: 16, // Giảm từ 22 xuống 16
                    fontWeight: '500',
                    color: '#1F2937',
                    marginHorizontal: 4,
                  }}
                >
                  {segment.text}
                </Text>
              );
            }

            // 2. Từ sai có sửa
            if (segment.correction) {
              return (
                <View key={index} style={{ marginHorizontal: 4, alignItems: 'center' }}>
                  {/* Chữ sai - Cùng kích thước với chữ đúng trong câu */}
                  <Text
                    style={{
                      color: '#DC2626',
                      textDecorationLine: 'line-through',
                      fontSize: 16, // Giảm từ 22 xuống 16
                      fontWeight: '500',
                    }}
                  >
                    {segment.text}
                  </Text>

                  {/* Chữ đúng sửa lại - Nhỏ hơn một chút để làm huy hiệu (badge) */}
                  <Text
                    style={{
                      backgroundColor: '#D1FAE5',
                      color: '#059669',
                      fontWeight: '600',
                      fontSize: 14, // Giảm từ 18 xuống 14
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 6,
                      marginTop: 2, // Kéo box xanh lại gần chữ đỏ hơn
                    }}
                  >
                    {segment.correction}
                  </Text>
                </View>
              );
            }

            // 3. Từ sai không có sửa
            return (
              <Text
                key={index}
                style={{
                  fontSize: 16, // Giảm từ 22 xuống 16
                  fontWeight: '500',
                  color: '#DC2626',
                  textDecorationLine: 'line-through',
                  marginHorizontal: 4,
                }}
              >
                {segment.text}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};
