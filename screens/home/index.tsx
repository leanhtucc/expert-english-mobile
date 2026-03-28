import { MaterialIcons } from '@expo/vector-icons';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconRobot } from '@/components/icon';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAuth } from '@/hooks/useAuth';
import { useRoadmapData } from '@/hooks/useRoadmapData';
import { CARD_BG_DARK } from '@/screens/profile/constants/profile.constants';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import { RoadmapLesson, RoadmapModule, RoadmapPath } from '@/types/api/learningPath.response';

import { FocusSessionCard, HeaderGreeting, HeroGoalCard, LearningRoadmap } from './components';

export const HomeScreen: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const showToast = useToastStore(state => state.showToast);
  const { fetchUserInfo } = useAuth();
  const [userName, setUserName] = useState<string>('Người học');

  const accessToken = useAuthStore(state => state.accessToken);
  const { loading, data } = useRoadmapData(accessToken || '');

  useEffect(() => {
    fetchUserInfo().then(user => user && setUserName(user.username));
  }, [fetchUserInfo]);

  // Xử lý khi bấm vào bài học trên cây Roadmap
  const handleLessonPress = (lessonId: string, status: string) => {
    if (status === 'locked') {
      showToast('Vui lòng hoàn thành các bài học trước đó!');
      return;
    }
    navigation.navigate('VocabularyListScreen', { lessonId });
  };

  // ==========================================
  // BÓC TÁCH DỮ LIỆU TỪ API ROADMAP CHUẨN XÁC
  // ==========================================
  let roadmapItems: any[] = [];
  let todayLesson: RoadmapLesson | null = null;
  let currentPath: RoadmapPath | null = null;
  let currentModule: RoadmapModule | null = null;

  if (data && data.learning_path) {
    currentPath = data.learning_path;

    // Tìm module đang học (is_current) hoặc fallback về module đầu tiên
    currentModule = data.learning_modules?.find(m => m.is_current) || data.learning_modules?.[0];

    if (currentModule && currentModule.lessons) {
      // 1. Tạo danh sách nốt vẽ Roadmap
      roadmapItems = currentModule.lessons.map((lesson, idx) => {
        // Tạm thời mở khoá bài đang học và bài đầu tiên
        let status: 'completed' | 'active' | 'locked' = 'locked';
        if (lesson.is_current || idx === 0) status = 'active';

        return {
          _id: lesson._id,
          displayDate: `Bài ${idx + 1}`, // Hiện chữ "Bài 1", "Bài 2" cho đẹp
          name_en: lesson.name_en,
          name_vi: lesson.name_vi,
          status,
        };
      });

      // 2. Tìm bài học Focus cho thẻ to nhất (Hôm nay)
      todayLesson = currentModule.lessons.find(l => l.is_current) || currentModule.lessons[0];
    }
  }

  // ==========================================
  // RENDER UI
  // ==========================================
  if (loading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <View
          className="mb-10 h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: isDark ? colors.surface : '#FEF2F2' }}
        >
          <IconRobot width={200} height={200} />
        </View>
        <ActivityIndicator size="small" color="#C8102E" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <HeaderGreeting name={userName} />

        {/* Level động từ Path */}
        <HeroGoalCard level={currentPath?.target_level?.toUpperCase() || 'BEGINNER'} />

        {/* Thẻ Bài học Today */}
        <View className="mt-6">
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

        {/* Bản đồ Roadmap */}
        <View>
          <LearningRoadmap items={roadmapItems} onLessonPress={handleLessonPress} />
        </View>

        <View
          className="mx-4 mt-1 items-center rounded-[24px] py-8"
          style={{
            backgroundColor: isDark ? CARD_BG_DARK : '#FCF0F1',
          }}
        >
          <View
            className="mb-4 h-[52px] w-[52px] items-center justify-center rounded-full"
            style={{
              backgroundColor: isDark ? colors.surfaceElevated : '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isDark ? 0.35 : 0.05,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <MaterialIcons name="lock" size={24} color={isDark ? colors.text : '#4A3B39'} />
          </View>
          <Text className="mb-2 text-[18px] font-bold" style={{ color: colors.text }}>
            Mở khóa Module Tiếp Theo
          </Text>
          <Text
            className="text-[11px] font-bold uppercase tracking-[1.5px]"
            style={{ color: colors.muted }}
          >
            Hoàn thành Module hiện tại để tiếp tục
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
