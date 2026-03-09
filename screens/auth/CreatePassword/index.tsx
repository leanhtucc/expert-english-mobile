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

import {
  AuthHeader,
  EmailIcon,
  EmailInput,
  PasswordInput,
  SignupButton,
  TermsText,
} from './components';

type CreatePasswordScreenNavigationProp = StackNavigationProp<any>;

/**
 * Màn hình đăng ký với Email và Password
 */
export const CreatePasswordScreen: React.FC = () => {
  const navigation = useNavigation<CreatePasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle signup
  const handleSignup = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    // Validate email
    if (!email.trim()) {
      setEmailError('Vui lòng nhập email');
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError('Email không hợp lệ');
      hasError = true;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      hasError = true;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Vui lòng nhập lại mật khẩu');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);

      // TODO: Call API to signup
      // const response = await authApi.signup({ email, password });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to LoginEmail screen
      navigation.navigate('LoginEmail');

      console.log('Signup success:', { email, password });
    } catch {
      setEmailError('Email đã tồn tại hoặc có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    navigation.goBack();
  };

  // Check if form is valid
  const isFormValid =
    email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

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

            {/* Main Content */}
            <View className="mt-12 flex-1">
              {/* Email Icon */}
              <EmailIcon />

              {/* Header */}
              <AuthHeader
                title="Signup with Email"
                subtitle="Please enter your email and password to login your account"
              />

              {/* Email Input */}
              <EmailInput value={email} onChangeText={setEmail} error={emailError} />

              {/* New Password Input */}
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your new password"
                error={passwordError}
              />

              {/* Confirm Password Input */}
              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter your password again"
                error={confirmPasswordError}
              />

              {/* Signup Button */}
              <SignupButton onPress={handleSignup} disabled={!isFormValid} loading={loading} />

              {/* Terms and Privacy Policy */}
              <TermsText />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePasswordScreen;
