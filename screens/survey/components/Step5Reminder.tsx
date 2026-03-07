import { ChevronLeft, MapPin } from 'lucide-react-native';

import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconReminderBell } from '@/components/icon';

import { HOUR_VALUES, MINUTE_VALUES } from '../survey.constants';
import type { StepProps } from '../survey.types';
import { PrimaryButton } from './PrimaryButton';
import { TimePickerWheel } from './TimePickerWheel';

export const Step5Reminder: React.FC<StepProps> = ({
  answers,
  onUpdate,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const { reminderEnabled, reminderTime } = answers;

  const hourIndex = Math.max(HOUR_VALUES.indexOf(String(reminderTime.hour).padStart(2, '0')), 0);
  const minuteIndex = Math.max(
    MINUTE_VALUES.indexOf(String(Math.round(reminderTime.minute / 5) * 5).padStart(2, '0')),
    0
  );

  const handleHourChange = (index: number) =>
    onUpdate({ reminderTime: { ...reminderTime, hour: Number(HOUR_VALUES[index]) } });

  const handleMinuteChange = (index: number) =>
    onUpdate({ reminderTime: { ...reminderTime, minute: Number(MINUTE_VALUES[index]) } });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      {/* Step 5 custom header with full progress bar */}
      <View className="px-5 pb-2 pt-3">
        <View className="mb-3 flex-row items-center">
          <TouchableOpacity
            onPress={onBack}
            className="mr-3"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft size={22} color="#1a1a1a" />
          </TouchableOpacity>
          <Text className="flex-1 text-[11px] font-semibold uppercase text-[#C8102E]">
            STEP {currentStep} OF {totalSteps}
          </Text>
          <Text className="text-[11px] font-bold uppercase text-gray-400">100% COMPLETE</Text>
        </View>
        <View className="h-1.5 rounded-full bg-[#C8102E]" />
      </View>

      <View className="flex-1 px-5 pt-4">
        <Text className="mb-1 text-2xl font-bold text-gray-900">Stay on track</Text>
        <Text className="mb-6 text-sm leading-5 text-gray-500">
          Consistency is the secret to mastering medical English. Let us help you keep your streak.
        </Text>

        {/* Reminder toggle */}
        <View className="flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white p-4">
          <View className="flex-row items-center">
            <IconReminderBell width={22} height={22} />
            <Text className="ml-3 text-base font-semibold text-gray-800">Enable Reminders</Text>
          </View>
          <Switch
            value={reminderEnabled}
            onValueChange={value => onUpdate({ reminderEnabled: value })}
            trackColor={{ false: '#d1d5db', true: '#C8102E' }}
            thumbColor="#fff"
          />
        </View>

        {/* Time picker wheel (only when enabled) */}
        {reminderEnabled && (
          <View className="mt-5 items-center rounded-2xl border border-gray-200 bg-white py-4">
            <View className="flex-row items-center">
              <TimePickerWheel
                values={HOUR_VALUES}
                selectedIndex={hourIndex}
                onSelect={handleHourChange}
              />
              <Text className="mx-3 text-xl font-bold text-gray-400">:</Text>
              <TimePickerWheel
                values={MINUTE_VALUES}
                selectedIndex={minuteIndex}
                onSelect={handleMinuteChange}
              />
            </View>
            <Text className="mt-2 text-xs text-gray-400">Scroll to adjust time</Text>
          </View>
        )}

        {/* Evening tip */}
        <View className="mt-4 flex-row items-start rounded-2xl bg-blue-50 p-4">
          <MapPin size={16} color="#3b82f6" />
          <Text className="ml-3 flex-1 text-xs leading-5 text-blue-600">
            We will remind you to study at {HOUR_VALUES[hourIndex]}:{MINUTE_VALUES[minuteIndex]}{' '}
            every day. Studying in the evening helps with memory consolidation.
          </Text>
        </View>
      </View>

      <View className="pb-8 pt-2">
        <PrimaryButton label="Finish" onPress={onNext} isFinish />
      </View>
    </SafeAreaView>
  );
};
