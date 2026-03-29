import React, { useEffect, useMemo, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
  progress?: { current: number; total: number };
}

export const MatchTermsScreen: React.FC<MatchTermsScreenProps> = ({
  pairs,
  onComplete,
  onBack,
  progress: externalProgress,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
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
    onComplete,
  });

  const wrongReportedRef = useRef<string | null>(null);

  // LOGIC: Khi user nối sai 1 cặp, bật Hint Flashcard nếu cần
  useEffect(() => {
    if (wrongPair) {
      const pairId = `${wrongPair.termId}-${wrongPair.defId}`;
      if (wrongReportedRef.current !== pairId) {
        onComplete?.(0); // Gọi báo lỗi cho Parent
        wrongReportedRef.current = pairId;
      }
    }
  }, [wrongPair, onComplete]);

  const shuffledDefinitions = useMemo(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [pairs]);

  const displayProgress = externalProgress || internalProgress;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]" edges={['left', 'right', 'top']}>
      {/* ... Toàn bộ phần UI giữ nguyên ... */}
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
          <View className="items-center px-5 py-6">
            <Text className="mb-2 text-[22px] font-black tracking-tight text-[#1E293B]">
              Connect the Terms
            </Text>
            <Text className="text-center text-[15px] text-slate-500">
              Tap a word on the left, then tap its meaning on the right.
            </Text>
          </View>

          <View className="w-full flex-row px-4">
            <View className="flex-1 pr-2">
              {pairs.map(item => (
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

      <View className="absolute bottom-0 left-0 right-0 z-40 w-full">
        <View
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
          className="w-full border-t border-slate-200 bg-white px-5 pt-4 shadow-[0_-4px_6px_rgba(0,0,0,0.05)]"
        >
          <PrimaryButton label="Submit Answer" onPress={handleNext} disabled={!isComplete} />
        </View>
      </View>
    </SafeAreaView>
  );
};
