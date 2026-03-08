import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Easing, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/navigation';

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
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>(DEFAULT_ANSWERS);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  // Stores the pending enter direction — set before setStep, read after commit
  const pendingDir = useRef<'forward' | 'back' | null>(null);

  // Fires synchronously after the new step content is committed to the native tree.
  // At this point opacity is still 0, so we can safely reposition before animating in.
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

      // Animate current content out, then swap step
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
        // Record direction before state update so useLayoutEffect can read it
        pendingDir.current = dir;
        setStep(next);
      });
    },
    [fadeAnim, slideAnim, step]
  );

  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      animateStep(step + 1);
    } else {
      navigation.navigate('LearningPath');
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
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
