import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

// paddingTop removed from ScreenHeader; use SafeAreaView in parent screen
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
    handleSelectAnswer,
    handleNext,
  } = useMultipleChoice({
    questions,
    onComplete,
  });

  if (!currentQuestion) {
    return null;
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <ScreenHeader
        title="Word Meaning"
        subtitle="Multiple Choice"
        onBack={onBack}
        onClose={onClose}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress */}
        <ProgressBar current={progress.current} total={progress.total} className="mb-6" />

        {/* Question Card */}
        <QuestionCard
          word={currentQuestion.word}
          question={currentQuestion.question}
          className="mb-6"
        />

        {/* Options */}
        <View className="mb-6">
          {currentQuestion.options.map((option, index) => (
            <OptionItem
              key={index}
              letter={optionLetters[index]}
              text={option}
              isSelected={selectedAnswer === option}
              isCorrect={option === currentQuestion.correctAnswer}
              isAnswered={isAnswered}
              onPress={() => handleSelectAnswer(option)}
            />
          ))}
        </View>
      </ScrollView>
      {/* Next Button fixed at bottom */}
      {isAnswered && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 16,
            paddingBottom: insets.bottom,
            backgroundColor: 'rgba(250,250,250,0.96)',
          }}
        >
          <PrimaryButton label={isLastQuestion ? 'Finish' : 'Next Question'} onPress={handleNext} />
        </View>
      )}
    </SafeAreaView>
  );
};
