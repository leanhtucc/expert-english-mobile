import { Feather } from '@expo/vector-icons';

import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconConceptVocab, IconExtendDeadline, IconMascoWelcomback } from '@/components/icon';

import { PrimaryButton } from '../progressForUser/components/PrimaryButton';
import { COLORS } from './onboarding.constants';

const USER_NAME = 'Alex!';
const COURSE_NAME = 'Business English';

const Header: React.FC<{ onPress?: () => void }> = ({ onPress }) => (
  <View className="flex-row items-center px-6 pb-2 pt-4">
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="h-11 w-11 items-center justify-center"
    >
      <Feather name="arrow-left" size={26} color={COLORS.textDark} />
    </TouchableOpacity>
  </View>
);

const DropdownPill: React.FC<{ value: string; onPress?: () => void }> = ({ value, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    className="w-full flex-row items-center justify-between rounded-full px-5 py-3"
    style={{ backgroundColor: COLORS.primaryLight }}
  >
    <Text className="text-[15px] font-bold" style={{ color: COLORS.textDark }}>
      {value}
    </Text>
    <Feather name="chevron-down" size={20} color={COLORS.textGray} />
  </TouchableOpacity>
);

const ExtendDeadlineCard: React.FC = () => (
  <View
    className="mb-8 w-full rounded-[24px] p-5 pt-6"
    style={{
      backgroundColor: COLORS.white,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.04,
      shadowRadius: 16,
      elevation: 4,
    }}
  >
    <View className="mb-4 flex-row items-center">
      <View
        className="mr-4 h-[52px] w-[52px] items-center justify-center rounded-full"
        style={{ backgroundColor: COLORS.primaryLight }}
      >
        <IconExtendDeadline width={24} height={24} color={COLORS.primaryDark} />
      </View>
      <View className="flex-1 justify-center">
        <Text className="text-[18px] font-extrabold" style={{ color: COLORS.textDark }}>
          Extend Deadline
        </Text>
        <Text className="mt-0.5 text-[14px] font-medium" style={{ color: '#8C7A78' }}>
          Choose a new completion date
        </Text>
      </View>
    </View>
    <DropdownPill value="A week" />
  </View>
);

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    className="mt-4 h-[60px] w-full flex-row items-center justify-center rounded-full"
    style={{
      borderWidth: 1.5,
      borderColor: COLORS.border,
      backgroundColor: COLORS.white,
    }}
  >
    <IconConceptVocab width={22} height={22} color={COLORS.primaryDark} />

    <Text className="ml-3 text-[16px] font-bold" style={{ color: COLORS.textDark }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function RenewalScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <Header onPress={() => console.log('Go back')} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8 mt-4 w-full items-center justify-center">
          <IconMascoWelcomback width={220} height={220} />
        </View>

        <View className="mb-10 w-full items-center">
          <Text
            className="mb-4 text-center text-[28px] font-bold"
            style={{ color: COLORS.textDark, fontFamily: 'PlusJakartaSans-SemiBold' }}
            numberOfLines={1}
          >
            Welcome back, <Text style={{ color: COLORS.primary }}>{USER_NAME}</Text>
          </Text>
          <View className="w-full max-w-[300px] px-4 py-3">
            <Text className="text-center text-[18px] leading-[29px]">
              Your <Text className="text-[20px] text-[#5C403F]">{COURSE_NAME}</Text> course has
              expired. Let&apos;s get you back on track.
            </Text>
          </View>
        </View>

        {/* Card đã được chỉnh lại */}
        <ExtendDeadlineCard />

        <PrimaryButton
          title="Continue This Course"
          buttonHeight={60}
          onPress={() => console.log('Continue course')}
          icon={<Feather name="arrow-right" size={20} color="white" />}
        />

        <SecondaryButton title="Update Learning Goal" onPress={() => console.log('Update goal')} />
      </ScrollView>
    </SafeAreaView>
  );
}
