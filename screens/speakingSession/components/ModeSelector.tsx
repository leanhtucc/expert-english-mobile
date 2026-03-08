import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { PracticeMode } from '@/types/speaking.types';

interface ModeSelectorProps {
  selectedMode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
}

const modes: { value: PracticeMode; label: string }[] = [
  { value: 'dual-explorer', label: 'Dual Explorer' },
  { value: 'english-master', label: 'English Master' },
  { value: 'translation-hero', label: 'Translation Hero' },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  return (
    <View className="mb-6 flex-row rounded-full bg-gray-100 p-1">
      {modes.map(mode => (
        <TouchableOpacity
          key={mode.value}
          onPress={() => onModeChange(mode.value)}
          className={`flex-1 items-center rounded-full py-3 ${
            selectedMode === mode.value ? 'bg-white shadow-sm' : ''
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              selectedMode === mode.value ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            {mode.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
