import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { TermItem } from './TermItem';
import { MatchPair, useMatchTerms } from './useMatchTerms';

interface MatchTermsScreenProps {
  pairs: MatchPair[];
  onComplete?: (accuracy: number) => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const MatchTermsScreen: React.FC<MatchTermsScreenProps> = ({
  pairs,
  onComplete,
  onBack,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const {
    selectedTerm,
    selectedDefinition,
    matchedPairs,
    accuracy,
    progress,
    isComplete,
    handleSelectTerm,
    handleSelectDefinition,
    reset,
  } = useMatchTerms({
    pairs,
    onComplete,
  });

  const shuffledDefinitions = useMemo(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [pairs]);

  // LOGIC ẨN ĐÁP ÁN: Lọc bỏ các cặp đã nối đúng (chúng sẽ tự động biến mất khỏi UI)
  const visibleTerms = pairs.filter(p => !matchedPairs.includes(p.id));
  const visibleDefs = shuffledDefinitions.filter(p => !matchedPairs.includes(p.id));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      <View className="w-full bg-white">
        <ScreenHeader
          title="Vocabulary Quiz"
          subtitle="LEVEL: PROFESSIONAL AI"
          onBack={onBack}
          onClose={onClose}
          rightAction={
            <TouchableOpacity className="rounded-full border border-red-200 px-4 py-1.5">
              <Text className="text-[14px] font-bold text-[#E11D48]">Skip</Text>
            </TouchableOpacity>
          }
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        {/* Thanh Progress */}
        <View className="w-full px-5 pt-4 pb-2">
          <View className="mb-2 flex-row items-center justify-between px-1">
            <Text className="text-[13.5px] font-semibold text-slate-500">Matching Progress</Text>
            <Text className="text-[13.5px] font-bold text-[#E11D48]">
              {progress.current} / {progress.total}
            </Text>
          </View>
          <ProgressBar current={progress.current} total={progress.total} />
        </View>

        {/* ScrollView để chứa đáp án (càng nối đúng danh sách càng ngắn lại) */}
        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingBottom: 120 }} // Đảm bảo cuộn không bị kẹt nút đáy
          showsVerticalScrollIndicator={false}
        >
          {/* Tiêu đề & Hướng dẫn */}
          <View className="items-center px-5 py-6">
            <Text className="mb-2 text-[24px] font-black tracking-tight text-[#1E293B]">
              Connect the Terms
            </Text>
            <Text className="text-center text-[15px] text-slate-500">
              Match the English AI terminology to its meaning.
            </Text>
          </View>

          {/* 2 Cột Chứa Đáp Án */}
          <View className="w-full flex-row px-5">
            <View className="flex-1 pr-2">
              {visibleTerms.map(pair => (
                <TermItem
                  key={pair.id}
                  id={pair.id}
                  text={pair.term}
                  isSelected={selectedTerm === pair.id}
                  onPress={() => handleSelectTerm(pair.id)}
                  type="term"
                />
              ))}
            </View>

            <View className="flex-1 pl-2">
              {visibleDefs.map(pair => (
                <TermItem
                  key={pair.id}
                  id={pair.id}
                  text={pair.definition}
                  isSelected={selectedDefinition === pair.id}
                  onPress={() => handleSelectDefinition(pair.id)}
                  type="definition"
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* CỤM NÚT DƯỚI ĐÁY MÀN HÌNH (Giống Figma) */}
      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="absolute bottom-[-25px] left-0 right-0 flex-row border-t border-slate-200 bg-white px-5 pt-4"
      >
        {/* Nút Reset */}
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.7}
          className="mr-3 h-[56px] flex-1 items-center justify-center rounded-2xl border-[2px] border-slate-200 bg-white"
        >
          <Text className="text-[16px] font-bold text-[#334155]">Reset</Text>
        </TouchableOpacity>

        {/* Nút Check Answers (Chỉ bật khi đã nối hết sạch đáp án) */}
        <TouchableOpacity
          onPress={() => onComplete?.(accuracy)}
          disabled={!isComplete}
          activeOpacity={0.8}
          className={`h-[56px] flex-[2] items-center justify-center rounded-2xl ${
            isComplete ? 'bg-[#E11D48]' : 'bg-[#f43f5e] opacity-80'
          }`}
        >
          <Text className="text-[16px] font-bold uppercase text-white">Check Answers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
