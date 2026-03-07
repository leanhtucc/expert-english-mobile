import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FIELD_OPTIONS } from '../survey.constants';
import type { StepProps, UserField } from '../survey.types';
import { PrimaryButton } from './PrimaryButton';
import { SelectableCard } from './SelectableCard';
import { SurveyHeader } from './SurveyHeader';

export const Step2SelectField: React.FC<StepProps> = ({
  answers,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const selected = answers.field;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <SurveyHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-2xl font-bold text-gray-900">Select your field</Text>
        <Text className="mb-6 text-sm leading-5 text-gray-500">
          {"We'll tailor your vocabulary and scenarios to your specific industry."}
        </Text>

        {FIELD_OPTIONS.map(option => (
          <SelectableCard
            key={option.value}
            {...option}
            isSelected={selected === option.value}
            onSelect={() => onUpdate({ field: option.value as UserField })}
          />
        ))}
      </ScrollView>

      <View className="pb-8 pt-2">
        <PrimaryButton label="Continue" onPress={onNext} disabled={!selected} />
      </View>
    </SafeAreaView>
  );
};
