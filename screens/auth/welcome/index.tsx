import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation';

import { SocialButtonGroup, WelcomeFooter, WelcomeHeader, WelcomeIcon } from './components';
import { WELCOME_CONTENT } from './welcome.constants';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

/**
 * Màn hình Welcome/Login - Đăng nhập bằng các phương thức khác nhau
 */
export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login pressed');
  };

  const handleEmailLogin = () => {
    navigation.navigate('Login');
  };

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook login
    console.log('Facebook login pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between py-8">
          {/* Top Section */}
          <View>
            {/* Back Button Space - Add if needed */}
            <View className="mb-6 px-6">{/* <BackButton /> */}</View>

            <WelcomeHeader title={WELCOME_CONTENT.title} subtitle={WELCOME_CONTENT.subtitle} />

            <WelcomeIcon />
          </View>

          {/* Middle Section - Buttons */}
          <View className="mb-8">
            <SocialButtonGroup
              onGooglePress={handleGoogleLogin}
              onEmailPress={handleEmailLogin}
              onFacebookPress={handleFacebookLogin}
            />
          </View>

          {/* Bottom Section - Footer */}
          <WelcomeFooter />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
