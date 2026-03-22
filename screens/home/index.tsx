import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconRobot } from '@/components/icon';
import { useAuth } from '@/hooks/useAuth';
import { useLearningData } from '@/hooks/useLearningData';

import { FocusSessionCard, HeaderGreeting, HeroGoalCard, LearningRoadmap } from './components';

export const HomeScreen: React.FC = () => {
  const { fetchUserInfo } = useAuth();
  const { loading, currentPath, roadmap, todayLesson } = useLearningData();
  const [userName, setUserName] = useState<string>('Learner');

  useEffect(() => {
    fetchUserInfo().then(user => user && setUserName(user.username));
  }, [fetchUserInfo]);
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="mb-10 h-20 w-20 items-center justify-center rounded-full bg-red-50">
          {/* Thay bằng icon logo của bạn */}
          <IconRobot width={200} height={200} />
        </View>
        <ActivityIndicator size="small" color="#C8102E" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderGreeting name={userName} />

        {/* Level động từ Path */}
        <HeroGoalCard level={currentPath?.target_level?.toUpperCase()} />

        {/* Bài học Today động từ Lesson */}
        <View className="mt-6">
          <FocusSessionCard
            title={todayLesson?.name_en}
            category={todayLesson?.lesson_type?.toUpperCase()}
            description={todayLesson?.name_vi}
            onPress={() => console.log('Ghé thăm lesson:', todayLesson?._id)}
          />
        </View>

        {/* Toàn bộ Roadmap động */}
        <View className="mt-6">
          <LearningRoadmap items={roadmap} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
