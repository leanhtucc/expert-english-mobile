import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconReminderBell, IconStudySchedule } from '@/components/icon';

import { PrimaryButton } from '../components/PrimaryButton';
import { TimePickerWheel } from '../components/TimePickerWheel';
import { HOUR_VALUES, MINUTE_VALUES } from '../constants/surveyConstants';
import type { StepProps } from '../types/surveyTypes';

interface Step5Props extends StepProps {
  isSubmitting?: boolean;
}

export const Step5Reminder: React.FC<Step5Props> = ({
  answers,
  onUpdate,
  onNext,
  isSubmitting,
}) => {
  const { reminderEnabled, reminderTime } = answers;

  const hourIndex = Math.max(HOUR_VALUES.indexOf(String(reminderTime.hour).padStart(2, '0')), 0);
  const minuteIndex = Math.max(
    MINUTE_VALUES.indexOf(String(Math.round(reminderTime.minute / 5) * 5).padStart(2, '0')),
    0
  );

  const handleFinish = async () => {
    if (isSubmitting) return;

    onNext();
  };

  const handleHourChange = (index: number) =>
    onUpdate({ reminderTime: { ...reminderTime, hour: Number(HOUR_VALUES[index]) } });

  const handleMinuteChange = (index: number) =>
    onUpdate({ reminderTime: { ...reminderTime, minute: Number(MINUTE_VALUES[index]) } });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['bottom']}>
      <View className="flex-1 px-5 pt-4">
        <Text className="mb-1 text-2xl font-bold text-gray-900">Stay on track</Text>
        <Text className="mb-6 text-sm leading-5 text-gray-500">
          Consistency is the secret to mastering medical English. Let us help you keep your streak.
        </Text>

        <View className="flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white p-4">
          <View className="flex-row items-center">
            <IconReminderBell width={22} height={22} />
            <Text className="ml-3 text-base font-semibold text-gray-800">Enable Reminders</Text>
          </View>
          <TouchableOpacity
            onPress={() => onUpdate({ reminderEnabled: !reminderEnabled })}
            activeOpacity={0.85}
            style={{
              width: 50,
              height: 28,
              borderRadius: 14,
              backgroundColor: reminderEnabled ? '#C8102E' : '#d1d5db',
              justifyContent: 'center',
              alignItems: reminderEnabled ? 'flex-end' : 'flex-start',
              paddingHorizontal: 2,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            />
          </TouchableOpacity>
        </View>

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

        <View className="mt-4 flex-row items-start rounded-2xl bg-blue-50 p-4">
          <IconStudySchedule width={16} height={16} />
          <Text className="ml-3 flex-1 text-xs leading-5 text-blue-600">
            We will remind you to study at {HOUR_VALUES[hourIndex]}:{MINUTE_VALUES[minuteIndex]}{' '}
            every day. Studying in the evening helps with memory consolidation.
          </Text>
        </View>
      </View>

      <View className="pb-8 pt-2">
        <PrimaryButton
          label={isSubmitting ? 'Saving...' : 'Finish'}
          onPress={handleFinish}
          disabled={isSubmitting}
          isFinish
        />
      </View>
    </SafeAreaView>
  );
};
