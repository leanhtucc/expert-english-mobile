import React from 'react';

import { mockLessonResultExcellent } from '../__mocks__';
import { SessonSummaryScreen } from '../result/SessonSummaryScreen';

export const DemoReviewSessionScreen: React.FC = () => {
  return (
    <SessonSummaryScreen
      data={{ ...mockLessonResultExcellent, weakWords: 3 }}
      onRestart={() => {}}
      onReviewWeak={() => {}}
      onClose={() => {}}
    />
  );
};
