import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconMicrophone } from '@/components/icon';
import { RootStackParamList } from '@/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * Quick Launch Button for Speaking Practice
 *
 * Add this to any screen to quickly test the speaking practice flow:
 *
 * import { SpeakingPracticeLauncher } from '@/screens/speakingSession';
 *
 * <SpeakingPracticeLauncher />
 */
export const SpeakingPracticeLauncher: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="p-4">
      <TouchableOpacity
        onPress={() => navigation.navigate('PracticeSetup')}
        className="rounded-2xl bg-red-500 py-4 px-6 shadow-lg"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-center">
          <IconMicrophone width={24} height={24} color="white" />
          <Text className="ml-2 text-center text-lg font-bold text-white">
            Start Speaking Practice
          </Text>
        </View>
        <Text className="mt-1 text-center text-sm text-white/80">AI Voice Conversation</Text>
      </TouchableOpacity>
    </View>
  );
};
