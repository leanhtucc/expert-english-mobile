import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Colors } from '@/constants/theme';

import { RootStackParamList } from './index';

/**
 * InitialNavigator Component
 *
 * Determines the first screen to show after user logs in.
 *
 * Logic:
 * - Check if we should show any interstitial screens
 * - Otherwise → Go to TabNavigator (Home)
 *
 * This runs once on app start for logged-in users.
 */
export default function InitialNavigator() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkAndNavigate = async () => {
      try {
        // You can add premium interstitial logic here
        // For now, just go to TabNavigator
        navigation.replace('Onboarding');
      } catch (error) {
        console.error('Error checking navigation status:', error);
        // On error, just go to Home
        navigation.replace('Onboarding');
      }
    };

    checkAndNavigate();
  }, [navigation]);

  // Show loading while checking
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
      }}
    >
      <ActivityIndicator size="large" color={Colors.light.tint} />
    </View>
  );
}
