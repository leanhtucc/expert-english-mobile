import { X } from 'lucide-react-native';

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  IconCheckCourse,
  IconLoadingBuildCourse,
  IconRobot,
  IconUpcomming,
} from '@/components/icon';
import { RootStackParamList } from '@/navigation';

type StepStatus = 'completed' | 'in_progress' | 'upcoming';

interface RoadmapStep {
  label: string;
  detail: string;
  status: StepStatus;
}

const INITIAL_STEPS: RoadmapStep[] = [
  { label: 'Analyzing your proficiency level', detail: 'In Progress', status: 'in_progress' },
  { label: 'Building your custom path...', detail: 'Upcoming', status: 'upcoming' },
  { label: 'Almost ready!', detail: 'Upcoming', status: 'upcoming' },
];

const STEP_SEQUENCE: StepStatus[][] = [
  ['in_progress', 'upcoming', 'upcoming'],
  ['completed', 'in_progress', 'upcoming'],
  ['completed', 'completed', 'in_progress'],
];

export const AIRoadmapLoadingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [progress, setProgress] = useState(0);
  const [seqIndex, setSeqIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + 3, 100);
        Animated.timing(progressAnim, {
          toValue: next,
          duration: 400,
          useNativeDriver: false,
        }).start();

        if (next >= 30 && next < 70) setSeqIndex(1);
        else if (next >= 70) setSeqIndex(2);

        if (next >= 100) {
          clearInterval(interval);
          // navigation.navigate('TabNavigator', {});
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [navigation, progressAnim]);

  const STATUS_DETAIL: Record<StepStatus, string> = {
    completed: 'Completed',
    in_progress: 'In Progress',
    upcoming: 'Upcoming',
  };

  const steps: RoadmapStep[] = INITIAL_STEPS.map((s, i) => {
    const status = STEP_SEQUENCE[seqIndex][i];
    return { ...s, status, detail: STATUS_DETAIL[status] };
  });

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const inProgressStep = steps.find(s => s.status === 'in_progress');

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center border-b border-gray-100 px-5 py-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="h-9 w-9 items-center justify-center rounded-full border border-gray-200"
        >
          <X size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-base font-bold text-gray-900">
          Personalizing Your Path
        </Text>
        <View className="w-9" />
      </View>

      <View className="flex-1 px-6 pt-8">
        {/* Illustration card */}
        <View
          className="mb-7 items-center justify-center self-center rounded-3xl border border-red-200 bg-red-50"
          style={{ width: 140, height: 140 }}
        >
          <IconRobot width={110} height={110} />
        </View>

        {/* Title & subtitle */}
        <Text className="mb-2 text-center text-xl font-extrabold text-gray-900">
          Generating Your AI Roadmap
        </Text>
        <Text className="mb-7 text-center text-sm leading-5 text-gray-500">
          Our AI is tailoring curriculum for your industry
        </Text>

        {/* Progress section */}
        <View className="mb-8">
          <View className="mb-2 flex-row justify-between">
            <Text className="text-[13px] font-semibold text-gray-700">
              {inProgressStep?.label ?? 'Finalizing...'}
            </Text>
            <Text className="text-[13px] font-bold text-[#C8102E]">{progress}%</Text>
          </View>
          <View className="h-2 overflow-hidden rounded-full bg-gray-100">
            <Animated.View
              className="h-full rounded-full bg-[#C8102E]"
              style={{ width: barWidth }}
            />
          </View>
        </View>

        {/* Step timeline */}
        <View>
          {steps.map((step, i) => (
            <View key={i} className="mb-1 flex-row">
              <View className="w-8 items-center">
                <StepIcon status={step.status} />
                {i < steps.length - 1 && (
                  <View className="mt-0.5 w-0.5 flex-1 bg-gray-200" style={{ minHeight: 16 }} />
                )}
              </View>
              <View className="flex-1 pb-5 pl-3">
                <Text
                  className={`text-sm font-semibold ${
                    step.status === 'in_progress'
                      ? 'text-[#C8102E]'
                      : step.status === 'upcoming'
                        ? 'text-gray-400'
                        : 'text-gray-700'
                  }`}
                >
                  {step.label}
                </Text>
                <Text
                  className={`mt-0.5 text-xs ${
                    step.status === 'in_progress' ? 'text-[#C8102E]' : 'text-gray-400'
                  }`}
                >
                  {step.detail}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const StepIcon: React.FC<{ status: StepStatus }> = ({ status }) => {
  if (status === 'completed')
    return (
      <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-[#C8102E]">
        <IconCheckCourse width={18} height={18} />
      </View>
    );
  if (status === 'in_progress')
    return (
      <View className="h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-[#C8102E] bg-red-50">
        <IconLoadingBuildCourse width={20} height={20} />
      </View>
    );
  return (
    <View className="h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50">
      <IconUpcomming width={20} height={20} />
    </View>
  );
};
