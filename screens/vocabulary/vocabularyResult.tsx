import React from 'react';

import { LessonSummaryData, LessonSummaryScreen } from './result';

/**
 * VocabularyResult Screen
 *
 * Displays the lesson summary after completing vocabulary exercises.
 * This is a wrapper around the LessonSummaryScreen component.
 *
 * Example usage:
 *
 * const summaryData: LessonSummaryData = {
 *   totalWords: 15,
 *   accuracy: 87,
 *   timeSpent: '4:20',
 *   masteredWords: 13,
 *   streak: 5
 * };
 *
 * <VocabularyResult
 *   data={summaryData}
 *   onStartSpeaking={() => navigation.navigate('Speaking')}
 *   onViewVocabulary={() => navigation.navigate('VocabularyList')}
 * />
 */

interface VocabularyResultProps {
  data: LessonSummaryData;
  onStartSpeaking?: () => void;
  onViewVocabulary?: () => void;
  onContinue?: () => void;
  showSpeakingButton?: boolean;
}

export const VocabularyResult: React.FC<VocabularyResultProps> = props => {
  return <LessonSummaryScreen {...props} />;
};

export default VocabularyResult;
