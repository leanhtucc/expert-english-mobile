import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconBackPage } from '@/components/icon';

interface Props {
  title: string;
  onBack?: () => void;
  onShare?: () => void;
}

export const ProfileHeader = ({ title, onBack, onShare }: Props) => (
  <View className="mt-5 flex-row items-center justify-between bg-white px-4 py-3">
    <TouchableOpacity
      onPress={onBack}
      className="h-10 w-10 items-center justify-center"
      activeOpacity={0.7}
    >
      <IconBackPage width={16} height={16} />
    </TouchableOpacity>
    <Text className="text-lg font-bold">{title}</Text>
    <TouchableOpacity
      onPress={onShare}
      className="h-10 w-10 items-center justify-center"
      activeOpacity={0.7}
    >
      <Ionicons name="share-social-outline" size={24} color="#1A1A2E" />
    </TouchableOpacity>
  </View>
);
