// Import thêm MaterialIcons cho biểu tượng ổ khóa
import { MaterialIcons } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconRobot } from '@/components/icon';
import { useAuth } from '@/hooks/useAuth';
import { useLearningData } from '@/hooks/useLearningData';
import { useToastStore } from '@/stores/toast.store';

import { FocusSessionCard, HeaderGreeting, HeroGoalCard, LearningRoadmap } from './components';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const showToast = useToastStore(state => state.showToast);
  const { fetchUserInfo } = useAuth();
  const { loading, currentPath, roadmap, todayLesson } = useLearningData();
  const [userName, setUserName] = useState<string>('Learner');

  useEffect(() => {
    fetchUserInfo().then(user => user && setUserName(user.username));
  }, [fetchUserInfo]);

  // HÀM XỬ LÝ KHI BẤM VÀO 1 BÀI HỌC
  const handleLessonPress = (lessonId: string, status: string) => {
    if (status === 'locked') {
      showToast('Vui lòng hoàn thành các bài học trước đó!');
      return;
    }
    // SỬA Ở ĐÂY: Chuyển hướng sang màn hình chi tiết ngày học (DayDetailScreen)
    // Truyền kèm lessonId để màn hình kia biết lấy dữ liệu của ngày nào
    navigation.navigate('DayDetailScreen', { lessonId: lessonId });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="mb-10 h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <IconRobot width={200} height={200} />
        </View>
        <ActivityIndicator size="small" color="#C8102E" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      {/* Đảm bảo contentContainerStyle có paddingBottom để không bị lẹm thẻ cuối cùng khi cuộn */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <HeaderGreeting name={userName} />

        {/* Level động từ Path */}
        <HeroGoalCard level={currentPath?.target_level?.toUpperCase()} />

        {/* Bài học Today động từ Lesson */}
        <View className="mt-6">
          <FocusSessionCard
            title={todayLesson?.name_en}
            category={todayLesson?.lesson_type?.toUpperCase()}
            description={todayLesson?.name_vi}
            onPress={() => navigation.navigate('VocabularyListScreen')}
          />
        </View>

        <View>
          <LearningRoadmap items={roadmap} onLessonPress={handleLessonPress} />
        </View>

        <View className="mx-4 mt-2 items-center rounded-[24px] bg-[#FCF0F1] py-8">
          <View
            className="mb-4 h-[52px] w-[52px] items-center justify-center rounded-full bg-white"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <MaterialIcons name="lock" size={24} color="#4A3B39" />
          </View>

          <Text className="mb-2 text-[18px] font-bold text-[#4A3B39]">Unlock Week 2</Text>

          <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#8C7A78]">
            Complete week 1 to continue
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
