import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconBackButton, IconCupGoat, IconPLay, IconVoiceBlack } from '@/components/icon';
import { RootStackParamList } from '@/navigation';
import { PracticeMode, ScenarioPreview } from '@/types/speaking.types';

import { ModeSelector } from './components/ModeSelector';
import { ScenarioCard } from './components/ScenarioCard';
import { WaveformAnimation } from './components/WaveformAnimation';

type PracticeSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PracticeSetup'>;

const mockScenario: ScenarioPreview = {
  role: 'PROJECT MANAGER',
  question: 'Could you walk me through the Q3 financial projections for the manufacturing sector?',
  translation: 'Bạn có thể giải thích cho tôi về dự báo tài chính Q3 cho lĩnh vực sản xuất không?',
  progress: 85,
  exampleAnswer:
    '"Sure, I\'ve prepared a deck highlighting key projections like revenue growth and risk mitigation strategies."',
  exampleAnswerTranslation:
    '"Chắc chắn rồi, tôi đã chuẩn bị một bản trình bày nêu bật các dự báo chính như tăng trưởng doanh thu và các chiến lược giảm thiểu rủi ro."',
};

export const PracticeSetupScreen: React.FC = () => {
  const navigation = useNavigation<PracticeSetupScreenNavigationProp>();
  const [selectedMode, setSelectedMode] = useState<PracticeMode>('dual-explorer');
  const [isRecording, setIsRecording] = useState(false);

  const handleStartSpeaking = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      // Navigate to feedback screen after recording stops
      setTimeout(() => {
        navigation.navigate('AIFeedback', {
          userAnswer: 'Mock recorded answer from user',
          mode: selectedMode,
        });
      }, 500);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="mt-5 border-b border-gray-200 px-4 py-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-8 w-8 items-center justify-center rounded-full bg-gray-100"
          >
            <IconBackButton width={15} height={15} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Practice Setup</Text>
          <View className="h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <IconCupGoat width={20} height={20} />
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Selector */}
        <View className="mb-6">
          <View className="mb-4 flex-row items-center justify-center">
            <View className="h-1 w-16 bg-red-500" />
            <Text className="mx-3 text-sm font-bold tracking-wider text-red-600">QUEST MODE</Text>
            <View className="h-1 w-16 bg-red-500" />
          </View>
          <ModeSelector selectedMode={selectedMode} onModeChange={setSelectedMode} />
        </View>

        {/* Scenario Preview */}
        <View className="mb-6">
          <ScenarioCard scenario={mockScenario} mode={selectedMode} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="bg-white px-5 pb-8 pt-6">
        {/* Waveform Animation */}
        {isRecording && (
          <View className="mb-4 items-center">
            <WaveformAnimation isRecording={isRecording} />
          </View>
        )}

        {/* Voice Recorder Button */}
        <View className="items-center pb-4">
          <TouchableOpacity
            onPress={handleStartSpeaking}
            className="h-16 w-16 items-center justify-center rounded-full bg-red-500 shadow-lg"
            activeOpacity={0.8}
          >
            {isRecording ? (
              <IconVoiceBlack width={26} height={26} color="white" />
            ) : (
              <IconPLay width={16} height={16} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
