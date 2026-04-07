import { Ionicons } from '@expo/vector-icons';

import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  // Nhận email và verificationToken từ màn VerifyOTP truyền sang
  const { email = '' } = route.params || {};

  const { loading, registerNewAccount } = useAuth(); // Gọi Hook

  const scrollViewRef = useRef<ScrollView>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [username, setUsername] = useState(''); // Thêm trường username nếu API bắt buộc
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignup = async () => {
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    let hasError = false;

    // Validate Username
    if (!username.trim()) {
      setUsernameError('Vui lòng nhập tên tài khoản (username)');
      hasError = true;
    }

    // Validate Password
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

    // GỌI HÀM ĐĂNG KÝ
    const isSuccess = await registerNewAccount(username.trim(), email, password);

    if (isSuccess) {
      // Đăng ký thành công -> Bắn thẳng về màn Đăng Nhập
      // Reset navigation stack để user không back lại được màn hình đăng ký
      navigation.reset({
        index: 0,
        routes: [
          { name: 'EnterEmail' }, // Cho màn nhập email làm gốc
          { name: 'LoginEmail', params: { email: email } }, // Đẩy vào màn Login với email vừa tạo
        ],
      });
    }
  };

  const handleConfirmPasswordFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const isFormValid =
    username.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

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
                title="Tạo mật khẩu mới"
                subtitle="Nhập mật khẩu mới cho tài khoản của bạn"
              />

              <EmailInput value={email} onChangeText={() => {}} error={''} editable={false} />

              {/* Nếu API Register của bạn BẮT BUỘC cần Username, bạn phải có trường nhập này. Nếu không cần thì xoá đi nhé */}
              <TextInput
                className="mb-4 h-[52px] rounded-[16px] border-[1px] border-slate-200 bg-slate-50 px-4 text-[15px] text-[#1E293B]"
                placeholder="Nhập tên tài khoản"
                placeholderTextColor="#9CA3AF"
                value={username}
                onChangeText={setUsername}
              />
              {usernameError ? <Text className="mb-4 text-red-500">{usernameError}</Text> : null}

              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu mới"
                error={passwordError}
              />

              <PasswordInput
                ref={confirmPasswordRef}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Nhập lại mật khẩu"
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
