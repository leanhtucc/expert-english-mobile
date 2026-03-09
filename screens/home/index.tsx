import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FocusSessionCard, HeaderGreeting, HeroGoalCard, LearningRoadmap } from './components';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <HeaderGreeting />
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
