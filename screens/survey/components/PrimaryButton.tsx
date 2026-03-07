import { ArrowRight, CheckCircle } from 'lucide-react-native';

import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

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
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <>
        <Text className="mr-2 text-base font-bold text-white">{label}</Text>
        {isFinish ? <CheckCircle size={18} color="#fff" /> : <ArrowRight size={18} color="#fff" />}
      </>
    )}
  </TouchableOpacity>
);
