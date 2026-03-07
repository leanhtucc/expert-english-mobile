import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LEVEL_OPTIONS } from '../survey.constants';
import type { EnglishLevel, StepProps } from '../survey.types';
import { PrimaryButton } from './PrimaryButton';
import { SelectableCard } from './SelectableCard';
import { SurveyHeader } from './SurveyHeader';

export const Step3EnglishLevel: React.FC<StepProps> = ({
  answers,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const selected = answers.level;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <SurveyHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-2xl font-bold text-gray-900">
          {"What's your current English level?"}
        </Text>
        <Text className="mb-6 text-sm leading-5 text-gray-500">
          Choose the level that best describes your ability to communicate.
        </Text>

        {LEVEL_OPTIONS.map(option => (
          <SelectableCard
            key={option.value}
            {...option}
            isSelected={selected === option.value}
            onSelect={() => onUpdate({ level: option.value as EnglishLevel })}
          />
        ))}
      </ScrollView>

      <View className="pb-8 pt-2">
        <PrimaryButton label="Continue" onPress={onNext} disabled={!selected} />
      </View>
    </SafeAreaView>
  );
};
