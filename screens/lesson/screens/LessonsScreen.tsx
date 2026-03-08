import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';

import { ModuleCard } from '../components';
import { MOCK_MODULES } from '../constants';
import type { LessonItem } from '../types';

export const LessonsScreen: React.FC = () => {
  const handleLessonPress = (lesson: LessonItem) => {
    // TODO: navigate to lesson detail
    console.log('Start lesson:', lesson.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 pb-4 pt-3">
        <ThemedText className="text-2xl font-extrabold tracking-tight text-gray-900">
          Lessons
        </ThemedText>
        <ThemedText className="mt-0.5 text-[13px] text-gray-500">
          {MOCK_MODULES.length} modules
        </ThemedText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 96 }}
      >
        {MOCK_MODULES.map(mod => (
          <ModuleCard key={mod.id} module={mod} onLessonPress={handleLessonPress} />
        ))}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};
