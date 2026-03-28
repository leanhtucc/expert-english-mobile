import { Feather } from '@expo/vector-icons';

import React, { useState } from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconMascoCertificates } from '@/components/icon';

import { CertificateCard } from '../components/CertificateCard';
import { TabBar, TabType } from '../components/TabBar';
import { MOCK_DATA } from '../constants/profile.constants';

export default function CertificatesScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Đã hoàn thành');

  // Logic lọc data theo tab
  const filteredData = MOCK_DATA.filter(item => {
    if (activeTab === 'Đã hoàn thành') return item.status === 'completed';
    if (activeTab === 'Hết hạn') return item.status === 'expired';
    return false; // Tab 'Đang học' tạm rỗng
  });

  // Header Component của FlatList
  const ListHeader = () => (
    <View className="pt-6">
      {/* Title Section */}
      <Text className="mx-5 mb-3 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9E001F]">
        ACADEMIC RECORDS
      </Text>

      {/* Summary Card - Đã thu gọn và style giống ảnh */}
      <View className="mx-5 mb-8 flex-row items-center justify-between rounded-[20px] bg-[#FFF4F4] p-5">
        <View>
          <Text className="mb-1 text-[13px] font-medium text-[#8C7A78]">Tổng số chứng chỉ</Text>
          <View className="flex-row items-baseline gap-1.5">
            <Text className="text-[40px] font-black tracking-tight text-[#1E293B]">24</Text>
            <Text className="text-[13px] font-medium text-[#8C7A78]">đã tích lũy</Text>
          </View>
        </View>

        {/* Mascot được bọc trong khối nền trắng bo góc */}
        <View className="h-[75px] w-[75px] items-center justify-center overflow-hidden rounded-[16px] bg-white shadow-sm">
          <IconMascoCertificates width={95} height={95} className="mt-4" />
        </View>
      </View>

      {/* Tab Navigation */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F7]" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEF9F9" translucent={false} />

      {/* Fixed Header */}
      <View className="flex-row items-center justify-between border-b border-transparent px-5 pb-3 pt-2">
        <TouchableOpacity activeOpacity={0.7} className="-ml-2 p-2">
          <Feather name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-[18px] font-black text-[#1E293B]">Chứng chỉ & Thành tựu</Text>
        <View className="w-8" />
      </View>

      {/* Danh sách Chứng chỉ */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => <CertificateCard data={item} />}
        ListEmptyComponent={
          <View className="mt-10 items-center justify-center">
            <Text className="text-[#8C7A78]">Không có chứng chỉ nào ở mục này.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
