import { ArrowRight } from 'lucide-react-native';

import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { IconFinish } from '@/components/icon';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  isFinish?: boolean;
  loading?: boolean;
}

const ACTIVE_SHADOW = {
  shadowColor: '#C8102E',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 12,
  elevation: 6,
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled,
  isFinish,
  loading,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.85}
    className={`mx-5 flex-row items-center justify-center rounded-full py-4 ${
      disabled ? 'bg-gray-300' : 'bg-[#C8102E]'
    }`}
    style={!disabled ? ACTIVE_SHADOW : undefined}
  >
    <Text className="mr-2 text-base font-bold text-white">{label}</Text>

    {loading ? (
      <View className="h-[18px] w-[18px] items-center justify-center">
        <ActivityIndicator size="small" color="#fff" />
      </View>
    ) : isFinish ? (
      <IconFinish width={18} height={18} />
    ) : (
      <ArrowRight size={18} color="#fff" />
    )}
  </TouchableOpacity>
);
