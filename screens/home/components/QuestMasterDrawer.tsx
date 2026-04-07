import { Feather, MaterialIcons } from '@expo/vector-icons';

import React, { memo, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';

// (Phần MissionData và MissionCard giữ nguyên không đổi)
// ...
export interface MissionData {
  id: string;
  title: string;
  subtitle: string;
  progress?: number;
  deadline?: string;
  iconName: keyof typeof Feather.glyphMap;
  iconColor: string;
  iconBgColor: string;
  hasNotificationDot?: boolean;
  isCompleted?: boolean;
  isRenew?: boolean;
}

const MissionCard: React.FC<{ data: MissionData; onPress?: () => void }> = memo(
  ({ data, onPress }) => {
    const {
      title,
      subtitle,
      progress,
      deadline,
      iconName,
      iconColor,
      iconBgColor,
      hasNotificationDot,
      isCompleted,
      isRenew,
    } = data;

    const isCardActive = progress !== undefined;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className={`mx-5 mb-4 overflow-hidden rounded-[20px] p-4 ${
          isCardActive ? 'bg-[#FFE4E6]' : 'border border-slate-100 bg-white'
        } ${isRenew ? 'opacity-70' : ''}`}
      >
        {isCardActive && <View className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#C8102E]" />}

        <View className={`flex-row items-center ${isCardActive ? 'pl-1' : ''}`}>
          <View
            className="h-[46px] w-[46px] items-center justify-center rounded-xl"
            style={{ backgroundColor: iconBgColor }}
          >
            <Feather name={iconName} size={24} color={iconColor} />
            {hasNotificationDot && (
              <View className="absolute right-[-4px] top-[-4px] h-3.5 w-3.5 rounded-full border-2 border-white bg-[#C8102E]" />
            )}
          </View>

          <View className="ml-3 flex-1">
            <Text className="text-[16px] font-black text-[#1E293B]">{title}</Text>
            {!isCardActive && <Text className="mb-1 text-[12px] text-[#64748B]">{subtitle}</Text>}

            {isCardActive && progress !== undefined && (
              <View className="my-1.5 flex-row items-center gap-2">
                <View className="h-1.5 flex-1 rounded-full bg-white/60">
                  <View
                    className="h-full rounded-full bg-[#C8102E]"
                    style={{ width: `${progress}%` }}
                  />
                </View>
                <Text className="text-[10px] font-bold text-[#C8102E]">{progress}%</Text>
              </View>
            )}

            <View className="flex-row items-center gap-1">
              {isRenew ? (
                <>
                  <MaterialIcons name="update" size={14} color="#C8102E" />
                  <Text className="text-[11px] font-bold text-[#C8102E]">Gia hạn ngay</Text>
                </>
              ) : deadline ? (
                <>
                  <MaterialIcons name="history" size={12} color="#C8102E" />
                  <Text className="text-[11px] font-bold text-[#C8102E]">Hết hạn: {deadline}</Text>
                </>
              ) : null}
            </View>
          </View>

          {isCompleted && (
            <View className="ml-2 h-6 w-6 items-center justify-center rounded-full bg-[#C8102E]">
              <Feather name="check" size={14} color="white" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);
MissionCard.displayName = 'MissionCard';

// ...

interface QuestMasterDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');
const drawerWidth = width * 0.8;

const FAKE_MISSIONS: MissionData[] = [
  {
    id: '1',
    title: 'Tech English',
    subtitle: 'N/A',
    progress: 75,
    deadline: '01/01/2024',
    iconName: 'cpu',
    iconBgColor: '#0F172A',
    iconColor: '#60A5FA',
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Logistics Pro',
    subtitle: 'Next: Cargo Management',
    deadline: '01/01/2024',
    iconName: 'package',
    iconBgColor: '#1E293B',
    iconColor: '#FDBA74',
    hasNotificationDot: true,
  },
  {
    id: '3',
    title: 'Marketing Lead',
    subtitle: 'Paused at Chapter 2',
    deadline: '01/01/2024',
    iconName: 'pie-chart',
    iconBgColor: '#F43F5E',
    iconColor: 'white',
  },
  {
    id: '4',
    title: 'Marketing Lead',
    subtitle: 'Paused at Chapter 2',
    iconName: 'pie-chart',
    iconBgColor: '#F43F5E',
    iconColor: 'white',
    isRenew: true,
  },
];

export const QuestMasterDrawer: React.FC<QuestMasterDrawerProps> = memo(({ visible, onClose }) => {
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -drawerWidth,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateX, overlayOpacity]);

  return (
    <View className="absolute inset-0 z-50 flex-row" pointerEvents={visible ? 'auto' : 'none'}>
      <Animated.View className="absolute inset-0" style={{ opacity: overlayOpacity }}>
        <BlurView
          intensity={120} // Tăng lên 50 để thấy mờ rõ ràng thay vì tối
          tint="light"
          style={StyleSheet.absoluteFill}
        >
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />
        </BlurView>
      </Animated.View>

      <Animated.View
        className="h-full bg-white pb-10 pt-14 shadow-2xl"
        style={{
          width: drawerWidth,
          transform: [{ translateX }],
          paddingBottom: 40,
        }}
      >
        <View className="mb-6 flex-row items-center justify-between px-5">
          <Text className="text-[22px] font-black text-[#1E293B]">Quest Master</Text>
          <TouchableOpacity onPress={onClose} className="p-1">
            <Feather name="x" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <TouchableOpacity
            activeOpacity={0.7}
            className="mx-5 mb-8 flex-row items-center justify-between rounded-2xl border border-[#FCE4E4] bg-white px-4 py-3 shadow-sm"
          >
            <View className="flex-row items-center gap-3">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-[#FCE4E4]">
                <Feather name="plus" size={18} color="#C8102E" />
              </View>
              <Text className="text-[15px] font-bold text-[#1E293B]">Add New Course</Text>
            </View>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-[#FEF9C3]">
              <Feather name="zap" size={16} color="#CA8A04" />
            </View>
          </TouchableOpacity>

          <Text className="mx-5 mb-3 text-[11px] font-bold uppercase tracking-[1.5px] text-[#8C7A78]">
            Active Missions
          </Text>

          {FAKE_MISSIONS.map(mission => (
            <MissionCard
              key={mission.id}
              data={mission}
              onPress={() => console.log('Clicked Mission:', mission.title)}
            />
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
});
QuestMasterDrawer.displayName = 'QuestMasterDrawer';
