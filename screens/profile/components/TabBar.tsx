import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export type TabType = 'Đã hoàn thành' | 'Đang học' | 'Hết hạn';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabType[] = ['Đã hoàn thành', 'Đang học', 'Hết hạn'];

  return (
    <View className="mb-6 flex-row border-b border-slate-200 px-5">
      {tabs.map(tab => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.7}
            onPress={() => onTabChange(tab)}
            className={`mr-6 pb-3 ${isActive ? 'border-b-2 border-[#C8102E]' : ''}`}
          >
            <Text
              className={`text-[15px] ${
                isActive ? 'font-bold text-[#C8102E]' : 'font-medium text-[#8C7A78]'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
