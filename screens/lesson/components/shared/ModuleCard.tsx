import { CheckCircle2, ChevronDown, ChevronUp, Circle, Lock } from 'lucide-react-native';

import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

import { SKILL_COLOR, SKILL_LABEL } from '../../constants';
import type { LessonItem, Module } from '../../types';

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

  const statusColorClass = isCompleted
    ? 'text-green-600'
    : module.status === 'in_progress'
      ? 'text-blue-600'
      : isLocked
        ? 'text-gray-400'
        : 'text-amber-600';

  return (
    <View
      className={`mx-5 mb-4 overflow-hidden rounded-2xl border ${
        isLocked ? 'border-gray-200 bg-gray-50' : 'border-gray-100 bg-white shadow-sm'
      }`}
    >
      {/* Header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !isLocked && setExpanded(v => !v)}
        className="flex-row items-start gap-3.5 p-4"
      >
        {/* Module number badge */}
        <View
          className={`mt-0.5 h-10 w-10 items-center justify-center rounded-xl ${
            isLocked ? 'bg-gray-200' : ''
          }`}
          style={!isLocked ? { backgroundColor: module.color } : undefined}
        >
          <ThemedText
            className={`text-[13px] font-bold ${isLocked ? 'text-gray-400' : 'text-white'}`}
          >
            {String(module.number).padStart(2, '0')}
          </ThemedText>
        </View>

        {/* Info */}
        <View className="flex-1">
          <View className="mb-1 flex-row items-center justify-between">
            <ThemedText
              className={`mr-2 flex-1 text-[15px] font-bold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}
              numberOfLines={1}
            >
              {module.title}
            </ThemedText>
            {isLocked ? (
              <Lock size={14} color="#9CA3AF" />
            ) : expanded ? (
              <ChevronUp size={16} color="#6B7280" />
            ) : (
              <ChevronDown size={16} color="#6B7280" />
            )}
          </View>

          <ThemedText className="mb-2 text-xs text-gray-500" numberOfLines={1}>
            {module.description}
          </ThemedText>

          {/* Meta row */}
          <View className="mb-2 flex-row flex-wrap items-center gap-1">
            <View
              className="rounded-md px-2 py-0.5"
              style={{
                backgroundColor: isLocked ? '#F3F4F6' : module.color + '18',
              }}
            >
              <ThemedText
                className="text-[11px] font-semibold"
                style={{ color: isLocked ? '#9CA3AF' : module.color }}
              >
                {module.level}
              </ThemedText>
            </View>
            <ThemedText className="text-[13px] text-gray-300">·</ThemedText>
            <ThemedText className="text-xs text-gray-500">
              {module.completedLessons}/{module.totalLessons} lessons
            </ThemedText>
            <ThemedText className="text-[13px] text-gray-300">·</ThemedText>
            <ThemedText className={`text-xs font-semibold ${statusColorClass}`}>
              {statusLabel}
            </ThemedText>
          </View>

          {/* Progress bar */}
          {!isLocked && (
            <View className="h-1 overflow-hidden rounded-full bg-gray-100">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: module.color,
                }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Lessons list */}
      {expanded && !isLocked && (
        <View className="overflow-hidden">
          <View className="h-px bg-gray-100" />
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
      className={`flex-row items-center gap-3 px-4 py-3 ${!isLast ? 'border-b border-gray-50' : ''}`}
    >
      {/* Status icon */}
      <View className="w-6 items-center">
        {isCompleted ? (
          <CheckCircle2 size={18} color="#059669" fill="#059669" />
        ) : isLocked ? (
          <Lock size={16} color="#D1D5DB" />
        ) : (
          <Circle size={18} color={accentColor} />
        )}
      </View>

      {/* Content */}
      <View className="flex-1">
        <ThemedText
          className={`mb-1 text-[13px] font-semibold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}
          numberOfLines={1}
        >
          {lesson.title}
        </ThemedText>
        <View className="flex-row items-center gap-2">
          <View className="rounded px-1.5 py-0.5" style={{ backgroundColor: skillColor + '18' }}>
            <ThemedText className="text-[10px] font-semibold" style={{ color: skillColor }}>
              {SKILL_LABEL[lesson.skill]}
            </ThemedText>
          </View>
          <ThemedText className="text-[11px] text-gray-400">{lesson.duration}</ThemedText>
        </View>
      </View>

      {/* XP */}
      <View className={`rounded-lg px-2 py-1 ${isLocked ? 'bg-gray-100' : 'bg-amber-100'}`}>
        <ThemedText
          className={`text-[11px] font-bold ${isLocked ? 'text-gray-300' : 'text-amber-600'}`}
        >
          +{lesson.xp} XP
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};
