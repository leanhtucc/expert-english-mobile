import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/auth.store';
// Import thêm useAuthStore
import { useToastStore } from '@/stores/toast.store';

const PasswordInput = ({ label, value, onChange, show, setShow }: any) => (
  <View className="mb-5">
    <Text className="mb-2 text-sm text-gray-500">{label}</Text>
    <View className="flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 py-2 shadow-sm">
      <TextInput
        className="flex-1 py-2 text-[17px] font-bold text-[#111827]"
        value={value}
        onChangeText={onChange}
        secureTextEntry={!show}
        placeholder="********"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={() => setShow(!show)} className="p-1" activeOpacity={0.7}>
        <Ionicons name={show ? 'eye-outline' : 'eye-off-outline'} size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function ChangePasswordScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { isDark } = useAppTheme();

  const { changeUserPassword } = useAuth();
  const showToast = useToastStore(state => state.showToast);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSavePassword = async () => {
    if (!current || !newPass || !confirm) {
      showToast('Vui lòng điền đầy đủ các trường', 'error');
      return;
    }

    if (newPass !== confirm) {
      showToast('Mật khẩu xác nhận không khớp', 'error');
      return;
    }

    if (newPass.length < 6) {
      showToast('Mật khẩu mới phải từ 6 ký tự trở lên', 'error');
      return;
    }

    setIsSubmitting(true);
    const success = await changeUserPassword(current, newPass);
    setIsSubmitting(false);

    if (success) {
      showToast('Vui lòng đăng nhập lại bằng mật khẩu mới!', 'success');

      setTimeout(() => {
        clearAuth();

        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      }, 2000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {/* Top Bar */}
      <View className="px-5 pt-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-5 h-11 w-11 items-center justify-center shadow-sm"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5 pt-6">
        <Text className="mb-8 text-2xl font-extrabold text-[#111827]">Change password</Text>

        <PasswordInput
          label="Current password"
          value={current}
          onChange={setCurrent}
          show={showCurrent}
          setShow={setShowCurrent}
        />
        <PasswordInput
          label="New password"
          value={newPass}
          onChange={setNewPass}
          show={showNew}
          setShow={setShowNew}
        />
        <PasswordInput
          label="Confirm new password"
          value={confirm}
          onChange={setConfirm}
          show={showConfirm}
          setShow={setShowConfirm}
        />
      </View>

      <View className="px-5 pb-8 pt-4" style={{ paddingBottom: insets.bottom + 16 }}>
        <TouchableOpacity
          className={`items-center justify-center rounded-2xl py-4 shadow-sm ${
            isSubmitting ? 'bg-gray-400' : 'bg-[#C6102E]'
          }`}
          onPress={handleSavePassword}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-[16px] font-bold text-white">Change password</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
