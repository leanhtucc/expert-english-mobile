import { Ionicons } from '@expo/vector-icons';

import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconPencilLine, IconUserCircle } from '@/components/icon';
import { useAuth } from '@/hooks/useAuth';

import { ConfirmModal } from '../components/ConfirmModal';

export default function PersonalInformationScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();

  // Lấy thêm deleteUserAccount từ useAuth
  const { fetchUserInfo, loading: apiLoading, updateProfile, deleteUserAccount } = useAuth();

  const inputRef = useRef<TextInput>(null);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [, setIsDeleting] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserInfo();
      if (data) {
        setUserData({
          id: data._id || '',
          name: data.fullname || data.username || 'Learner',
          email: data.email || '',
        });
      }
    };
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnableEdit = () => {
    setIsEditable(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSaveChanges = async () => {
    if (!userData.id) return;

    setIsSaving(true);
    const success = await updateProfile(userData.id, userData.name);
    setIsSaving(false);

    if (success) {
      setIsEditable(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userData.id) return;

    setIsDeleting(true);

    const success = await deleteUserAccount(userData.id);

    setIsDeleting(false);

    if (success) {
      setDeleteModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    }
  };

  if (apiLoading && !userData.email) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#C8102E" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <View className="flex-row items-center justify-between px-5 pt-7">
        <TouchableOpacity onPress={() => navigation.goBack()} className="-ml-2 p-2">
          <Ionicons name="arrow-back" size={26} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
          <Text className="text-[15px] font-bold text-[#C8102E]">Delete account</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5 pt-6">
        <Text className="mb-8 text-2xl font-extrabold text-[#111827]">Personal Information</Text>

        <View className="mb-6">
          <Text className="mb-1 text-sm text-gray-500">Email:</Text>
          <Text className="text-[17px] font-bold text-[#111827]">{userData.email}</Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-sm text-gray-500">Tên hiển thị</Text>
          <View
            className={`flex-row items-center rounded-2xl border px-4 py-3 shadow-sm ${
              isEditable ? 'border-[#C6102E] bg-white' : 'border-gray-100 bg-gray-50'
            }`}
          >
            <TextInput
              ref={inputRef}
              className={`flex-1 text-[17px] font-bold ${isEditable ? 'text-[#111827]' : 'text-gray-500'}`}
              value={userData.name}
              onChangeText={text => setUserData({ ...userData, name: text })}
              placeholder="Nhập tên của bạn"
              editable={isEditable}
            />
            <TouchableOpacity activeOpacity={0.6} onPress={handleEnableEdit}>
              <IconPencilLine width={28} height={28} color={isEditable ? '#C6102E' : '#6B7280'} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-6 shadow-sm"
          onPress={() => navigation.navigate('ChangePasswordScreen')}
        >
          <Text className="text-[17px] font-bold text-[#111827]">Change password</Text>
          <Ionicons name="chevron-forward" size={23} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View className="px-5 pb-8 pt-4" style={{ paddingBottom: insets.bottom + 16 }}>
        <TouchableOpacity
          className={`items-center justify-center rounded-2xl py-4 shadow-sm ${
            isSaving || !isEditable ? 'bg-gray-400' : 'bg-[#C6102E]'
          }`}
          onPress={handleSaveChanges}
          disabled={isSaving || !isEditable}
        >
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-[16px] font-bold text-white">Save change</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal xác nhận xóa */}
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
