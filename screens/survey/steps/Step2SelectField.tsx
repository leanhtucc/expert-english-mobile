import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../components/PrimaryButton';
import { SelectableCard } from '../components/SelectableCard';
import { FIELD_OPTIONS } from '../constants/surveyConstants';
import type { StepProps, UserField } from '../types/surveyTypes';

export const Step2SelectField: React.FC<StepProps & { surveyData?: any }> = ({
  answers,
  onUpdate,
  onNext,
  surveyData,
}) => {
  const selected = answers.field;

  const options =
    surveyData?.industries?.length > 0
      ? surveyData.industries.map((opt: any) => ({
          value: opt.value,
          title: opt.label,
        }))
      : FIELD_OPTIONS;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-2xl font-bold text-gray-900">Select your field</Text>
        <Text className="mb-6 text-sm leading-5 text-gray-500">
          {"We'll tailor your vocabulary and scenarios to your specific industry."}
        </Text>

        {options.map((option: any) => (
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
