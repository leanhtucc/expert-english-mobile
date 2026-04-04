import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { IconVerified } from '@/components/icon';

import { AVATAR_SIZE, PRIMARY } from '../constants/profile.constants';

interface Props {
  avatar: string;
  name: string;
  email: string;
  level: string;
  onEdit?: () => void;
}

export const AvatarSection = ({ avatar, name, email, level, onEdit }: Props) => (
  <View className="mb-6 mt-5 items-center">
    <View className="relative">
      <Image
        source={{ uri: avatar }}
        className="rounded-full border-4"
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderColor: PRIMARY }}
      />
      <TouchableOpacity
        className="absolute bottom-0 right-0 rounded-full bg-red-600 p-1"
        onPress={onEdit}
        style={{ borderWidth: 3, borderColor: '#FFF' }}
      >
        <IconVerified width={16} height={16} />
      </TouchableOpacity>
    </View>
    <Text className="mt-2 text-xl font-bold">{name}</Text>
    <Text className="text-xs text-gray-500">{email}</Text>
    <View className="mt-2 flex-row items-center justify-center rounded-full bg-red-100 px-4 py-1.5">
      <Text className="ml-1.5 text-sm font-bold text-red-600">{level}</Text>
    </View>
    <View className="mt-2 flex-row items-center justify-center space-x-3">
      <TouchableOpacity className="mt-3 rounded-full bg-red-600 px-20 py-4" onPress={onEdit}>
        <Text className="text-sm font-semibold text-white">Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mt-3 rounded-full bg-gray-200 px-3 py-3">
        <Ionicons name="share-social-outline" size={24} color="#1A1A2E" />
      </TouchableOpacity>
    </View>
  </View>
);
