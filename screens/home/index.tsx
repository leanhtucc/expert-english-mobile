import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';

import { FocusSessionCard, HeaderGreeting, HeroGoalCard, LearningRoadmap } from './components';

export const HomeScreen: React.FC = () => {
  const { fetchUserInfo } = useAuth();

  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const loadUserData = async () => {
      const user = await fetchUserInfo();
      if (user && user.username) {
        setUserName(user.username);
      } else {
        setUserName('Learner');
      }
    };

    loadUserData();
  }, [fetchUserInfo]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* TRUYỀN NAME VÀO COMPONENT */}
        <HeaderGreeting name={userName} />

        <HeroGoalCard />
        <View className="mt-6">
          <FocusSessionCard />
        </View>
        <View className="mt-6">
          <LearningRoadmap />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
