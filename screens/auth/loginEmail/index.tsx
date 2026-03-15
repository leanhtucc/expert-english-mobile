import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useAuth } from '@/hooks/useAuth';

import { AuthHeader, EmailIcon, EmailInput, LoginButton, PasswordInput } from './components';

type LoginEmailScreenNavigationProp = StackNavigationProp<any>;
type LoginEmailScreenRouteProp = RouteProp<any, any>;

export const LoginEmailScreen: React.FC = () => {
  const navigation = useNavigation<LoginEmailScreenNavigationProp>();
  const route = useRoute<LoginEmailScreenRouteProp>();
  const { email: initialEmail = '' } = route.params || {};

  const { loading, loginWithEmail } = useAuth();

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // const isValidEmail = (email: string): boolean => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Vui lòng nhập tài khoản');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu');
      hasError = true;
    }

    if (hasError) return;

    const isSuccess = await loginWithEmail(email, password);

    if (isSuccess) {
      navigation.navigate('Survey', {});
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mt-10 h-10 w-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={30} color="#1F2937" />
            </TouchableOpacity>

            <View className="mt-12 flex-1">
              <EmailIcon />
              <AuthHeader
                title="Login with Email"
                subtitle="Please enter your email and password to login your account"
              />
              <EmailInput value={email} onChangeText={setEmail} error={emailError} />
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                error={passwordError}
              />
              <LoginButton onPress={handleLogin} disabled={!isFormValid} loading={loading} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginEmailScreen;
