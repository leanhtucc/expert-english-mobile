import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreatePasswordScreen from '@/screens/auth/CreatePassword';
import { EnterEmailScreen } from '@/screens/auth/enterEmail';
import LoginEmailScreen from '@/screens/auth/loginEmail';
import { VerifyOTPScreen } from '@/screens/auth/verifyOTP';
import { OnboardingScreen } from '@/screens/onboarding';
import { ChangePasswordScreen, PersonalInformationScreen } from '@/screens/profile';
import { AIFeedbackScreen, PracticeSetupScreen } from '@/screens/speakingSession';
import { AIRoadmapLoadingScreen, LearningPathScreen, SurveyScreen } from '@/screens/survey';

import InitialNavigator from './InitialNavigator';
import TabNavigator from './tab-navigator';

// Tab Navigator Param List
export type TabNavigatorParamList = {
  Home: undefined;
  Explore: undefined;
};

// Root Stack Param List
export type RootStackParamList = {
  // Onboarding
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
  AIFeedback: { userAnswer: string; mode: string };
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
        initialRouteName="Onboarding"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterEmail"
          component={EnterEmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePassword"
          component={CreatePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginEmail"
          component={LoginEmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Survey" component={SurveyScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="LearningPath"
          component={LearningPathScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AIRoadmapLoading"
          component={AIRoadmapLoadingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="InitialNavigator"
          component={InitialNavigator}
          options={{ headerShown: false }}
        />

        {/* Speaking Practice Screens */}
        <Stack.Screen
          name="PracticeSetup"
          component={PracticeSetupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalInformationScreen"
          component={PersonalInformationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="SpeakingConversation"
          component={SpeakingConversationScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="AIFeedback"
          component={AIFeedbackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
