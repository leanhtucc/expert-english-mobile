import Animated, { FadeInDown } from 'react-native-reanimated';

import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconCongration7D, IconSalesWhite } from '@/components/icon';

import { PrimaryButton } from '../components/PrimaryButton';
import { useProgress } from '../hooks/useProgress';

export const StreakCompleteScreen = ({ navigation }: any) => {
  useProgress();

  return (
    <SafeAreaView className="flex-1 bg-[#F6F3F2]">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 justify-between px-6 pb-8 pt-4">
        {/* Hero Section */}
        <View className="relative mt-8 flex-1 items-center justify-center">
          <IconCongration7D width={380} height={380} />
        </View>

        {/* Text Section */}
        <View className="mt-10 items-center">
          <Animated.Text
            entering={FadeInDown.delay(200)}
            className="text-center text-[32px] font-extrabold leading-[40px] text-[#2B1D1D]"
          >
            Chặng đường 7{'\n'}ngày{'\n'}hoàn tất!
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(300)}
            className="mb-10 mt-4 text-center text-[15px] leading-6 text-[#7A6F6F]"
          >
            Bạn đã duy trì thói quen học tập tuyệt{'\n'}vời. Bạn đang dẫn đầu top 5% học{'\n'}viên
            tích cực nhất.
          </Animated.Text>

          {/* Action Buttons */}
          <Animated.View entering={FadeInDown.delay(400)} className="w-[100%] items-center">
            <PrimaryButton
              title="Xem thành tích của tôi"
              icon={<IconSalesWhite width={20} height={20} />}
              buttonHeight={66}
              onPress={() => navigation.navigate('ProgressAnalysis')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('WeekUnlock')}
              className="mt-4 p-2"
            >
              <Text className="text-[16px] font-bold text-[#D90429]">Bắt đầu Tuần 2</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};
