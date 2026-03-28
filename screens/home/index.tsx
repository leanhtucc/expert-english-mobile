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

// 👇 1. ĐỔI TÊN IMPORT TỪ MODAL THÀNH DRAWER
import {
  FocusSessionCard,
  HeaderGreeting,
  HeroGoalCard,
  LearningRoadmap,
  QuestMasterDrawer,
} from './components';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const showToast = useToastStore(state => state.showToast);

  const { fetchUserInfo } = useAuth();
  const [userName, setUserName] = useState<string>('Người học');

  // State quản lý đóng mở Menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { loading, currentPath, modules, roadmap, todayLesson } = useLearningData();

  useEffect(() => {
    fetchUserInfo().then(user => user && setUserName(user.username));
  }, [fetchUserInfo]);

  const handleLessonPress = (lessonId: string, status: string) => {
    if (status === 'locked') {
      showToast('Vui lòng hoàn thành các bài học trước đó!');
      return;
    }
    navigation.navigate('VocabularyListScreen', { lessonId });
  };

  // ==========================================
  // RENDER UI
  // ==========================================
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <View className="mb-10 h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <IconRobot width={200} height={200} />
        </View>
        <ActivityIndicator size="small" color="#C8102E" />
      </View>
    );
  }

  return (
    // SafeAreaView bao ngoài z-index 10
    <SafeAreaView className="z-10 flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="z-10"
      >
        {/* NÚT MENU CỦA HEADER ĐỂ MỞ DRAWER */}
        <HeaderGreeting name={userName} onMenuPress={() => setIsMenuVisible(true)} />

        <HeroGoalCard level={currentPath?.target_level?.toUpperCase() || 'BEGINNER'} />

        <View className="z-10 mt-6">
          <FocusSessionCard
            title={todayLesson?.name_vi || todayLesson?.name_en || 'Chưa có bài học'}
            category={todayLesson?.lesson_type?.toUpperCase() || 'VOCABULARY'}
            description={todayLesson?.name_en || 'Hãy bắt đầu hành trình học tập ngay hôm nay!'}
            onPress={() => {
              const lessonId = todayLesson?._id;
              if (!lessonId) {
                showToast('Không tìm thấy bài học hiện tại!');
                return;
              }
              navigation.navigate('VocabularyListScreen', { lessonId });
            }}
          />
        </View>

        <View className="z-10 mt-8 flex-1">
          <LearningRoadmap
            pathTitle={currentPath?.name_vi || currentPath?.name_en || 'Khóa học chưa có tên'}
            modules={modules}
            items={roadmap}
            onLessonPress={handleLessonPress}
          />
        </View>

        <View className="z-10 mx-4 mt-1 items-center rounded-[24px] bg-[#FCF0F1] py-8">
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
          <Text className="mb-2 text-[18px] font-bold text-[#4A3B39]">
            Mở khóa Module Tiếp Theo
          </Text>
          <Text className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#8C7A78]">
            Hoàn thành Module hiện tại để tiếp tục
          </Text>
        </View>
      </ScrollView>

      {/* 👇 2. NHÚNG CUSTOM DRAWER MỚI VÀO ĐÂY (NỔI TRÊN SCROLLVIEW NHỜ ABSOLUTE + Z-50) */}
      <QuestMasterDrawer
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)} // Action đóng
      />
    </SafeAreaView>
  );
};
