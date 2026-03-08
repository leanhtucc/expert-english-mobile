import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '../components/PrimaryButton';
import { SelectableCard } from '../components/SelectableCard';
import { LEVEL_OPTIONS } from '../constants/surveyConstants';
import type { EnglishLevel, StepProps } from '../types/surveyTypes';

export const Step3EnglishLevel: React.FC<StepProps> = ({ answers, onUpdate, onNext }) => {
  const selected = answers.level;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
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
