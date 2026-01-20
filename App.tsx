import * as Sentry from '@sentry/react-native';

import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import RootStack from '@/navigation';
import '@/translations';

// Initialize Sentry for error tracking
Sentry.init({
  dsn: 'https://ea6dd677088dcb31aabbd85249df6c02@o4510742785228800.ingest.de.sentry.io/4510742789423184',
  sendDefaultPii: true,
  enabled: !__DEV__, // Only enable in production
  tracesSampleRate: 1.0, // Adjust in production
});

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./ReactotronConfig');
}

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <RootStack />
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// Wrap App with Sentry for error tracking and crash reporting
export default Sentry.wrap(App);
