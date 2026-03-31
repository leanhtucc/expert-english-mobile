import React from 'react';
import { View } from 'react-native';

import { PracticeMode, ScenarioPreview } from '@/types/speaking.types';

import { ChatBubbleAI } from './ChatBubbleAI';
import { ChatBubbleUser } from './ChatBubbleUser';

interface ScenarioCardProps {
  scenario: ScenarioPreview;
  mode: PracticeMode;
  showWordFeedback?: boolean;
  showUserBubble?: boolean;
  // 🌟 THÊM PROPS NÀY
  onToggleFeedback?: () => void;
  isFeedbackVisible?: boolean;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  mode,
  showWordFeedback = false,
  showUserBubble = true,
  onToggleFeedback,
  isFeedbackVisible = false,
}) => {
  return (
    <View>
      <ChatBubbleAI
        message={{
          id: '1',
          role: 'ai',
          text: scenario.question,
          translation: scenario.translation,
          timestamp: Date.now(),
        }}
        role={scenario.role}
        showAvatar={true}
        mode={mode}
      />

      {showUserBubble ? (
        <ChatBubbleUser
          message={{
            id: '2',
            role: 'user',
            text: scenario.exampleAnswer,
            translation: scenario.exampleAnswerTranslation,
            timestamp: Date.now(),
            score: scenario.score,
            pronunciationSegments: scenario.pronunciationSegments,
          }}
          role="BẠN"
          showAvatar={true}
          mode={mode}
          showWordFeedback={showWordFeedback}
          // 🌟 TRUYỀN XUỐNG DƯỚI
          onToggleFeedback={onToggleFeedback}
          isFeedbackVisible={isFeedbackVisible}
        />
      ) : null}
    </View>
  );
};
