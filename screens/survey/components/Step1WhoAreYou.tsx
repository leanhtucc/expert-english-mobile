import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROLE_OPTIONS } from '../survey.constants';
import type { StepProps, UserRole } from '../survey.types';
import { PrimaryButton } from './PrimaryButton';
import { SelectableCard } from './SelectableCard';
import { SurveyHeader } from './SurveyHeader';

export const Step1WhoAreYou: React.FC<StepProps> = ({
  answers,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const selected = answers.role;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <SurveyHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-2xl font-bold text-gray-900">Who are you?</Text>
        <Text className="mb-6 text-sm leading-5 text-gray-500">
          Select your current role so we can personalize your learning path.
        </Text>

        {ROLE_OPTIONS.map(option => (
          <SelectableCard
            key={option.value}
            {...option}
            isSelected={selected === option.value}
            onSelect={() => onUpdate({ role: option.value as UserRole })}
          />
        ))}
      </ScrollView>

      <View className="pb-8 pt-2">
        <PrimaryButton label="Continue" onPress={onNext} disabled={!selected} />
        {!selected && (
          <Text className="mt-3 text-center text-xs text-gray-400">
            Step {currentStep} of {totalSteps} • Selection Required
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
