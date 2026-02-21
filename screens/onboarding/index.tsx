import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/navigation';

import { FeaturesList, OnboardingActions, OnboardingHeader, OnboardingIcon } from './components';
import { ONBOARDING_CONTENT, ONBOARDING_FEATURES } from './onboarding.constants';

/**
 * Màn hình onboarding - Giới thiệu ứng dụng cho người dùng mới
 */
export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleTryNow = () => {
    navigation.navigate('Welcome');
  };

  const handleLogin = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between pt-[60px]">
          {/* Top Section: Icon + Content */}
          <View className="flex-1 justify-center">
            <OnboardingIcon />

            <OnboardingHeader
              title={ONBOARDING_CONTENT.title}
              description={ONBOARDING_CONTENT.description}
            />

            <FeaturesList features={ONBOARDING_FEATURES} />
          </View>

          {/* Bottom Section: Actions */}
          <View className="pb-5">
            <OnboardingActions onTryNow={handleTryNow} onLogin={handleLogin} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
