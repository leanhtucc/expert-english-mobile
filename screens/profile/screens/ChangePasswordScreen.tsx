import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useProfile } from '@/hooks/useProfile';

export default function ChangePasswordScreen({ navigation }: { navigation: any }) {
  const { changePassword } = useProfile();
  const insets = useSafeAreaInsets();

  // State lưu giá trị
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  // State bật/tắt hiển thị mật khẩu
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Component dùng chung cho các ô Input Password
  const PasswordInput = ({ label, value, onChange, show, setShow }: any) => (
    <View className="mb-5">
      <Text className="mb-2 text-sm text-gray-500">{label}</Text>
      <View className="flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 py-2 shadow-sm">
        <TextInput
          className="flex-1 text-[17px] font-bold text-[#111827]"
          value={value}
          onChangeText={onChange}
          secureTextEntry={!show}
          placeholder="********"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity onPress={() => setShow(!show)} className="p-1" activeOpacity={0.7}>
          <Ionicons name={show ? 'eye-outline' : 'eye-off-outline'} size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      {/* Top Bar: Nút Back có viền vuông bo tròn như Figma */}
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
        {/* Large Title */}
        <Text className="mb-8 text-2xl font-extrabold text-[#111827]">Change password</Text>

        {/* Các Form Input */}
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

      {/* Bottom Fixed Button */}
      <View className="px-5 pb-8 pt-4" style={{ paddingBottom: insets.bottom + 16 }}>
        <TouchableOpacity
          className="items-center justify-center rounded-2xl bg-[#C6102E] py-4 shadow-sm"
          onPress={changePassword}
          activeOpacity={0.8}
        >
          <Text className="text-[16px] font-bold text-white">Change password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
