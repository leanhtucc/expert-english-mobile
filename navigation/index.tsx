import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from '@/screens/onboarding';

import InitialNavigator from './InitialNavigator';
import TabNavigator from './tab-navigator';

// Tab Navigator Param List
export type TabNavigatorParamList = {
  Home: undefined;
  Explore: undefined;
};

// Root Stack Param List
export type RootStackParamList = {
  // Onboarding (always first)
  Onboarding: undefined;

  // Auth flow
  Start: { step?: number } | undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTP: { email: string; isRegister?: boolean; userData?: any };
  ResetPassword: undefined;

  // Main flow
  InitialNavigator: undefined;
  PremiumInterstitial: undefined;
  TabNavigator: NavigatorScreenParams<TabNavigatorParamList> | { screen?: string };
  Modal: undefined;
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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {/* Onboarding - Always shown first */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />

        {/* Auth screens */}
        {/* Add Login, SignUp, etc. screens here when available */}

        {/* Main app screens */}
        <Stack.Screen
          name="InitialNavigator"
          component={InitialNavigator}
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
