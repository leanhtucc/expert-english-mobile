import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconBackButton, IconBackPage } from '@/components/icon';

interface SurveyHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({ currentStep, totalSteps, onBack }) => {
  const progress = (currentStep / totalSteps) * 100;
  const progressLabel = currentStep === 2 ? 'YOUR PROGRESS' : 'CURRENT PROGRESS';

  const BackButton = (
    <TouchableOpacity
      onPress={onBack}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      className="h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white"
    >
      {currentStep === 1 ? (
        <IconBackButton width={18} height={18} />
      ) : (
        <IconBackPage width={18} height={18} />
      )}
    </TouchableOpacity>
  );

  const ProgressBar = (
    <View className="h-1.5 overflow-hidden rounded-full bg-gray-200">
      <View className="h-full rounded-full bg-[#C8102E]" style={{ width: `${progress}%` }} />
    </View>
  );

  if (currentStep === 1) {
    return (
      <View className="px-5 pb-4 pt-3">
        {/* Row: back button only */}
        <View className="mb-3 flex-row items-center">{BackButton}</View>

        {/* Progress bar */}
        {ProgressBar}

        {/* Step label row below bar */}
        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-[11px] font-semibold uppercase text-[#C8102E]">
            STEP {currentStep} OF {totalSteps}
          </Text>
          <Text className="text-[11px] font-bold uppercase text-gray-400">
            {Math.round(progress)}% COMPLETE
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="px-5 pb-4 pt-3">
      {/* Row: back button + centered step label */}
      <View className="mb-3 flex-row items-center">
        {BackButton}
        <Text className="flex-1 text-center text-[13px] font-semibold text-gray-700">
          STEP {currentStep} OF {totalSteps}
        </Text>
        {/* Spacer to balance back button width */}
        <View style={{ width: 36 }} />
      </View>

      {/* Progress label + percentage */}
      <View className="mb-1.5 flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold uppercase text-[#C8102E]">{progressLabel}</Text>
        <Text className="text-[11px] font-bold uppercase text-gray-400">
          {Math.round(progress)}%
        </Text>
      </View>

      {/* Progress bar */}
      {ProgressBar}
    </View>
  );
};
