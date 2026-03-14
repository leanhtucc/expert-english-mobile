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

import { useAuth } from '@/hooks/useAuth';

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

export const CreatePasswordScreen: React.FC = () => {
  const navigation = useNavigation<CreatePasswordScreenNavigationProp>();
  const route = useRoute<CreatePasswordScreenRouteProp>();
  const { email = '', verificationToken = '' } = route.params || {};

  const { loading, registerNewAccount } = useAuth(); // Gọi Hook

  const scrollViewRef = useRef<ScrollView>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignup = async () => {
    setPasswordError('');
    setConfirmPasswordError('');
    let hasError = false;

    if (!password.trim()) {
      setPasswordError('Vui lòng nhập mật khẩu');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Vui lòng nhập lại mật khẩu');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp');
      hasError = true;
    }

    if (hasError) return;

    // Đăng ký account qua Hook
    const isSuccess = await registerNewAccount(email, password, verificationToken);

    if (isSuccess) {
      navigation.navigate('TabNavigator', {});
    }
  };

  const handleConfirmPasswordFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const isFormValid = password.trim() !== '' && confirmPassword.trim() !== '';

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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mt-9 h-10 w-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={30} color="#1F2937" />
            </TouchableOpacity>

            <View className="mt-6 flex-1">
              <EmailIcon />
              <AuthHeader
                title="Signup with Email"
                subtitle="Please enter your email and password to login your account"
              />
              <EmailInput value={email} onChangeText={() => {}} error={''} editable={false} />
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your new password"
                error={passwordError}
              />
              <PasswordInput
                ref={confirmPasswordRef}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter your password again"
                error={confirmPasswordError}
                onFocus={handleConfirmPasswordFocus}
              />
              <SignupButton onPress={handleSignup} disabled={!isFormValid} loading={loading} />
              <TermsText />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePasswordScreen;
