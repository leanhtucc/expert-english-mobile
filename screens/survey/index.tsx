import React, { useCallback, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/navigation';

import {
  Step1WhoAreYou,
  Step2SelectField,
  Step3EnglishLevel,
  Step4DailyGoal,
  Step5Reminder,
} from './components';
import type { SurveyAnswers } from './survey.types';

const TOTAL_STEPS = 5;

const DEFAULT_ANSWERS: SurveyAnswers = {
  reminderEnabled: true,
  reminderTime: { hour: 19, minute: 15 },
};

export const SurveyScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>(DEFAULT_ANSWERS);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateStep = useCallback(
    (next: number) => {
      const direction = next > step ? -30 : 30;
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: direction,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setStep(next);
        slideAnim.setValue(-direction);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [fadeAnim, slideAnim, step]
  );

  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      animateStep(step + 1);
    } else {
      navigation.navigate('TabNavigator', {});
    }
  }, [animateStep, navigation, step]);

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
  };

  const stepMap: Record<number, React.ReactElement> = {
    1: <Step1WhoAreYou {...stepProps} />,
    2: <Step2SelectField {...stepProps} />,
    3: <Step3EnglishLevel {...stepProps} />,
    4: <Step4DailyGoal {...stepProps} />,
    5: <Step5Reminder {...stepProps} />,
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      {stepMap[step]}
    </Animated.View>
  );
};
