import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { mockLessonResultExcellent } from '../__mocks__';
import { LessonSummaryScreen } from '../result';

export const DemoLessonResultScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const lessonId = route.params?.lessonId;

  const handleClose = () => {
    navigation.goBack();
  };

  const handleRestart = () => {
    if (lessonId) {
      navigation.replace('DemoFlashcardScreen', { lessonId });
      return;
    }
    navigation.goBack();
  };

  return (
    <LessonSummaryScreen
      data={{ ...mockLessonResultExcellent, weakWords: 3 }}
      onRestart={handleRestart}
      onReviewWeak={handleRestart}
      onClose={handleClose}
    />
  );
};
