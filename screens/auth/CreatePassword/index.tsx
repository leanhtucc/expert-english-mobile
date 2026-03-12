import { Ionicons } from '@expo/vector-icons';

import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
type CreatePasswordScreenRouteProp = RouteProp<any, any>;

/**
 * Màn hình đăng ký với Email và Password
 */
export const CreatePasswordScreen: React.FC = () => {
  const navigation = useNavigation<CreatePasswordScreenNavigationProp>();
  const route = useRoute<CreatePasswordScreenRouteProp>();
  const { email: emailParam = '' } = route.params || {};
  const scrollViewRef = useRef<ScrollView>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle signup
  const handleSignup = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasError = false;

    // Email should be pre-filled from previous screen
    if (!email.trim()) {
      setEmailError('Email không tồn tại');
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

  // Check if form is valid (email is pre-filled, only check passwords)
  const isFormValid = password.trim() !== '' && confirmPassword.trim() !== '';

  // Handle confirm password focus
  const handleConfirmPasswordFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6">
            {/* Back Button */}
            <TouchableOpacity
              onPress={handleBack}
              className="mt-9 h-10 w-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={30} color="#1F2937" />
            </TouchableOpacity>

            {/* Main Content */}
            <View className="mt-6 flex-1">
              {/* Email Icon */}
              <EmailIcon />

              {/* Header */}
              <AuthHeader
                title="Signup with Email"
                subtitle="Please enter your email and password to login your account"
              />

              {/* Email Input - Read only */}
              <EmailInput
                value={email}
                onChangeText={setEmail}
                error={emailError}
                editable={false}
              />

              {/* New Password Input */}
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your new password"
                error={passwordError}
              />

              {/* Confirm Password Input */}
              <PasswordInput
                ref={confirmPasswordRef}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter your password again"
                error={confirmPasswordError}
                onFocus={handleConfirmPasswordFocus}
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
