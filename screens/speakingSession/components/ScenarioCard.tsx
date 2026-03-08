import React from 'react';
import { View } from 'react-native';

import { PracticeMode, ScenarioPreview } from '@/types/speaking.types';

import { ChatBubbleAI } from './ChatBubbleAI';
import { ChatBubbleUser } from './ChatBubbleUser';

interface ScenarioCardProps {
  scenario: ScenarioPreview;
  mode: PracticeMode;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, mode }) => {
  return (
    <View>
      {/* AI Question */}
      <ChatBubbleAI
        message={{
          id: '1',
          role: 'ai',
          text: scenario.question,
          translation: scenario.translation,
          timestamp: Date.now(),
          score: scenario.progress,
        }}
        role={scenario.role}
        showAvatar={true}
        mode={mode}
      />

      {/* User Example Answer */}
      <ChatBubbleUser
        message={{
          id: '2',
          role: 'user',
          text: scenario.exampleAnswer,
          translation: scenario.exampleAnswerTranslation,
          timestamp: Date.now(),
        }}
        role="YOUR RESPONSE"
        showAvatar={true}
        mode={mode}
      />
    </View>
  );
};
