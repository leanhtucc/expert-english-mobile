import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Định nghĩa kiểu dữ liệu cho một từ vựng trong Flashcard
export interface HintVocabItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definitionVi: string;
  exampleEn: string;
  exampleVi: string;
  imageUrl?: string | null;
  audioUrl?: string | null;
  isNew?: boolean; // Label "NEW" nhỏ góc phải
}

interface HintBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  vocabList: HintVocabItem[]; // Danh sách 3-4 từ vựng để user ôn lại
  onPlayAudio?: (url: string) => void; // Hàm phát âm thanh khi bấm nút Loa
}

export const HintBottomSheet: React.FC<HintBottomSheetProps> = ({
  isVisible,
  onClose,
  vocabList,
  onPlayAudio,
}) => {
  if (!isVisible) return null;

  return (
    // Lớp overlay mờ màu đen che toàn màn hình
    <View className="absolute inset-0 z-[100] justify-end bg-black/40">
      {/* Vùng bấm ở ngoài để đóng Bottom Sheet */}
      <TouchableOpacity className="absolute inset-0" activeOpacity={1} onPress={onClose} />

      {/* Nội dung chính của Bottom Sheet (Trượt từ dưới lên) */}
      <View className="h-[75%] w-full rounded-t-[32px] bg-white pb-6 pt-2 shadow-lg">
        {/* Thanh gạt (Drag Handle) nhỏ ở giữa trên cùng */}
        <View className="mb-4 w-full items-center">
          <View className="h-1.5 w-12 rounded-full bg-slate-300" />
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {vocabList.map((item, index) => (
            <View
              key={item.id || index}
              className="mb-4 w-full rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              {/* Hàng 1: Hình ảnh (nếu có), Tên từ, Nút Loa, Label NEW */}
              <View className="mb-3 flex-row items-start justify-between">
                <View className="flex-1 flex-row items-center">
                  {/* Icon/Hình ảnh quả táo (Tùy chọn) */}
                  {item.imageUrl ? (
                    <View className="mr-3 h-12 w-12 items-center justify-center rounded-xl bg-slate-50">
                      {/* Thay Image component thật vào đây nếu bạn có ảnh */}
                      <Text className="text-2xl">🍎</Text>
                    </View>
                  ) : null}

                  <View className="flex-1">
                    <Text className="text-[20px] font-extrabold text-[#1E293B]">{item.word}</Text>
                    <View className="mt-1 flex-row items-center">
                      <Text className="mr-2 rounded-md bg-[#F1F5F9] px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#64748B]">
                        {item.partOfSpeech.toUpperCase()}
                      </Text>
                      <Text className="text-[13px] text-[#94A3B8]">{item.phonetic}</Text>
                    </View>
                  </View>
                </View>

                {/* Nút phát âm (Play Audio) & Label NEW */}
                <View className="flex-row items-center">
                  {item.audioUrl && (
                    <TouchableOpacity
                      onPress={() => onPlayAudio?.(item.audioUrl!)}
                      className="mr-2 h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F1]"
                    >
                      <Ionicons name="play" size={18} color="#C8102E" />
                    </TouchableOpacity>
                  )}
                  {item.isNew && (
                    <View className="rounded border border-red-200 bg-red-50 px-1.5 py-0.5">
                      <Text className="text-[9px] font-bold tracking-wide text-[#C8102E]">NEW</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Hàng 2: Nghĩa tiếng Việt */}
              <Text className="mb-2 text-[16px] font-bold text-[#C8102E]">{item.definitionVi}</Text>

              {/* Hàng 3: Ví dụ song ngữ */}
              <View>
                <Text className="text-[14px] italic leading-5 text-[#475569]">
                  &quot;{item.exampleEn}&quot;
                </Text>
                <Text className="mt-1 text-[13px] text-[#94A3B8]">{item.exampleVi}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
