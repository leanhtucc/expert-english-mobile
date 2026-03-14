import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconLogoStart, SplashAndWelcomeScreen } from '@/components/icon';
import { RootStackParamList } from '@/navigation';

import { OnboardingActions, OnboardingHeader, RobotWithIcons } from './components';
import { ONBOARDING_CONTENT } from './onboarding.constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Màn hình onboarding - Giới thiệu ứng dụng cho người dùng mới
 */
export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [step, setStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateToStep = (nextStep: number) => {
    const exitEasing = Easing.in(Easing.cubic);
    const enterEasing = Easing.out(Easing.cubic);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: exitEasing,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        easing: exitEasing,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 380,
          easing: enterEasing,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 380,
          easing: enterEasing,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleGetStarted = () => navigation.navigate('Survey');
  const handleGoogleLogin = () => console.log('Google login');
  const handleEmailLogin = () => navigation.navigate('EnterEmail');
  const handleLogin = () => animateToStep(1);

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
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <Animated.View
          style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View className="flex-1 justify-between pt-2">
              {/* Top Section: Robot + Content */}
              <View className="flex-1 justify-center">
                <RobotWithIcons />

                {step === 0 ? (
                  <OnboardingHeader
                    appName={ONBOARDING_CONTENT.appName}
                    tagline={ONBOARDING_CONTENT.tagline}
                    title={ONBOARDING_CONTENT.title}
                    description={ONBOARDING_CONTENT.description}
                  />
                ) : (
                  <View className="px-6 pb-10">
                    <View className="mb-3 flex-row items-center justify-center">
                      <IconLogoStart width={32} height={32} />
                      <Text className="ml-2 text-3xl font-bold text-white">
                        {ONBOARDING_CONTENT.appName}
                      </Text>
                    </View>
                    <Text className="text-center text-lg font-medium text-white">
                      {ONBOARDING_CONTENT.tagline}
                    </Text>
                  </View>
                )}
              </View>

              {/* Bottom Section: Actions */}
              <View>
                <OnboardingActions
                  step={step}
                  onGetStarted={handleGetStarted}
                  onGoogleLogin={handleGoogleLogin}
                  onEmailLogin={handleEmailLogin}
                  onLogin={handleLogin}
                  getStartedText={ONBOARDING_CONTENT.getStartedButton}
                  loginText={ONBOARDING_CONTENT.loginLink}
                  termsText={ONBOARDING_CONTENT.termsText}
                />
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
