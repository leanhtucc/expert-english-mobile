import 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';

import { ThemeProvider } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import RootStack from '@/navigation';

import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? { dark: true, colors: {} as any, fonts: {} as any }
          : { dark: false, colors: {} as any, fonts: {} as any }
      }
    >
      <RootStack />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
