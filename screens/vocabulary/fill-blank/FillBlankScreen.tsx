import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconNextButtonBlack } from '@/components/icon';

import { CheckResultButton } from '../components';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { AnswerInput } from './AnswerInput';
import { QuestionCard } from './QuestionCard';
import { FillBlankQuestion, useFillBlank } from './useFillBlank';

interface FillBlankScreenProps {
  questions: FillBlankQuestion[];
  onComplete?: (score: number) => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const FillBlankScreen: React.FC<FillBlankScreenProps> = ({
  questions,
  onComplete,
  onBack,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const {
    currentQuestion,
    selectedAnswer,
    isAnswered,
    isCorrect,
    isLastQuestion,
    sentenceParts,
    progress,
    handleSelectAnswer,
    handleNext,
  } = useFillBlank({
    questions,
    onComplete,
  });

  if (!currentQuestion) return null;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      {/* 1. HEADER */}
      <View className="w-full bg-white">
        <ScreenHeader
          title="Fill in the Blank"
          subtitle="Complete the sentence"
          onBack={onBack}
          onClose={onClose}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        {/* 2. PROGRESS BAR */}
        <View className="w-full px-5 pt-4 pb-5">
          <ProgressBar current={progress.current} total={progress.total} />
        </View>

        {/* 3. CONTENT AREA */}
        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-6 w-full">
            <QuestionCard
              beforeBlank={sentenceParts.before}
              afterBlank={sentenceParts.after}
              selectedAnswer={selectedAnswer || undefined}
              isAnswered={isAnswered}
              isCorrect={isCorrect}
              hint={currentQuestion.hint}
            />
          </View>

          <View className="w-full">
            <AnswerInput
              options={currentQuestion.options}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentQuestion.correctAnswer}
              isAnswered={isAnswered} // Khoá không cho bấm sau khi đã submit
              onSelectAnswer={handleSelectAnswer}
            />
          </View>
        </ScrollView>
      </View>

      {/* 4. BOTTOM BUTTON */}
      <View className="absolute bottom-[-25px] left-0 right-0 w-full">
        {!isAnswered ? (
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="w-full border-t border-slate-200 bg-white px-5 pt-4"
          >
            <PrimaryButton
              label="Check Answer"
              onPress={handleNext}
              disabled={!selectedAnswer}
              rightIcon={<IconNextButtonBlack width={20} height={20} />}
            />
          </View>
        ) : (
          <CheckResultButton
            status={isCorrect ? 'correct' : 'wrong'}
            text={isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            onPress={handleNext}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FillBlankScreen;
