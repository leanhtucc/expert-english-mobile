import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { PracticeMode } from '@/types/speaking.types';

interface ModeSelectorProps {
  selectedMode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
}

const modes: { value: PracticeMode; label: string; subtitle: string }[] = [
  { value: 'dual-explorer', label: 'Dual Explorer', subtitle: 'EN & VN' },
  { value: 'english-master', label: 'English Master', subtitle: 'Only EN' },
  { value: 'translation-hero', label: 'Translation Hero', subtitle: 'Only VN' },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  return (
    <View className="mb-6 flex-row rounded-3xl border-2 border-gray-300 bg-white p-2">
      {modes.map(mode => (
        <TouchableOpacity
          key={mode.value}
          onPress={() => onModeChange(mode.value)}
          className={`mx-1 flex-1 items-center justify-center rounded-2xl py-5 ${
            selectedMode === mode.value ? 'border-2 border-red-600 bg-white' : 'bg-gray-50'
          }`}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            className={`mb-1 text-[10px] font-bold ${
              selectedMode === mode.value ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            {mode.label}
          </Text>
          <Text
            numberOfLines={1}
            className={`text-[10px] font-medium ${
              selectedMode === mode.value ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            {mode.subtitle}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
