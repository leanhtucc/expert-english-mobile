import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconLearningTip } from '@/components/icon';

import { PrimaryButton } from '../components/PrimaryButton';
import { SelectableCard } from '../components/SelectableCard';
import { GOAL_OPTIONS } from '../constants/surveyConstants';
import type { DailyGoal, StepProps } from '../types/surveyTypes';

export const Step4DailyGoal: React.FC<StepProps> = ({ answers, onUpdate, onNext }) => {
  const selected = answers.dailyGoal;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
          Daily Learning Goal
        </Text>
        <Text className="mb-6 text-center text-sm leading-5 text-gray-500">
          How much time can you commit each day?
        </Text>

        {GOAL_OPTIONS.map(option => (
          <SelectableCard
            key={option.value}
            {...option}
            variant="centered"
            isSelected={String(selected) === option.value}
            onSelect={() => onUpdate({ dailyGoal: Number(option.value) as DailyGoal })}
          />
        ))}

        {/* Study tip */}
        <View className="mt-2 flex-row items-start rounded-2xl bg-red-50 p-4">
          <IconLearningTip width={20} height={20} />
          <Text className="ml-3 flex-1 text-xs leading-5 text-gray-600">
            {'"Short, daily practice sessions are 4x more effective than long weekly ones."'}
          </Text>
        </View>
      </ScrollView>

      <View className="pb-8 pt-2">
        <PrimaryButton label="Continue" onPress={onNext} disabled={!selected} />
      </View>
    </SafeAreaView>
  );
};
