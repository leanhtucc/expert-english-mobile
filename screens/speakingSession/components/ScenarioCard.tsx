import React from 'react';
import { View } from 'react-native';

import { PracticeMode, ScenarioPreview } from '@/types/speaking.types';

import { ChatBubbleAI } from './ChatBubbleAI';
import { ChatBubbleUser } from './ChatBubbleUser';

interface ScenarioCardProps {
  scenario: ScenarioPreview;
  mode: PracticeMode;
  /** Chỉ màn Nâng cao: tô màu phát âm theo từ */
  showWordFeedback?: boolean;
  /** false khi người học chưa nói (ẩn bubble trả lời). */
  showUserBubble?: boolean;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  mode,
  showWordFeedback = false,
  showUserBubble = true,
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
            score: scenario.progress,
            pronunciationSegments: scenario.pronunciationSegments,
          }}
          role="BẠN"
          showAvatar={true}
          mode={mode}
          showWordFeedback={showWordFeedback}
        />
      ) : null}
    </View>
  );
};
