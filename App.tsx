import * as Sentry from '@sentry/react-native';

import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import RootStack from '@/navigation';
import '@/translations';

import Toast from './components/Toast';
import './global.css';

// Initialize Sentry for error tracking
Sentry.init({
  dsn: 'https://50d82d30af60d6ac7cf98e0b2b4307ca@o4510742785228800.ingest.de.sentry.io/4511154607423568',
  sendDefaultPii: true,
  enabled: !__DEV__, // Only enable in production
  tracesSampleRate: 1.0, // Adjust in production
});

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./ReactotronConfig');
}

function App() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  // You can add font loading, network check, etc. here
  const isLoaded = true;

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: palette.background,
        }}
      >
        <ActivityIndicator size="large" color={palette.tint} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: palette.background }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <SafeAreaProvider>
        <RootStack />
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// Wrap App with Sentry for error tracking and crash reporting
export default Sentry.wrap(App);
