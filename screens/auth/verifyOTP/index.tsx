import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { RootStackParamList } from '@/navigation';

import { OTPInput, ResendTimer, VerifyHeader, VerifyIcon } from './components';

type VerifyOTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyOTP'>;
type VerifyOTPScreenRouteProp = RouteProp<RootStackParamList, 'VerifyOTP'>;

/**
 * Màn hình xác thực OTP
 * User nhập mã OTP nhận được qua email để xác thực tài khoản
 */
export const VerifyOTPScreen: React.FC = () => {
  const navigation = useNavigation<VerifyOTPScreenNavigationProp>();
  const route = useRoute<VerifyOTPScreenRouteProp>();
  const { email = 'hghoa2005@gmail.com' } = route.params || {};

  const [otp, setOtp] = useState('');
  const [, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo OTP code
  const DEMO_OTP = '123456';

  // Handle OTP complete
  const handleOTPComplete = async (otpValue: string) => {
    setError('');
    setLoading(true);

    try {
      // TODO: Call API to verify OTP
      // await authApi.verifyOTP(email, otpValue);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check demo code
      if (otpValue === DEMO_OTP) {
        console.log('OTP verified successfully!');
        // Navigate to main app or next screen
        // navigation.navigate('Home');
      } else {
        setError('Mã OTP không chính xác. Vui lòng thử lại.');
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      // TODO: Call API to resend OTP
      // await authApi.resendOTP(email);

      console.log('OTP resent to:', email);
      // Show success message
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    }
  };

  // Handle change email
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
              className="mt-4 h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#1F2937" />
            </TouchableOpacity>

            <View className="mt-10 flex-1">
              {/* Icon */}
              <VerifyIcon />

              {/* Header */}
              <VerifyHeader
                title="Verify your Email"
                subtitle={`We've sent a 6-digit verification code to ${email}`}
              />

              {/* OTP Input */}
              <OTPInput length={6} onComplete={handleOTPComplete} onChangeOTP={setOtp} />

              {/* Resend Timer */}
              <ResendTimer initialSeconds={59} onResend={handleResendOTP} />

              {/* Error Message */}
              {error && (
                <View className="mb-4">
                  <Text className="text-center text-sm text-red-500">{error}</Text>
                </View>
              )}

              {/* Verify Button */}
              <TouchableOpacity
                className={`rounded-2xl px-6 py-[18px] ${otp.length === 6 ? 'bg-[#C6102E]' : 'bg-gray-200'}`}
                style={
                  otp.length === 6
                    ? {
                        shadowColor: '#C6102E',
                        shadowOpacity: 0.35,
                        shadowRadius: 12,
                        shadowOffset: { width: 0, height: 6 },
                        elevation: 6,
                      }
                    : undefined
                }
                onPress={() => handleOTPComplete(otp)}
                disabled={otp.length < 6}
                activeOpacity={0.85}
              >
                <View className="flex-row items-center justify-center gap-2">
                  <Text
                    className={`text-base font-semibold tracking-wide ${otp.length === 6 ? 'text-white' : 'text-gray-400'}`}
                  >
                    Verify Account
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={otp.length === 6 ? '#FFFFFF' : '#9CA3AF'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;
