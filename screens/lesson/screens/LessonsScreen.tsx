import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ModuleCard } from '../components';
import { MOCK_MODULES } from '../constants';
import type { LessonItem } from '../types';

export const LessonsScreen: React.FC = () => {
  const handleLessonPress = (lesson: LessonItem) => {
    // TODO: navigate to lesson detail
    console.log('Start lesson:', lesson.id);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Lessons</Text>
        <Text style={styles.subtitle}>{MOCK_MODULES.length} modules</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {MOCK_MODULES.map(mod => (
          <ModuleCard key={mod.id} module={mod} onLessonPress={handleLessonPress} />
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  list: {
    paddingTop: 4,
    paddingBottom: 100,
  },
});
