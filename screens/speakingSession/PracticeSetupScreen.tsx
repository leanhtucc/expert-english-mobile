import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/navigation';
import { PracticeMode, ScenarioPreview } from '@/types/speaking.types';

import { ModeSelector } from './components/ModeSelector';
import { ScenarioCard } from './components/ScenarioCard';

type PracticeSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PracticeSetup'>;

const mockScenario: ScenarioPreview = {
  role: 'PROJECT MANAGER',
  question: 'Could you walk me through the Q3 financial projections for the manufacturing sector?',
  progress: 85,
  exampleAnswer:
    '"Sure, I\'ve prepared a deck highlighting key projections like revenue growth and risk mitigation strategies."',
};

export const PracticeSetupScreen: React.FC = () => {
  const navigation = useNavigation<PracticeSetupScreenNavigationProp>();
  const [selectedMode, setSelectedMode] = useState<PracticeMode>('dual-explorer');

  const handleStartSpeaking = () => {
    navigation.navigate('SpeakingConversation', { mode: selectedMode });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-200 px-5 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3 h-10 w-10 items-center justify-center"
          >
            <Text className="text-2xl text-gray-700">←</Text>
          </TouchableOpacity>
          <Text className="flex-1 text-xl font-bold text-gray-800">Practice Setup</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Selector */}
        <View className="mb-6">
          <Text className="mb-3 text-sm font-semibold text-gray-700">Select Practice Mode</Text>
          <ModeSelector selectedMode={selectedMode} onModeChange={setSelectedMode} />
        </View>

        {/* Scenario Preview */}
        <View className="mb-6">
          <Text className="mb-3 text-sm font-semibold text-gray-700">Scenario Preview</Text>
          <ScenarioCard scenario={mockScenario} />
        </View>

        {/* Mode Description */}
        <View className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <Text className="text-sm leading-6 text-blue-800">
            {selectedMode === 'dual-explorer' &&
              'Practice speaking in both languages with real-time translations.'}
            {selectedMode === 'english-master' &&
              'Focus on improving your English pronunciation and fluency.'}
            {selectedMode === 'translation-hero' &&
              'Master translating between English and Vietnamese.'}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="border-t border-gray-200 bg-white px-5 py-4">
        <TouchableOpacity
          onPress={handleStartSpeaking}
          className="items-center rounded-full bg-red-500 py-4 shadow-lg"
          activeOpacity={0.8}
        >
          <Text className="text-lg font-bold text-white">Start Speaking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
