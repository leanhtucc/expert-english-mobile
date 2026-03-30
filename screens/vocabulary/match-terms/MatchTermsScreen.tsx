import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckResultButton from '../components/CheckResultButton';
import { HintButton } from '../components/HintButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { TermItem } from './TermItem';
import { MatchPair, useMatchTerms } from './useMatchTerms';

interface MatchTermsScreenProps {
  pairs: MatchPair[];
  onComplete?: (score: number) => void;
  onBack?: () => void;
  onClose?: () => void;
  onOpenHint?: () => void;
  progress?: { current: number; total: number };
}

// Hàm Shuffle độc lập để đảm bảo tính ngẫu nhiên
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const MatchTermsScreen: React.FC<MatchTermsScreenProps> = ({
  pairs,
  onComplete,
  onBack,
  progress: externalProgress,
  onClose,
  onOpenHint,
}) => {
  const insets = useSafeAreaInsets();

  // Logic xử lý nối từ từ Hook
  const {
    selectedTerm,
    selectedDefinition,
    matchedPairs,
    wrongPair,
    progress: internalProgress,
    isComplete,
    handleSelectTerm,
    handleSelectDefinition,
    handleNext,
  } = useMatchTerms({
    pairs,
  });

  // Quản lý trạng thái Gợi ý & Chuyển cảnh
  const [localWrongAttempts, setLocalWrongAttempts] = useState(0);
  const [isHintUsed, setIsHintUsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrongReportedRef = useRef<string | null>(null);

  // Theo dõi khi người dùng nối sai
  useEffect(() => {
    if (wrongPair) {
      const pairId = `${wrongPair.termId}-${wrongPair.defId}`;
      if (wrongReportedRef.current !== pairId) {
        setLocalWrongAttempts(prev => prev + 1);
        wrongReportedRef.current = pairId;
      }
    }
  }, [wrongPair]);

  const handlePressHint = () => {
    setIsHintUsed(true);
    if (onOpenHint) onOpenHint();
  };

  const handleConfirmCompletion = () => {
    setIsTransitioning(true);
    handleNext();
    onComplete?.(100);
  };

  // 🌟 Tạo danh sách đã xào bài (Chỉ chạy lại khi pairs thay đổi)
  const shuffledTerms = useMemo(() => shuffleArray(pairs), [pairs]);
  const shuffledDefinitions = useMemo(() => shuffleArray(pairs), [pairs]);

  const displayProgress = externalProgress || internalProgress;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['left', 'right', 'top']}>
      <View className="z-10 w-full bg-white">
        <ScreenHeader
          title="Vocabulary Quiz"
          subtitle="MATCHING TERMS"
          onBack={onBack}
          onClose={onClose}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="w-full px-5 pt-4 pb-2">
          <ProgressBar
            current={displayProgress.current}
            total={displayProgress.total}
            variant="quiz"
          />
        </View>

        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER SECTION CÓ NÚT GỢI Ý INLINE */}
          <View className="flex-row items-start justify-between px-5 py-6">
            <View className="flex-1 pr-4">
              <Text className="mb-1.5 text-[22px] font-black tracking-tight text-[#1E293B]">
                Connect the Terms
              </Text>
              <Text className="text-[14.5px] leading-5 text-[#64748B]">
                Tap a word on the left, then tap its meaning on the right.
              </Text>
            </View>

            {localWrongAttempts >= 2 && (
              <View className="pt-1">
                <HintButton.Inline isUsed={isHintUsed} onPress={handlePressHint} />
              </View>
            )}
          </View>

          {/* GRID NỐI TỪ */}
          <View className="w-full flex-row px-4">
            {/* CỘT TRÁI - TERMS */}
            <View className="flex-1 pr-2">
              {shuffledTerms.map(item => (
                <TermItem
                  key={`term-${item.id}`}
                  text={item.term}
                  status={
                    matchedPairs.includes(item.id)
                      ? 'matched'
                      : wrongPair?.termId === item.id
                        ? 'wrong'
                        : selectedTerm === item.id
                          ? 'selected'
                          : 'none'
                  }
                  onPress={() => handleSelectTerm(item.id)}
                />
              ))}
            </View>

            {/* CỘT PHẢI - DEFINITIONS */}
            <View className="flex-1 pl-2">
              {shuffledDefinitions.map(item => (
                <TermItem
                  key={`def-${item.id}`}
                  text={item.definition}
                  status={
                    matchedPairs.includes(item.id)
                      ? 'matched'
                      : wrongPair?.defId === item.id
                        ? 'wrong'
                        : selectedDefinition === item.id
                          ? 'selected'
                          : 'none'
                  }
                  onPress={() => handleSelectDefinition(item.id)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* FOOTER - NÚT SUBMIT XÁM KHI CHƯA HOÀN THÀNH */}
      {!isComplete && (
        <View className="absolute bottom-5 left-0 right-0 z-40 w-full">
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="w-full border-t border-slate-200 bg-white px-5 pt-4"
          >
            <PrimaryButton label="Submit Answer" onPress={() => {}} disabled={true} />
          </View>
        </View>
      )}

      {/* MODAL KẾT QUẢ KHI THÀNH CÔNG */}
      {isComplete && !isTransitioning && (
        <CheckResultButton
          status="correct"
          text="Next Question"
          description="Great job! You matched all the terms correctly."
          proTip="Matching terms helps strengthen the connection between word forms and their meanings in long-term memory."
          onPress={handleConfirmCompletion}
        />
      )}
    </SafeAreaView>
  );
};
