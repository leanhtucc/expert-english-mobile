import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';

interface InfoBoxProps {
  demoCode?: string;
}

/**
 * Box hiển thị thông tin về OTP và demo code
 */
export const InfoBox: React.FC<InfoBoxProps> = ({ demoCode }) => {
  return (
    <View className="flex-row rounded-xl bg-blue-50 p-4">
      <Ionicons name="information-circle" size={20} color="#3B82F6" style={{ marginTop: 2 }} />
      <View className="ml-3 flex-1">
        <Text className="text-sm leading-5 text-blue-700">
          <Text className="font-semibold">Mẹo:</Text>
          {'\n'}
          Kiểm tra hộp thư spam nếu không nhận được mã
          {'\n'}
          Mã OTP có hiệu lực trong 5 phút
          {demoCode && (
            <>
              {'\n'}
              Để demo, sử dụng mã: <Text className="font-bold">{demoCode}</Text>
            </>
          )}
        </Text>
      </View>
    </View>
  );
};
