import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockImageQuizQuestions } from '../__mocks__';
import { ImageQuizScreen } from '../image-quiz/ImageQuizScreen';

export const DemoImageQuizScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <ImageQuizScreen questions={mockImageQuizQuestions} onBack={() => {}} onClose={() => {}} />
    </SafeAreaView>
  );
};
