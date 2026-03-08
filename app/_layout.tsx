import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Sentry from '@sentry/react-native';

import 'react-native-reanimated';

import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import '@/translations';

SplashScreen.preventAutoHideAsync();

// KeyboardProvider không hỗ trợ tốt trên web và có thể chặn touch events
const KeyboardWrapper =
  Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => <>{children}</>
    : KeyboardProvider;

// GestureHandlerRootView có thể gây vấn đề trên web
const GestureWrapper =
  Platform.OS === 'web'
    ? ({ children, style }: { children: React.ReactNode; style?: any }) => (
        <View style={style}>{children}</View>
      )
    : GestureHandlerRootView;

// SafeAreaProvider có thể gây vấn đề trên web
const SafeAreaWrapper =
  Platform.OS === 'web'
    ? ({ children }: { children: React.ReactNode }) => <>{children}</>
    : SafeAreaProvider;

// Chỉ init Sentry trên native
if (Platform.OS !== 'web') {
  Sentry.init({
    dsn: 'https://ea6dd677088dcb31aabbd85249df6c02@o4510742785228800.ingest.de.sentry.io/4510742789423184',
    sendDefaultPii: true,
    enabled: !__DEV__,
    tracesSampleRate: 1.0,
  });
}

if (__DEV__ && Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../ReactotronConfig');
}

function RootLayout() {
  const [fontsLoaded] = useFonts({
    ...MaterialIcons.font,
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // Trên web, render đơn giản không wrap
  if (Platform.OS === 'web') {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
          contentStyle: { pointerEvents: 'auto' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen
          name="lesson"
          options={{ headerShown: false, gestureEnabled: true, animation: 'slide_from_right' }}
        />
      </Stack>
    );
  }

  return (
    <GestureWrapper style={{ flex: 1 }}>
      <SafeAreaWrapper>
        <KeyboardWrapper>
          <Stack screenOptions={{ headerShown: false, gestureEnabled: false, animation: 'none' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen
              name="lesson"
              options={{ headerShown: false, gestureEnabled: true, animation: 'slide_from_right' }}
            />
          </Stack>
        </KeyboardWrapper>
      </SafeAreaWrapper>
    </GestureWrapper>
  );
}

// Sentry.wrap có thể gây vấn đề touch events trên web
const SentryWrapper =
  Platform.OS === 'web' ? (component: React.ComponentType) => component : Sentry.wrap;

export default SentryWrapper(RootLayout);
