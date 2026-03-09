import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface LoginButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Login button component với loading state
 */
export const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`mt-6 flex-row items-center justify-center rounded-full py-6 ${
        disabled || loading ? 'bg-red-300' : 'bg-red-600'
      }`}
      style={{
        shadowColor: '#DC2626',
        shadowOpacity: disabled || loading ? 0 : 0.3,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: disabled || loading ? 0 : 8,
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <View className="flex-row items-center">
          <Text className="mr-2 text-xl font-semibold text-white">Login</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};
