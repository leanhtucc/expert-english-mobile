import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import IconNextButtonBlack from '@/assets/svgs/output/IconNextButtonBlack';

import CheckResultButton from '../components/CheckResultButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenHeader } from '../components/ScreenHeader';
import { OptionItem } from './OptionItem';
import { QuestionCard } from './QuestionCard';
import { MultipleChoiceQuestion, useMultipleChoice } from './useMultipleChoice';

interface MultipleChoiceScreenProps {
  questions: MultipleChoiceQuestion[];
  onComplete?: (score: number) => void;
  onBack?: () => void;
  onClose?: () => void;
}

export const MultipleChoiceScreen: React.FC<MultipleChoiceScreenProps> = ({
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
    isLastQuestion,
    progress,
    isCorrect,
    handleSelectAnswer,
    handleNext,
  } = useMultipleChoice({
    questions,
    onComplete,
  });

  if (!currentQuestion) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['left', 'right']}>
      <View className="w-full">
        <ScreenHeader
          title="Word Meaning"
          subtitle="Multiple Choice"
          onBack={onBack}
          onClose={onClose}
        />
      </View>

      <View className="flex-1 bg-[#F8FAFC]">
        <View className="w-full px-5 pt-4">
          <View className="mb-6">
            <ProgressBar current={progress.current} total={progress.total} />
          </View>
        </View>

        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <QuestionCard word={currentQuestion.word} question={currentQuestion.question} />
          </View>
          <View className="w-full">
            {currentQuestion.options.map((option, index) => (
              <OptionItem
                key={index}
                text={option}
                isSelected={selectedAnswer === option}
                isCorrect={option === currentQuestion.correctAnswer}
                isAnswered={isAnswered}
                onPress={() => handleSelectAnswer(option)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="absolute bottom-[-25px] left-0 right-0 w-full">
        {!isAnswered ? (
          <View
            style={{ paddingBottom: Math.max(insets.bottom, 16) }}
            className="w-full border-t border-slate-200 bg-white px-3 pt-2"
          >
            <PrimaryButton
              label="CHECK ANSWER"
              onPress={handleNext}
              disabled={!selectedAnswer}
              rightIcon={<IconNextButtonBlack width={20} height={20} />}
            />
          </View>
        ) : (
          <CheckResultButton
            status={isCorrect ? 'correct' : 'wrong'}
            text={isLastQuestion ? 'FINISH' : 'NEXT QUESTION'}
            showIconNext={true}
            onPress={handleNext}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
