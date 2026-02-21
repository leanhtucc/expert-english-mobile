import React from 'react';
import { Text, View } from 'react-native';

/**
 * Component footer với điều khoản và chính sách
 */
export const WelcomeFooter: React.FC = () => {
  return (
    <View className="px-6 py-6">
      <Text className="text-center text-xs leading-5 text-gray-500">
        Bằng cách tiếp tục, bạn đồng ý với{' '}
        <Text className="font-semibold text-orange-500">Điều khoản dịch vụ</Text> và{' '}
        <Text className="font-semibold text-orange-500">Chính sách bảo mật</Text> của chúng tôi
      </Text>
    </View>
  );
};
