import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockMultipleChoiceQuestions } from '../__mocks__';
import { MultipleChoiceScreen } from '../multiple-choice/MultipleChoiceScreen';

export const DemoMultipleChoiceScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <MultipleChoiceScreen
        questions={mockMultipleChoiceQuestions}
        onBack={() => {}}
        onClose={() => {}}
      />
    </SafeAreaView>
  );
};
