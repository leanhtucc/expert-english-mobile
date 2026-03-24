import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { learningApi } from '@/api/endpoints/learning.api';
import { CustomText as Text } from '@/components/ui/CustomText';
import { useLessonFlow } from '@/hooks/useLessonFlow';

import { FlashcardScreen } from './flashcard/FlashcardScreen';
import { SessonSummaryScreen } from './result/SessonSummaryScreen';

type ParamList = {
  VocabularyLearning: {
    lessonId: string;
  };
};

type Step = 'FLASHCARD' | 'SUMMARY';

export default function VocabularyLearning() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'VocabularyLearning'>>();
  const { lessonId } = route.params || {};

  // FETCH DATA
  const { loading, flashcards, error, refetch } = useLessonFlow(lessonId);

  // QUẢN LÝ LUỒNG
  const [currentStep, setCurrentStep] = useState<Step>('FLASHCARD');

  // Đóng màn hình
  const handleClose = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#C8102E" />
        <Text className="mt-4 text-[16px] text-slate-500">Đang chuẩn bị thẻ từ vựng...</Text>
      </View>
    );
  }

  if (error || flashcards.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="mt-4 text-[16px] text-slate-500">
          {error || 'Chưa có từ vựng nào trong bài học này.'}
        </Text>
      </View>
    );
  }

  if (currentStep === 'FLASHCARD') {
    return (
      <FlashcardScreen
        // Truyền mảng flashcards vào kèm key để khi refetch nó reset Component về thẻ đầu tiên
        key={flashcards.length ? 'loaded' : 'loading'}
        flashcards={flashcards as any}
        onClose={handleClose}
        onBack={handleClose}
        onComplete={() => setCurrentStep('SUMMARY')}
      />
    );
  }

  if (currentStep === 'SUMMARY') {
    return (
      <SessonSummaryScreen
        data={{
          totalWords: flashcards.length,
          accuracy: 100,
          timeSpent: '02:30',
        }}
        onClose={handleClose}
        onRestart={async () => {
          try {
            console.log('🔄 Đang reset tiến độ lesson...');

            // GỌI API & HỨNG DATA ĐỂ LOG
            const resetRes = await learningApi.resetLessonFlashcards({ lesson_id: lessonId });
            console.log('✅ [RESET LESSON] Response:', resetRes.data);

            console.log('🔄 Đang tải lại data mới...');
            await refetch();
          } catch (err: any) {
            console.log('🚨 [RESET LỖI]:', err?.response?.data || err.message);
          }
          setCurrentStep('FLASHCARD');
        }}
      />
    );
  }

  return null;
}
