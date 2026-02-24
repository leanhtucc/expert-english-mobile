import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface EmailDisplayProps {
  email: string;
  onChangeEmail: () => void;
}

/**
 * Hiển thị email đã nhập với option thay đổi
 */
export const EmailDisplay: React.FC<EmailDisplayProps> = ({ email, onChangeEmail }) => {
  return (
    <View className="mb-6 items-center">
      <Text className="mb-2 text-center text-sm text-gray-600">Chúng tôi đã gửi mã OTP đến</Text>
      <Text className="mb-2 text-center text-base font-semibold text-gray-900">{email}</Text>
      <TouchableOpacity onPress={onChangeEmail} activeOpacity={0.7}>
        <Text className="text-sm font-medium text-orange-500">Thay đổi email</Text>
      </TouchableOpacity>
    </View>
  );
};
