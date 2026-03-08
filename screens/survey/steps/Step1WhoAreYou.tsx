import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconFiledUser } from '@/components/icon';

import { PrimaryButton } from '../components/PrimaryButton';
import { SelectableCard } from '../components/SelectableCard';
import { ROLE_OPTIONS } from '../constants/surveyConstants';
import type { StepProps, UserRole } from '../types/surveyTypes';

export const Step1WhoAreYou: React.FC<StepProps> = ({
  answers,
  onUpdate,
  onNext,
  currentStep,
  totalSteps,
}) => {
  const selected = answers.role;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <IconFiledUser width={26} height={26} />
        </View>
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
