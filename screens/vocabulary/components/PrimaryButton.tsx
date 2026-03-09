import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  className = '',
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center rounded-2xl bg-red-600 py-4 px-6 ${disabled || loading ? 'opacity-50' : 'active:bg-red-700'} ${className} `}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text className="text-center text-base font-semibold text-white">{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
