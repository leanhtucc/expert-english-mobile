import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Colors } from '@/constants/theme';
import { useAuthStore } from '@/stores/auth.store';

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

  // Lấy trạng thái từ Store
  const { isAuthenticated, accessToken } = useAuthStore();

  useEffect(() => {
    const checkAndNavigate = () => {
      try {
        // Kiểm tra xem đã đăng nhập và có token chưa
        if (isAuthenticated && accessToken) {
          // @ts-ignore
          navigation.replace('TabNavigator', { screen: 'Home' });
        } else {
          navigation.replace('Onboarding');
        }
      } catch (error) {
        console.error('Error checking navigation status:', error);
        navigation.replace('Onboarding');
      }
    };

    // Để 1 timeout nhỏ xíu (100ms) để Zustand kịp Rehydrate dữ liệu từ ổ cứng lên RAM
    const timer = setTimeout(checkAndNavigate, 100);
    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated, accessToken]);
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
