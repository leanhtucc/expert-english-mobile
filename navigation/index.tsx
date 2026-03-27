import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

// NHỚ IMPORT TransitionPresets Ở ĐÂY

import { CreatePasswordScreen } from '@/screens/auth/CreatePassword';
import { EnterEmailScreen } from '@/screens/auth/enterEmail';
import LoginEmailScreen from '@/screens/auth/loginEmail';
import { VerifyOTPScreen } from '@/screens/auth/verifyOTP';
import DetailedDayScreen from '@/screens/home/DetailLessionScreen';
import VocabularyListScreen from '@/screens/home/VocabularyList';
import { OnboardingScreen } from '@/screens/onboarding';
import { ChangePasswordScreen, PersonalInformationScreen } from '@/screens/profile';
import { ProgressAnalysisScreen } from '@/screens/progressForUser/screens/ProgressAnalysisScreen';
import { StreakCompleteScreen } from '@/screens/progressForUser/screens/StreakCompleteScreen';
import { WeekUnlockScreen } from '@/screens/progressForUser/screens/WeekUnlockScreen';
import { AIFeedbackScreen, PracticeSetupScreen } from '@/screens/speakingSession';
import { AIRoadmapLoadingScreen, LearningPathScreen, SurveyScreen } from '@/screens/survey';
import VocabularyLearning from '@/screens/vocabulary/vocabularyLearning';

import InitialNavigator from './InitialNavigator';
import TabNavigator from './tab-navigator';

// ... (Giữ nguyên phần export type param list và các hàm navigate, goBack, resetRoot) ...
export type TabNavigatorParamList = {
  Home: undefined;
  Explore: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Start: { step?: number } | undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  EnterEmail: undefined;
  OTP: { email: string; isRegister?: boolean; userData?: any };
  VerifyOTP: { email: string };
  ResetPassword: undefined;
  CreatePassword: { email: string } | undefined;
  LoginEmail: undefined;
  Survey: undefined;
  LearningPath: undefined;
  AIRoadmapLoading: undefined;
  InitialNavigator: undefined;
  PremiumInterstitial: undefined;
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList> | { screen?: string };
  Modal: undefined;
  PracticeSetup: undefined;
  PersonalInformationScreen: undefined;
  ChangePasswordScreen: undefined;
  VocabularyListScreen: undefined;
  DayDetailScreen: { dayId: string };
  StreakComplete: undefined;
  ProgressAnalysis: undefined;
  WeekUnlock: undefined;
  AIFeedback: { userAnswer: string; mode: string };
  VocabularyLearning: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(routeName: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
  }
}

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer ref={navigationRef} initialState={undefined}>
      <Stack.Navigator
        initialRouteName="InitialNavigator"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="EnterEmail"
          component={EnterEmailScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="CreatePassword"
          component={CreatePasswordScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="LoginEmail"
          component={LoginEmailScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="LearningPath"
          component={LearningPathScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="AIRoadmapLoading"
          component={AIRoadmapLoadingScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="InitialNavigator"
          component={InitialNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="PracticeSetup"
          component={PracticeSetupScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="PersonalInformationScreen"
          component={PersonalInformationScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="AIFeedback"
          component={AIFeedbackScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="VocabularyLearning"
          component={VocabularyLearning}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="DayDetailScreen"
          component={DetailedDayScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="VocabularyListScreen"
          component={VocabularyListScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="StreakComplete"
          component={StreakCompleteScreen}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="ProgressAnalysis"
          component={ProgressAnalysisScreen}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="WeekUnlock"
          component={WeekUnlockScreen}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />

        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
