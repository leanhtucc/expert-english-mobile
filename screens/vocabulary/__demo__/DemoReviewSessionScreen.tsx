import React from 'react';

import { mockLessonResultExcellent } from '../__mocks__';
import { LessonSummaryScreen } from '../result/LessonSummaryScreen';

export const DemoReviewSessionScreen: React.FC = () => {
  return (
    <LessonSummaryScreen
      data={{ ...mockLessonResultExcellent, weakWords: 3 }}
      onRestart={() => {}}
      onReviewWeak={() => {}}
      onClose={() => {}}
    />
  );
};
