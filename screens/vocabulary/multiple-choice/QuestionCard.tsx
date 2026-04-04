import React from 'react';
import { Text, View } from 'react-native';

import { HintButton } from '../components/HintButton';

interface QuestionCardProps {
  word?: string;
  question: string;
  phonetic?: string;
  className?: string;
  showHintButton?: boolean;
  isHintUsed?: boolean;
  onPressHint?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  className = '',
  showHintButton = false,
  isHintUsed = false,
  onPressHint, // Prop này dùng để xử lý sự kiện bấm nút
}) => {
  const renderSmartQuestion = () => {
    // Danh sách các từ khóa để tách chuỗi
    const splitKeywords = ['pronunciation', 'definition', 'meaning'];
    const matchedKeyword = splitKeywords.find(kw => question.toLowerCase().includes(kw));

    if (matchedKeyword) {
      // REGEX BỌC THÉP: Tách tại từ khóa, chấp nhận mọi khoảng trắng và dấu :
      const regex = new RegExp(`(${matchedKeyword})\\s*:?\\s*`, 'i');
      const parts = question.split(regex);

      if (parts.length >= 3) {
        // Hợp nhất phần hướng dẫn tiếng Anh
        const instructionText = parts[0].trim() + ' ' + parts[1].toLowerCase() + ':';

        // Hợp nhất phần nội dung tiếng Việt còn lại
        let contentText = parts.slice(2).join('').trim();

        // Xóa dấu hỏi ở cuối câu tiếng Việt nếu có để tránh lặp dấu
        if (contentText.endsWith('?')) {
          contentText = contentText.slice(0, -1);
        }

        return (
          <View className="w-full items-center justify-center">
            {/* Câu lệnh Tiếng Anh: TO, ĐẬM */}
            <Text className="mb-2.5 text-center text-[20px] font-extrabold leading-[30px] text-[#1E293B]">
              {instructionText}
            </Text>
            {/* Nghĩa Tiếng Việt: Nhỏ hơn, In nghiêng, Xám nhạt */}
            <Text className="text-center text-[16px] font-medium italic leading-6 text-[#64748B]">
              &quot;{contentText}&quot;
            </Text>
          </View>
        );
      }
    }

    // Trường hợp không bắt được từ khóa thì hiện nguyên bản nhưng vẫn style đẹp
    return (
      <Text className="text-center text-[20px] font-extrabold leading-8 text-[#1E293B]">
        {question}
      </Text>
    );
  };

  return (
    <View
      className={`w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <View className="flex-1 items-center justify-center px-6 py-8">
        {/* Render phần nội dung câu hỏi */}
        {renderSmartQuestion()}

        {/* Nút Gợi ý (HintButton bản to) */}
        {showHintButton && (
          <HintButton
            onPress={onPressHint || (() => {})} // Sửa lỗi gọi sai handleOpenHint
            isUsed={isHintUsed}
          />
        )}
      </View>
    </View>
  );
};
