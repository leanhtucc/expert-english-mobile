import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconBackPage } from '@/components/icon';

interface Props {
  title: string;
  onBack?: () => void;
  onShare?: () => void;
}

export const ProfileHeader = ({ title, onBack }: Props) => (
  <View className="relative mt-5 flex-row items-center justify-between border-b border-gray-50 bg-white px-4 py-3">
    <TouchableOpacity
      onPress={onBack}
      className="z-10 h-10 w-10 items-center justify-center text-center"
      activeOpacity={0.7}
    >
      <IconBackPage width={16} height={16} />
    </TouchableOpacity>

    <View className="absolute left-0 right-0 items-center justify-center">
      <Text className="text-[18px] font-bold text-[#0F172A]">{title}</Text>
    </View>

    <View className="h-10 w-10" />
  </View>
);
