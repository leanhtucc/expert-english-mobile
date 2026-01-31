import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/navigation';

import { OnboardingButtons, OnboardingContent, OnboardingHeader } from './components';

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * OnboardingScreen Component
 *
 * The welcome screen shown to new users.
 * Features:
 * - Animated entrance for header, content, and buttons
 * - Book stack icon representing learning
 * - Key features highlighted with tags
 * - Primary action to start the app flow
 * - Secondary action for existing users to login
 */
const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  // Animation values for staggered entrance
  const headerAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animation sequence
    Animated.stagger(200, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerAnim, contentAnim, buttonsAnim]);

  const handleStartPress = () => {
    // Navigate to survey or main flow
    // navigation.navigate('Survey');
    console.log('Start pressed');
  };

  const handleLoginPress = () => {
    // Navigate to login screen
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header with Book Icon */}
          <OnboardingHeader animatedValue={headerAnim} />

          {/* Main Content */}
          <OnboardingContent animatedValue={contentAnim} />
        </ScrollView>

        {/* Bottom Buttons */}
        <OnboardingButtons
          onStartPress={handleStartPress}
          onLoginPress={handleLoginPress}
          animatedValue={buttonsAnim}
        />
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
