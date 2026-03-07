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

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation';

import { EmailInput, LoginHeader, LoginIcon, SubmitButton } from './components';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

/**
 * Màn hình đăng nhập với Email
 * User nhập email và nhận mã OTP để xác thực
 */
export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle submit
  const handleSubmit = async () => {
    // Reset error
    setError('');

    // Validate
    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    try {
      setLoading(true);

      // TODO: Call API to send OTP
      // await authApi.sendOTP(email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to verify OTP screen
      navigation.navigate('VerifyOTP', { email });
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigation.goBack();
  };

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
            {/* Back Button */}
            <TouchableOpacity
              onPress={handleBack}
              className="mt-10 h-10 w-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={30} color="#1F2937" />
            </TouchableOpacity>

            {/* Centered content block */}
            <View className="mt-12 flex flex-1">
              {/* Icon */}
              <LoginIcon />

              {/* Header */}
              <LoginHeader
                title="Your Email"
                subtitle="Please enter your email address to recover your password."
              />

              {/* Email Input */}
              <EmailInput value={email} onChangeText={setEmail} error={error} />

              {/* Submit Button */}
              <SubmitButton onPress={handleSubmit} disabled={!email.trim()} loading={loading} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
