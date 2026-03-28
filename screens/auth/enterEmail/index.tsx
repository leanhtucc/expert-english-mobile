import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useAuth } from '@/hooks/useAuth';

import { EmailInput, LoginHeader, LoginIcon, SubmitButton } from './components';

type EnterEmailScreenNavigationProp = StackNavigationProp<any>;

export const EnterEmailScreen: React.FC = () => {
  const navigation = useNavigation<EnterEmailScreenNavigationProp>();
  const { loading, sendEmailOTP } = useAuth(); // Sử dụng Hook

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Tùy chọn: Validate email format
  const isValidEmail = (emailStr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  // Handle submit
  const handleSubmit = async () => {
    setError('');

    const formattedEmail = email.trim();

    if (!formattedEmail) {
      setError('Vui lòng nhập email của bạn.');
      return;
    }

    if (!isValidEmail(formattedEmail)) {
      setError('Email không đúng định dạng.');
      return;
    }

    // 1. Gọi API Send OTP để kiểm tra sự tồn tại
    const isExist = await sendEmailOTP(formattedEmail);

    // Nếu lỗi API (trả về null) thì dừng
    if (isExist === null) return;

    // 2. CHIA NHÁNH LOGIC:
    if (isExist === true) {
      // TÀI KHOẢN ĐÃ TỒN TẠI -> Nhảy sang màn Đăng Nhập
      console.log('🔄 Email đã tồn tại. Chuyển sang màn Đăng nhập.');
      navigation.navigate('LoginEmail', { email: formattedEmail });
    } else {
      // CHƯA CÓ TÀI KHOẢN (API ĐÃ GỬI OTP) -> Nhảy sang màn Nhập OTP
      console.log('✉️ Email mới. Chuyển sang màn Xác thực OTP.');
      navigation.navigate('VerifyOTP', { email: formattedEmail });
    }
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
                subtitle="Please enter your email address to continue."
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
