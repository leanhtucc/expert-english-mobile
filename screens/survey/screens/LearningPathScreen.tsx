import { ArrowRight } from 'lucide-react-native';

import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  IconAttachments,
  IconBackButton,
  IconClock,
  IconLearningTip,
  IconNoteSuggesstion,
  IconVoice,
} from '@/components/icon';
import { RootStackParamList } from '@/navigation';

type Duration = 'fast' | 'standard' | 'long';

const DURATIONS: { key: Duration; label: string; sub: string }[] = [
  { key: 'fast', label: 'Fast', sub: '2 weeks' },
  { key: 'standard', label: 'Standard', sub: '4 weeks' },
  { key: 'long', label: 'Long', sub: '8 weeks' },
];

const SUGGESTED_PROMPTS = [
  'English communication for Vietravel project with customers',
  'Preparing for software engineer interviews',
];

export const LearningPathScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [focusText, setFocusText] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<Duration>('standard');

  const canGenerate = focusText.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center border-b border-gray-100 px-5 py-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white"
        >
          <IconBackButton width={18} height={18} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-base font-bold text-gray-900">Learning Path</Text>
        <View className="w-9" />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title section */}
        <Text className="mb-1.5 text-[22px] font-extrabold text-gray-900">
          Personalize your journey
        </Text>
        <Text className="mb-6 text-sm leading-5 text-gray-500">
          Describe your learning goals or use a template to start.
        </Text>

        {/* Custom Focus */}
        <View className="mb-2.5 flex-row items-center gap-1.5">
          <IconNoteSuggesstion width={16} height={16} />
          <Text className="text-[13px] font-bold text-gray-700">Custom Focus</Text>
        </View>
        <View className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-3.5">
          <TextInput
            className="text-sm leading-[22px] text-gray-900"
            style={{ minHeight: 110 }}
            multiline
            numberOfLines={5}
            placeholder="e.g. English for professional communication in corporate negotiations..."
            placeholderTextColor="#9ca3af"
            value={focusText}
            onChangeText={setFocusText}
            textAlignVertical="top"
          />
          <View className="mt-2 flex-row justify-end gap-2">
            <TouchableOpacity className="h-[34px] w-[34px] items-center justify-center rounded-full border border-gray-200 bg-white">
              <IconAttachments width={18} height={18} />
            </TouchableOpacity>
            <TouchableOpacity className="h-[34px] w-[34px] items-center justify-center rounded-full border border-gray-200 bg-white">
              <IconVoice width={18} height={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested Prompts */}
        <View className="mb-2.5 flex-row items-center gap-1.5">
          <IconLearningTip width={16} height={16} />
          <Text className="text-[13px] font-bold text-gray-700">Suggested Prompts</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingBottom: 4, marginBottom: 24 }}
        >
          {SUGGESTED_PROMPTS.map(prompt => (
            <TouchableOpacity
              key={prompt}
              className="max-w-[240px] rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2"
              onPress={() => setFocusText(prompt)}
              activeOpacity={0.75}
            >
              <Text className="text-xs leading-[18px] text-gray-700">{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Course Duration */}
        <View className="mb-2.5 flex-row items-center gap-1.5">
          <IconClock width={16} height={16} />
          <Text className="text-[13px] font-bold text-gray-700">Course Duration</Text>
        </View>
        <View className="flex-row gap-2.5">
          {DURATIONS.map(d => {
            const active = selectedDuration === d.key;
            return (
              <TouchableOpacity
                key={d.key}
                className={`flex-1 items-center rounded-[14px] border py-3.5 ${
                  active ? 'border-[#C8102E] bg-white' : 'border-transparent bg-gray-100'
                }`}
                onPress={() => setSelectedDuration(d.key)}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-sm font-bold ${active ? 'text-[#C8102E]' : 'text-gray-700'}`}
                >
                  {d.label}
                </Text>
                <Text
                  className={`mt-0.5 text-[11px] ${active ? 'text-[#C8102E]' : 'text-gray-400'}`}
                >
                  {d.sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View className="border-t border-gray-100 bg-white px-5 pb-6 pt-3">
        <TouchableOpacity
          className={`flex-row items-center justify-center rounded-full py-4 ${
            canGenerate ? 'bg-[#C8102E]' : 'bg-gray-300'
          }`}
          disabled={!canGenerate}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AIRoadmapLoading')}
          style={
            canGenerate
              ? {
                  shadowColor: '#C8102E',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 12,
                  elevation: 6,
                }
              : undefined
          }
        >
          <Text className="text-base font-bold tracking-wide text-white">Generate Course</Text>
          <View className="ml-0 h-8 w-8 items-center justify-center">
            <ArrowRight size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
