import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IconCommunity } from '@/components/icon';

import { CATEGORY_COLOR } from '../constants';
import type { TodayFocusLesson } from '../types';

interface TodayFocusCardProps {
  lesson: TodayFocusLesson;
  onStartSession?: () => void;
}

export const TodayFocusCard: React.FC<TodayFocusCardProps> = ({ lesson, onStartSession }) => {
  const accentColor = CATEGORY_COLOR[lesson.category] ?? '#C8102E';

  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: accentColor + '26' }]}>
          <IconCommunity width={26} height={26} />
        </View>
        <View style={styles.labelWrap}>
          <Text style={[styles.category, { color: accentColor }]}>{lesson.categoryLabel}</Text>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{lesson.description}</Text>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        {lesson.extraParticipants !== undefined && (
          <View style={styles.pill}>
            <Text style={styles.pillText}>+{lesson.extraParticipants}</Text>
          </View>
        )}
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={onStartSession} activeOpacity={0.85} style={styles.btn}>
          <Text style={styles.btnText}>Start Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  labelWrap: {
    flex: 1,
  },
  category: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  lessonTitle: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
    color: '#111827',
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: '#6B7280',
    marginBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  btn: {
    borderRadius: 99,
    backgroundColor: '#C8102E',
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
});
