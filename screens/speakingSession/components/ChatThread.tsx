import React from 'react';
import { ScrollView, View } from 'react-native';

import { ChatMessage } from '@/types/speaking.types';

import { ChatBubbleAI } from './ChatBubbleAI';
import { ChatBubbleUser } from './ChatBubbleUser';
import { TypingIndicator } from './TypingIndicator';

interface ChatThreadProps {
  messages: ChatMessage[];
  isTyping?: boolean;
}

export const ChatThread: React.FC<ChatThreadProps> = ({ messages, isTyping = false }) => {
  return (
    <ScrollView
      className="flex-1 px-4"
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {messages.map(message => (
        <View key={message.id}>
          {message.role === 'ai' ? (
            <ChatBubbleAI message={message} />
          ) : (
            <ChatBubbleUser message={message} />
          )}
        </View>
      ))}

      {isTyping && <TypingIndicator />}
    </ScrollView>
  );
};
