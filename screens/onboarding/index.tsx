import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { SplashAndWelcomeScreen } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { RootStackParamList } from '@/navigation';

import { OnboardingActions, OnboardingHeader, RobotWithIcons } from './components';
import { ONBOARDING_CONTENT } from './onboarding.constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Màn hình onboarding - Giới thiệu ứng dụng cho người dùng mới
 */
export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isDark } = useAppTheme();
  const handleGoogleLogin = () => console.log('Google login');
  const handleEmailLogin = () => navigation.navigate('EnterEmail');

  return (
    <View style={{ flex: 1 }}>
      {/* Background layer */}
      <View style={StyleSheet.absoluteFill}>
        <SplashAndWelcomeScreen
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View className="flex-1 justify-between pt-2">
              {/* Top Section: Robot + Content */}
              <View className="flex-1 justify-center">
                <RobotWithIcons />

                <OnboardingHeader
                  appName={ONBOARDING_CONTENT.appName}
                  tagline={ONBOARDING_CONTENT.tagline}
                  title={ONBOARDING_CONTENT.title}
                  description={ONBOARDING_CONTENT.description}
                />
              </View>

              {/* Bottom Section: Actions */}
              <View>
                <OnboardingActions
                  onGoogleLogin={handleGoogleLogin}
                  onEmailLogin={handleEmailLogin}
                  termsText={ONBOARDING_CONTENT.termsText}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
