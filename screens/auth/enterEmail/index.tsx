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

import { useAuth } from '@/hooks/useAuth';

import { EmailInput, LoginHeader, LoginIcon, SubmitButton } from './components';

type EnterEmailScreenNavigationProp = StackNavigationProp<any>;

export const EnterEmailScreen: React.FC = () => {
  const navigation = useNavigation<EnterEmailScreenNavigationProp>();
  const { loading } = useAuth(); // Sử dụng Hook

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // // Validate email format
  // const isValidEmail = (email: string): boolean => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // Handle submit
  const handleSubmit = async () => {
    setError('');

    if (!email.trim()) {
      setError('Vui lòng nhập email hoặc tài khoản');
      return;
    }

    // ĐI TẮT: Bỏ qua gọi API sendEmailOTP, nhảy thẳng tới màn hình Login
    // Leader bảo dùng admin/admin nên ta truyền chuỗi vừa nhập sang màn sau
    navigation.navigate('LoginEmail', { email: email.trim() });
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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mt-10 h-10 w-10 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={30} color="#1F2937" />
            </TouchableOpacity>

            <View className="mt-12 flex flex-1">
              <LoginIcon />
              <LoginHeader
                title="Your Email"
                subtitle="Please enter your email address to recover your password."
              />
              <EmailInput value={email} onChangeText={setEmail} error={error} />
              <SubmitButton onPress={handleSubmit} disabled={!email.trim()} loading={loading} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterEmailScreen;
