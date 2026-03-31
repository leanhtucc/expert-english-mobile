import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { IconBackPage } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';

interface Props {
  title: string;
  onBack?: () => void;
  onShare?: () => void;
}

export const ProfileHeader = ({ title, onBack }: Props) => {
  const { colors } = useAppTheme();

  return (
    <View
      className="relative mt-5 flex-row items-center justify-between border-b px-4 py-3"
      style={{ borderBottomColor: colors.border, backgroundColor: colors.surfaceElevated }}
    >
      <TouchableOpacity
        onPress={onBack}
        className="z-10 h-10 w-10 items-center justify-center text-center"
        activeOpacity={0.7}
      >
        <IconBackPage width={16} height={16} iconColor={colors.text} />
      </TouchableOpacity>

      <View className="absolute left-0 right-0 items-center justify-center">
        <Text className="text-[18px] font-bold" style={{ color: colors.text }}>
          {title}
        </Text>
      </View>

      <View className="h-10 w-10" />
    </View>
  );
};
