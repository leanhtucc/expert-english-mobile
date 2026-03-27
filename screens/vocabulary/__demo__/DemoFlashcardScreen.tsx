import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { useLessonFlow } from '@/hooks/useLessonFlow';

import { FlashcardScreen } from '../flashcard/FlashcardScreen';

type RouteParams = {
  lessonId?: string;
};

export const DemoFlashcardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { lessonId } = (route.params || {}) as RouteParams;
  const { loading, flashcards, error } = useLessonFlow(lessonId || '');

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleComplete = () => {
    navigation.replace('DemoLessonResultScreen', { lessonId });
  };

  if (!lessonId) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-[16px] text-slate-600">
          Khong tim thay lessonId de mo man hinh flashcard.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#C8102E" />
        <Text className="mt-4 text-[16px] text-slate-500">Dang tai flashcard...</Text>
      </View>
    );
  }

  if (error || flashcards.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-[16px] text-slate-500">
          {error || 'Bai hoc nay chua co the flashcard.'}
        </Text>
      </View>
    );
  }

  return (
    <FlashcardScreen
      flashcards={flashcards}
      onBack={handleClose}
      onClose={handleClose}
      onComplete={handleComplete}
    />
  );
};
