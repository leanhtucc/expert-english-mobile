import { ActivityIndicator } from 'react-native';

import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LoginScreen } from '@/screens/auth/login';
import { VerifyOTPScreen } from '@/screens/auth/verifyOTP';
import { WelcomeScreen } from '@/screens/auth/welcome';
import { OnboardingScreen } from '@/screens/onboarding';
import { useAuthStore } from '@/stores';

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
  Welcome: undefined;

  // Auth flow
  Start: { step?: number } | undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTP: { email: string; isRegister?: boolean; userData?: any };
  VerifyOTP: { email: string };
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
  const isLoggedIn = useAuthStore(state => state.isAuthenticated);
  const colorScheme = useColorScheme();

  if (typeof isLoggedIn === 'undefined') {
    return <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
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
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{ headerShown: false }}
        />

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
