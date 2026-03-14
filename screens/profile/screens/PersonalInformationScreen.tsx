import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconPencilLine, IconUserCircle } from '@/components/icon';
import { useProfile } from '@/hooks/useProfile';

import { ConfirmModal } from '../components/ConfirmModal';

export default function PersonalInformationScreen({ navigation }: { navigation: any }) {
  const { user, updateProfile } = useProfile();
  const insets = useSafeAreaInsets();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(false);
    console.log('Đã xoá tài khoản!');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      {/* Top Bar: Back & Delete */}
      <View className="flex-row items-center justify-between px-5 pt-7">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="-ml-2 p-2"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={26} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDeleteModalVisible(true);
          }}
          activeOpacity={0.7}
        >
          <Text className="text-[15px] font-bold text-[#C8102E]">Delete account</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5 pt-6">
        <Text className="mb-8 text-2xl font-extrabold text-[#111827]">Personal Information</Text>

        <View className="mb-6">
          <Text className="mb-1 text-sm text-gray-500">Email:</Text>
          <Text className="text-[17px] font-bold text-[#111827]">{user.email}</Text>
        </View>

        {/* Tên hiển thị (Input) */}
        <View className="mb-6">
          <Text className="mb-2 text-sm text-gray-500">Tên hiển thị</Text>
          <View className="flex-row items-center rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
            <TextInput
              className="flex-1 text-[17px] font-bold text-[#111827]"
              value={user.name}
              onChangeText={name => updateProfile({ name })}
            />
            <IconPencilLine width={28} height={28} color="#6B7280" />
          </View>
        </View>

        {/* Nút Change Password (Dạng Menu) */}
        <TouchableOpacity
          className="flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm"
          onPress={() => navigation.navigate('ChangePasswordScreen')}
          activeOpacity={0.7}
        >
          <Text className="text-[17px] font-bold text-[#111827]">Change password</Text>
          <Ionicons name="chevron-forward" size={23} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Bottom Fixed Button */}
      <View className="px-5 pb-8 pt-4" style={{ paddingBottom: insets.bottom + 16 }}>
        <TouchableOpacity
          className="items-center justify-center rounded-2xl bg-[#C6102E] py-4 shadow-sm"
          activeOpacity={0.8}
        >
          <Text className="text-[16px] font-bold text-white">Save change</Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        visible={isDeleteModalVisible}
        icon={<IconUserCircle width={45} height={45} color="#FF3B30" />}
        title="Delete Account"
        description="After deleting your account, all your data will be lost and cannot be recovered. Are you sure you want to delete it?"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </SafeAreaView>
  );
}
