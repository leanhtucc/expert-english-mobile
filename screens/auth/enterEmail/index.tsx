import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';

import { EmailInput, LoginHeader, LoginIcon, SubmitButton } from './components';

type EnterEmailScreenNavigationProp = StackNavigationProp<any>;

export const EnterEmailScreen: React.FC = () => {
  const { isDark } = useAppTheme();
  const navigation = useNavigation<EnterEmailScreenNavigationProp>();
  const { loading } = useAuth(); // Đã ẩn sendEmailOTP vì không dùng tới

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // ==========================================
  // 🚧 TẠM THỜI BỎ QUA CHECK FORMAT EMAIL 🚧
  // ==========================================
  // const isValidEmail = (emailStr: string): boolean => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(emailStr);
  // };

  // Handle submit
  const handleSubmit = async () => {
    setError('');

    const formattedEmail = email.trim();

    // Vẫn giữ lại check rỗng để tránh user bấm nút khi chưa nhập gì
    if (!formattedEmail) {
      setError('Vui lòng nhập thông tin.');
      return;
    }

    // 🚧 TẠM THỜI BỎ QUA LỖI SAI ĐỊNH DẠNG 🚧
    // if (!isValidEmail(formattedEmail)) {
    //   setError('Email không đúng định dạng.');
    //   return;
    // }

    // Bắn thẳng sang màn Login
    console.log('🚧 Bỏ qua check định dạng và OTP, đi thẳng tới màn LoginEmail');
    navigation.navigate('LoginEmail', { email: formattedEmail });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style={isDark ? 'light' : 'dark'} />
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
              <LoginHeader title="Nhập email của bạn" subtitle="Vui lòng nhập email để tiếp tục" />
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
