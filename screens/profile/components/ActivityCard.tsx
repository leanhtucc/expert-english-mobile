import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const ActivityCard = ({ icon, title, value }: Props) => (
  <View
    className="mb-3 flex-row items-center rounded-2xl bg-white p-3"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 2,
    }}
  >
    <View className="mr-4 h-[47px] w-[47px] items-center justify-center rounded-full bg-[#FFF1F2]">
      {icon}
    </View>

    <View>
      <Text className="mb-0.5 text-[12px] font-bold text-[#64748B]">{title}</Text>
      <Text className="text-[22px] font-extrabold text-[#0F172A]">{value}</Text>
    </View>
  </View>
);
