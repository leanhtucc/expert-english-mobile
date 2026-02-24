import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation';

import { EmailInput, InfoBox, LoginHeader, LoginIcon, SubmitButton } from './components';

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-4">
            {/* Back Button */}
            <TouchableOpacity
              onPress={handleBack}
              className="mb-6 h-10 w-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#1F2937" />
            </TouchableOpacity>

            {/* Icon */}
            <LoginIcon />

            {/* Header */}
            <LoginHeader
              title="Đăng nhập với Email"
              subtitle="Chúng tôi sẽ gửi mã OTP để xác thực tài khoản của bạn"
            />

            {/* Email Input */}
            <EmailInput value={email} onChangeText={setEmail} error={error} />

            {/* Submit Button */}
            <SubmitButton onPress={handleSubmit} disabled={!email.trim()} loading={loading} />

            {/* Info Box */}
            <InfoBox message="Email của bạn sẽ được tạo mật tự động đối. Chúng tôi không chia sẻ thông tin của bạn với bên thứ ba." />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
