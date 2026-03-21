import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockFillBlankQuestions } from '../__mocks__';
import { FillBlankScreen } from '../fill-blank/FillBlankScreen';

export const DemoFillBlankScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <FillBlankScreen questions={mockFillBlankQuestions} onBack={() => {}} onClose={() => {}} />
    </SafeAreaView>
  );
};
