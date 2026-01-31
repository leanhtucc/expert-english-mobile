import { Platform } from 'react-native';

import { Image } from 'expo-image';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          className="absolute bottom-0 left-0 h-44 w-72"
        />
      }
    >
      <ThemedView className="mb-4 flex-row items-center gap-2">
        <ThemedText className="text-2xl font-bold">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView className="mb-2 gap-2">
        <ThemedText className="text-lg font-semibold">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText className="font-semibold">screens/home.screen.tsx</ThemedText> to see
          changes. Press{' '}
          <ThemedText className="font-semibold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView className="mb-2 gap-2">
        <ThemedText className="text-lg font-semibold">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what&apos;s included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView className="mb-2 gap-2">
        <ThemedText className="text-lg font-semibold">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText className="font-semibold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText className="font-semibold">app</ThemedText> directory. This will move the
          current <ThemedText className="font-semibold">app</ThemedText> to{' '}
          <ThemedText className="font-semibold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
