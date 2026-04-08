import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { surveyApi } from '@/api';
import { useAppTheme } from '@/hooks/useAppTheme';
import { RootStackParamList } from '@/navigation';
import { SubmitSurveyOptionRequest } from '@/types/api/survey.request';
import { SurveyResponseData } from '@/types/api/survey.response';

import {
  Step1WhoAreYou,
  Step2SelectField,
  Step3EnglishLevel,
  Step4DailyGoal,
  Step5Reminder,
  SurveyHeader,
} from '../components';
import type { SurveyAnswers } from '../types/surveyTypes';

const TOTAL_STEPS = 5;
const SLIDE_DISTANCE = 40;
const EXIT_DURATION = 220;
const ENTER_DURATION = 260;
const EASING = Easing.out(Easing.cubic);

const DEFAULT_ANSWERS: SurveyAnswers = {
  reminderEnabled: true,
  reminderTime: { hour: 19, minute: 15 },
};

export const SurveyScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isDark } = useAppTheme();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>(DEFAULT_ANSWERS);
  const [surveyData, setSurveyData] = useState<SurveyResponseData | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const pendingDir = useRef<'forward' | 'back' | null>(null);

  useEffect(() => {
    surveyApi
      .getDataSurvey()
      .then(res => {
        if (res.data) setSurveyData(res.data);
      })
      .catch(err => console.error('Lỗi khi fetch data survey:', err));
  }, []);

  useLayoutEffect(() => {
    if (pendingDir.current === null) return;
    const enterFrom = pendingDir.current === 'forward' ? SLIDE_DISTANCE : -SLIDE_DISTANCE;
    pendingDir.current = null;
    slideAnim.setValue(enterFrom);
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ENTER_DURATION,
        easing: EASING,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: ENTER_DURATION,
        easing: EASING,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step, fadeAnim, slideAnim]);

  const animateStep = useCallback(
    (next: number) => {
      const dir: 'forward' | 'back' = next > step ? 'forward' : 'back';
      const exitSlide = dir === 'forward' ? -SLIDE_DISTANCE : SLIDE_DISTANCE;
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: EXIT_DURATION,
          easing: EASING,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: exitSlide,
          duration: EXIT_DURATION,
          easing: EASING,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (!finished) return;
        pendingDir.current = dir;
        setStep(next);
      });
    },
    [fadeAnim, slideAnim, step]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmitSurvey = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formattedHour = String(answers.reminderTime.hour).padStart(2, '0');
      const formattedMinute = String(answers.reminderTime.minute).padStart(2, '0');
      const reminderTimeStr = `${formattedHour}:${formattedMinute}`;

      const payload: SubmitSurveyOptionRequest = {
        current_status: answers.role || '',
        industry_id: answers.field || '',
        role_id: null,
        english_level: answers.level || '',
        daily_learning_minutes: answers.dailyGoal || 15,
        daily_reminder_enabled: answers.reminderEnabled,
        reminder_time: reminderTimeStr,
        custom_focus: '',
        course_duration_weeks: 4,
      };

      console.log('Đang gửi data lên server:', payload);

      await surveyApi.submitSurvey(payload as any);

      console.log('✅ Submit survey thành công!');
      setTimeout(() => {
        setIsSubmitting(false);
        navigation.navigate('LearningPath');
      }, 1000);
    } catch (error) {
      console.error('❌ Lỗi khi submit survey:', error);
      Alert.alert('Error', 'Failed to save your preferences. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      animateStep(step + 1);
    } else {
      handleSubmitSurvey();
    }
  }, [step, animateStep, handleSubmitSurvey]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      animateStep(step - 1);
    } else {
      navigation.goBack();
    }
  }, [animateStep, navigation, step]);

  const handleUpdate = useCallback((updates: Partial<SurveyAnswers>) => {
    setAnswers(prev => ({ ...prev, ...updates }));
  }, []);

  const stepProps = {
    answers,
    onUpdate: handleUpdate,
    onNext: handleNext,
    onBack: handleBack,
    currentStep: step,
    totalSteps: TOTAL_STEPS,
    surveyData,
    isSubmitting,
  };

  const stepMap: Record<number, React.ReactElement> = {
    1: <Step1WhoAreYou {...stepProps} />,
    2: <Step2SelectField {...stepProps} />,
    3: <Step3EnglishLevel {...stepProps} />,
    4: <Step4DailyGoal {...stepProps} />,
    5: <Step5Reminder {...stepProps} />,
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView edges={['top']} style={{ backgroundColor: 'white' }}>
        <SurveyHeader currentStep={step} totalSteps={TOTAL_STEPS} onBack={handleBack} />
      </SafeAreaView>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        }}
      >
        {stepMap[step]}
      </Animated.View>
    </View>
  );
};
