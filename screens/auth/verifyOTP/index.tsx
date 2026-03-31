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

import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useAuth } from '@/hooks/useAuth';

import { OTPInput, ResendTimer, VerifyButton, VerifyHeader, VerifyIcon } from './components';

type VerifyOTPScreenNavigationProp = StackNavigationProp<any>;
type VerifyOTPScreenRouteProp = RouteProp<any, any>;

export const VerifyOTPScreen: React.FC = () => {
  const navigation = useNavigation<VerifyOTPScreenNavigationProp>();
  const route = useRoute<VerifyOTPScreenRouteProp>();
  const { email = '' } = route.params || {};

  const { loading, verifyEmailOTP, sendEmailOTP } = useAuth(); // Gọi Hook
  const [otp, setOtp] = useState('');

  const handleOTPComplete = async (otpValue: string) => {
    // THÊM DÒNG NÀY ĐỂ CHẶN DOUBLE SUBMIT
    if (loading) return;

    // Gọi verify qua Hook
    const verificationToken = await verifyEmailOTP(email, otpValue);

    if (verificationToken) {
      // OTP hợp lệ -> chuyển sang tạo mật khẩu
      navigation.navigate('CreatePassword', {
        email,
        verificationToken,
      });
    }
  };

  const handleResendOTP = async () => {
    // Tái sử dụng hàm sendEmailOTP từ hook, Toast tự báo thành công/thất bại
    await sendEmailOTP(email);
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
              className="mt-4 h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#1F2937" />
            </TouchableOpacity>

            <View className="mt-10 flex-1">
              <VerifyIcon />
              <VerifyHeader
                title="Verify your Email"
                subtitle={`We've sent a 6-digit verification code to ${email}`}
              />
              <OTPInput length={6} onComplete={handleOTPComplete} onChangeOTP={setOtp} />

              <ResendTimer initialSeconds={59} onResend={handleResendOTP} />

              <VerifyButton
                onPress={() => handleOTPComplete(otp)}
                disabled={otp.length < 6}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;
