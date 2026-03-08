import { CheckCircle2, ChevronDown, ChevronUp, Circle, Lock } from 'lucide-react-native';

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SKILL_COLOR, SKILL_LABEL } from '../constants';
import type { LessonItem, Module } from '../types';

interface ModuleCardProps {
  module: Module;
  onLessonPress?: (lesson: LessonItem) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onLessonPress }) => {
  const [expanded, setExpanded] = useState(module.status === 'in_progress');

  const isLocked = module.status === 'locked';
  const isCompleted = module.status === 'completed';
  const progressPct =
    module.totalLessons > 0 ? (module.completedLessons / module.totalLessons) * 100 : 0;

  const statusLabel = isCompleted
    ? 'Completed'
    : module.status === 'in_progress'
      ? 'In Progress'
      : isLocked
        ? 'Locked'
        : 'Available';

  const statusColor = isCompleted
    ? '#059669'
    : module.status === 'in_progress'
      ? module.color
      : isLocked
        ? '#9CA3AF'
        : '#D97706';

  return (
    <View style={[styles.card, isLocked && styles.cardLocked]}>
      {/* Header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !isLocked && setExpanded(v => !v)}
        style={styles.header}
      >
        {/* Module number badge */}
        <View style={[styles.badge, { backgroundColor: isLocked ? '#E5E7EB' : module.color }]}>
          <Text style={[styles.badgeText, isLocked && { color: '#9CA3AF' }]}>
            {String(module.number).padStart(2, '0')}
          </Text>
        </View>

        {/* Info */}
        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.moduleTitle, isLocked && styles.lockedText]} numberOfLines={1}>
              {module.title}
            </Text>
            {isLocked ? (
              <Lock size={14} color="#9CA3AF" />
            ) : expanded ? (
              <ChevronUp size={16} color="#6B7280" />
            ) : (
              <ChevronDown size={16} color="#6B7280" />
            )}
          </View>

          <Text style={styles.moduleDesc} numberOfLines={1}>
            {module.description}
          </Text>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <View
              style={[
                styles.levelPill,
                { backgroundColor: isLocked ? '#F3F4F6' : module.color + '18' },
              ]}
            >
              <Text style={[styles.levelText, { color: isLocked ? '#9CA3AF' : module.color }]}>
                {module.level}
              </Text>
            </View>
            <Text style={styles.metaDivider}>·</Text>
            <Text style={styles.metaText}>
              {module.completedLessons}/{module.totalLessons} lessons
            </Text>
            <Text style={styles.metaDivider}>·</Text>
            <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
          </View>

          {/* Progress bar */}
          {!isLocked && (
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPct}%` as any, backgroundColor: module.color },
                ]}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Lessons list */}
      {expanded && !isLocked && (
        <View style={styles.lessonsList}>
          <View style={styles.divider} />
          {module.lessons.map((lesson, idx) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              isLast={idx === module.lessons.length - 1}
              accentColor={module.color}
              onPress={() => lesson.status !== 'locked' && onLessonPress?.(lesson)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

// ─────────────────────────────────────────────
// LessonRow
// ─────────────────────────────────────────────

interface LessonRowProps {
  lesson: LessonItem;
  isLast: boolean;
  accentColor: string;
  onPress?: () => void;
}

const LessonRow: React.FC<LessonRowProps> = ({ lesson, isLast, accentColor, onPress }) => {
  const isLocked = lesson.status === 'locked';
  const isCompleted = lesson.status === 'completed';
  const skillColor = SKILL_COLOR[lesson.skill] ?? accentColor;

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 1 : 0.75}
      onPress={!isLocked ? onPress : undefined}
      style={[styles.lessonRow, isLast && { borderBottomWidth: 0 }]}
    >
      {/* Status icon */}
      <View style={styles.lessonIcon}>
        {isCompleted ? (
          <CheckCircle2 size={18} color="#059669" fill="#059669" />
        ) : isLocked ? (
          <Lock size={16} color="#D1D5DB" />
        ) : (
          <Circle size={18} color={accentColor} />
        )}
      </View>

      {/* Content */}
      <View style={styles.lessonContent}>
        <Text style={[styles.lessonTitle, isLocked && styles.lockedText]} numberOfLines={1}>
          {lesson.title}
        </Text>
        <View style={styles.lessonMeta}>
          <View style={[styles.skillPill, { backgroundColor: skillColor + '18' }]}>
            <Text style={[styles.skillText, { color: skillColor }]}>
              {SKILL_LABEL[lesson.skill]}
            </Text>
          </View>
          <Text style={styles.durationText}>{lesson.duration}</Text>
        </View>
      </View>

      {/* XP */}
      <View style={[styles.xpBadge, isLocked && styles.xpBadgeLocked]}>
        <Text style={[styles.xpText, isLocked && styles.xpTextLocked]}>+{lesson.xp} XP</Text>
      </View>
    </TouchableOpacity>
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  cardLocked: {
    backgroundColor: '#FAFAFA',
    borderColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 14,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  moduleTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
  },
  moduleDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  levelPill: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metaDivider: {
    color: '#D1D5DB',
    fontSize: 13,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressTrack: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  lockedText: {
    color: '#9CA3AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  lessonsList: {
    overflow: 'hidden',
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    gap: 12,
  },
  lessonIcon: {
    width: 24,
    alignItems: 'center',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillPill: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  skillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  durationText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  xpBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  xpBadgeLocked: {
    backgroundColor: '#F3F4F6',
  },
  xpText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  xpTextLocked: {
    color: '#D1D5DB',
  },
});
