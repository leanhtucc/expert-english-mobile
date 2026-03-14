import React from 'react';
import { Text, View } from 'react-native';

/**
 * Component hiển thị Terms of Service và Privacy Policy
 */
export const TermsText: React.FC = () => {
  return (
    <View className="mt-6 flex-row items-center justify-center px-4">
      <Text className="text-center text-sm text-gray-600">
        By signing up, you agree to our{' '}
        <Text className="font-semibold text-gray-900" style={{ textDecorationLine: 'underline' }}>
          Terms of Service
        </Text>{' '}
        and{' '}
        <Text className="font-semibold text-gray-900" style={{ textDecorationLine: 'underline' }}>
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
};
