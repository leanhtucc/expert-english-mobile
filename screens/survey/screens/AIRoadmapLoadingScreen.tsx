import { X } from 'lucide-react-native';

import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { surveyApi } from '@/api/endpoints/survey.api';
import {
  IconCheckCourse,
  IconLoadingBuildCourse,
  IconUpcomming,
  ImageMasco,
} from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
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
  ['completed', 'completed', 'completed'],
];

export const AIRoadmapLoadingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { isDark } = useAppTheme();

  const duration = route.params?.duration || 'standard';

  const [progress, setProgress] = useState(0);
  const [seqIndex, setSeqIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Biến để đánh dấu khi nào API thực sự xong
  const apiDataRef = useRef<any>(null);
  const isApiFinished = useRef(false);

  useEffect(() => {
    let isMounted = true;

    // 1. INTERVAL TỐC ĐỘ CHẬM HƠN (Mục tiêu ~40 giây)
    const interval = setInterval(() => {
      setProgress(prev => {
        let increment = 0;

        // Mỗi 800ms tăng theo mức dưới đây -> ~40 giây sẽ chạm mốc 98%
        if (prev < 50) {
          // Giai đoạn 1: 0-50% (Mất khoảng 16s - 20 steps)
          increment = 1.5 + Math.random() * 2;
        } else if (prev < 90) {
          // Giai đoạn 2: 50-90% (Mất khoảng 16s - 20 steps)
          increment = 1 + Math.random() * 2;
        } else if (prev < 98) {
          // Giai đoạn 3: 90-98% (Bò rất chậm để chờ tín hiệu API, mất khoảng 8s - 10 steps)
          increment = 0.5 + Math.random() * 0.6;
        } else {
          // Treo nhẹ ở 99% nếu API chưa xong
          increment = 0.05;
        }

        const next = Math.min(prev + increment, 99);

        Animated.timing(progressAnim, {
          toValue: next,
          duration: 700, // Animation dài hơn để thanh bar trôi mượt, không giật
          useNativeDriver: false,
        }).start();

        // Cập nhật Step UI theo tiến độ %
        if (next >= 35 && next < 70) setSeqIndex(1);
        else if (next >= 70 && next < 99) setSeqIndex(2);

        // ĐIỀU KIỆN KẾT THÚC: API Xong VÀ Progress đã bò tới sát nút (>= 98)
        if (isApiFinished.current && next >= 98) {
          finishLoading();
        }

        return next;
      });
    }, 800); // Check mỗi 0.8 giây

    const finishLoading = () => {
      clearInterval(interval);
      setSeqIndex(3); // Hiện trạng thái "Completed" cho tất cả các bước
      setProgress(100);

      // Hiệu ứng về đích 100% mượt mà
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }).start();

      // Đợi thêm 1.5s để user kịp nhìn thấy kết quả 100% hoàn tất
      setTimeout(() => {
        if (isMounted) {
          console.log('⏭️ [ĐIỀU HƯỚNG] Hoàn tất 100% lộ trình');
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabNavigator' as any }],
          });
        }
      }, 1500);
    };

    const generateCourse = async () => {
      try {
        console.log('🌐 [API CALL] Bắt đầu gọi API...');
        let response;
        if (duration === 'fast') {
          response = await surveyApi.generateLearningPath7day();
        } else {
          response = await surveyApi.generateLearningPath4Week();
        }

        if (!isMounted) return;

        apiDataRef.current = response.data;
        isApiFinished.current = true;
        console.log('✅ [API THÀNH CÔNG] Dữ liệu đã sẵn sàng, chờ tiến trình đạt 100%...');
      } catch (error: any) {
        if (!isMounted) return;
        clearInterval(interval);
        console.error('❌ [API THẤT BẠI]', error.message);
        Alert.alert('Error', 'Failed to generate your roadmap.');
        navigation.goBack();
      }
    };

    generateCourse();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [duration, navigation, progressAnim]);
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
      <StatusBar style={isDark ? 'light' : 'dark'} />
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

      <View className="flex-1 px-6 pt-3">
        <View
          className="mb-7 items-center justify-center self-center overflow-hidden rounded-[40px] border-2 border-red-200 bg-red-100"
          style={{ width: 300, height: 300 }}
        >
          <ImageMasco width={200} height={200} />
        </View>

        <Text className="mb-2 text-center text-xl font-extrabold text-gray-900">
          Generating Your AI Roadmap
        </Text>
        <Text className="mb-7 text-center text-sm leading-5 text-gray-500">
          Our AI is tailoring curriculum for your industry
        </Text>

        <View className="mb-8">
          <View className="mb-2 flex-row justify-between">
            <Text className="text-[13px] font-semibold text-gray-700">
              {inProgressStep?.label ?? 'Finalizing...'}
            </Text>
            <Text className="text-[13px] font-bold text-[#C8102E]">{Math.floor(progress)}%</Text>
          </View>
          <View className="h-2 overflow-hidden rounded-full bg-gray-100">
            <Animated.View
              className="h-full rounded-full bg-[#C8102E]"
              style={{ width: barWidth }}
            />
          </View>
        </View>

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
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status !== 'in_progress') return;
    const anim = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [status, spin]);

  if (status === 'completed')
    return (
      <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-[#C8102E]">
        <IconCheckCourse width={15} height={15} />
      </View>
    );
  if (status === 'in_progress') {
    const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    return (
      <View className="h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-[#C8102E] bg-red-50">
        <Animated.View style={{ transform: [{ rotate }] }}>
          <IconLoadingBuildCourse width={15} height={15} />
        </Animated.View>
      </View>
    );
  }
  return (
    <View className="h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50">
      <IconUpcomming width={15} height={15} />
    </View>
  );
};
