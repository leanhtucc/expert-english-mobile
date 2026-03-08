import { Lock, Play } from 'lucide-react-native';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { RoadmapItem as RoadmapItemType } from '../types';

interface RoadmapItemProps {
  item: RoadmapItemType;
  isLast?: boolean;
}

export const RoadmapItem: React.FC<RoadmapItemProps> = ({ item, isLast = false }) => {
  const isCompleted = item.status === 'completed';
  const isActive = item.status === 'active';
  const isLocked = item.status === 'locked';

  const dotBg: string = isCompleted || isActive ? '#C8102E' : '#D1D5DB';
  const labelColor: string = isActive ? '#C8102E' : isCompleted ? '#6B7280' : '#9CA3AF';
  const titleColor: string = isLocked ? '#9CA3AF' : '#111827';

  return (
    <View style={styles.row}>
      {/* Timeline column */}
      <View style={styles.timeline}>
        <View style={[styles.dot, { backgroundColor: dotBg }]}>
          {isCompleted && <Play size={10} color="#fff" fill="#fff" />}
          {isActive && <View style={styles.activeDotInner} />}
          {isLocked && <Lock size={11} color="#9CA3AF" />}
        </View>
        {!isLast && <View style={styles.connector} />}
      </View>

      {/* Card */}
      <View style={[styles.card, isActive && styles.cardActive]}>
        <Text style={[styles.label, { color: labelColor }]}>
          {item.dayLabel} � {item.dateLabel}
        </Text>
        <Text style={[styles.title, { color: titleColor }]}>{item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  timeline: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  connector: {
    flex: 1,
    width: 2,
    marginTop: 4,
    minHeight: 20,
    backgroundColor: '#E5E7EB',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardActive: {
    borderColor: '#C8102E',
    borderWidth: 1.5,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
});
