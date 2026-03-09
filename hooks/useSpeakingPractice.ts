import { useCallback, useState } from 'react';

import { ChatMessage, LessonStep, PracticeMode, SpeakingSession } from '@/types/speaking.types';

// Mock lesson steps
const mockSteps: LessonStep[] = [
  {
    id: '1',
    question:
      'Could you walk me through the Q3 financial projections for the manufacturing sector?',
    translation: 'Bạn có thể cho tôi biết dự báo tài chính quý 3 cho lĩnh vực sản xuất không?',
  },
  {
    id: '2',
    question: 'How does this compare to our performance in Q2?',
    translation: 'Điều này so sánh với hiệu suất của chúng ta trong quý 2 như thế nào?',
  },
  {
    id: '3',
    question: 'What are the main factors driving this growth?',
    translation: 'Những yếu tố chính thúc đẩy sự tăng trưởng này là gì?',
  },
];

export const useSpeakingPractice = (mode: PracticeMode) => {
  const [session, setSession] = useState<SpeakingSession>({
    id: Date.now().toString(),
    mode,
    scenario: 'Security Protocol Scenario',
    currentStep: 0,
    totalSteps: mockSteps.length,
    messages: [],
    steps: mockSteps,
  });

  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    setSession(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    return newMessage;
  }, []);

  const addUserMessage = useCallback(
    (text: string) => {
      return addMessage({
        role: 'user',
        text,
      });
    },
    [addMessage]
  );

  const addAIMessage = useCallback(
    (text: string, translation?: string, score?: number) => {
      return addMessage({
        role: 'ai',
        text,
        translation,
        score,
      });
    },
    [addMessage]
  );

  const simulateAIResponse = useCallback(
    (_userInput: string) => {
      setIsTyping(true);

      // Simulate AI thinking time
      setTimeout(() => {
        const currentStep = session.steps[session.currentStep];

        // Add AI response
        addAIMessage(currentStep.question, currentStep.translation, 85);

        setIsTyping(false);
      }, 2000);
    },
    [session.currentStep, session.steps, addAIMessage]
  );

  const nextQuestion = useCallback(() => {
    setSession(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps - 1),
    }));
  }, []);

  const reset = useCallback(() => {
    setSession({
      id: Date.now().toString(),
      mode,
      scenario: 'Security Protocol Scenario',
      currentStep: 0,
      totalSteps: mockSteps.length,
      messages: [],
      steps: mockSteps,
    });
  }, [mode]);

  return {
    session,
    isTyping,
    addUserMessage,
    addAIMessage,
    simulateAIResponse,
    nextQuestion,
    reset,
  };
};
