import * as Sentry from '@sentry/react-native';

import 'react-native-reanimated';

import { ActivityIndicator, Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import RootStack from '@/navigation';
import '@/translations';

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
  require('./ReactotronConfig');
}

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

function App() {
  const colorScheme = useColorScheme();

  // You can add font loading, network check, etc. here
  const isLoaded = true;

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      </View>
    );
  }

  return (
    <GestureWrapper style={{ flex: 1 }}>
      <SafeAreaWrapper>
        <KeyboardWrapper>
          <RootStack />
        </KeyboardWrapper>
      </SafeAreaWrapper>
    </GestureWrapper>
  );
}

// Sentry.wrap có thể gây vấn đề touch events trên web
const SentryWrapper =
  Platform.OS === 'web' ? (component: React.ComponentType) => component : Sentry.wrap;

// Wrap App with Sentry for error tracking and crash reporting
export default SentryWrapper(App);
