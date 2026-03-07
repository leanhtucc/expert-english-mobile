import { ChevronLeft } from 'lucide-react-native';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SurveyHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({ currentStep, totalSteps, onBack }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="px-5 pb-4 pt-3">
      <View className="mb-3 flex-row items-center">
        <TouchableOpacity
          onPress={onBack}
          className="mr-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft size={22} color="#1a1a1a" />
        </TouchableOpacity>

        <Text className="flex-1 text-[11px] font-semibold uppercase text-[#C8102E]">
          STEP {currentStep} OF {totalSteps}
        </Text>

        <Text className="text-[11px] font-bold uppercase text-gray-400">
          {Math.round(progress)}% COMPLETE
        </Text>
      </View>

      <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
        <View className="h-full rounded-full bg-[#C8102E]" style={{ width: `${progress}%` }} />
      </View>
    </View>
  );
};
