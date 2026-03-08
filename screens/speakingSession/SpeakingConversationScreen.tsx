import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconMicrophone } from '@/components/icon';
import { useSpeakingPractice } from '@/hooks/useSpeakingPractice';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { RootStackParamList } from '@/navigation';

import { ChatThread } from './components/ChatThread';
import { VoiceRecorderOverlay } from './components/VoiceRecorderOverlay';

type SpeakingConversationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SpeakingConversation'
>;
type SpeakingConversationScreenRouteProp = RouteProp<RootStackParamList, 'SpeakingConversation'>;

export const SpeakingConversationScreen: React.FC = () => {
  const navigation = useNavigation<SpeakingConversationScreenNavigationProp>();
  const route = useRoute<SpeakingConversationScreenRouteProp>();
  const mode = route.params?.mode || 'dual-explorer';

  const [showRecorder, setShowRecorder] = useState(false);
  const { session, isTyping, addUserMessage, simulateAIResponse } = useSpeakingPractice(mode);
  const { recordingState, startRecording, stopRecording, reset } = useVoiceRecorder();

  const handleOpenRecorder = () => {
    setShowRecorder(true);
  };

  const handleCloseRecorder = () => {
    setShowRecorder(false);
    reset();
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = async () => {
    const transcription = await stopRecording();

    if (transcription) {
      // Add user message
      addUserMessage(transcription);

      // Close recorder
      setShowRecorder(false);

      // Simulate AI response
      simulateAIResponse(transcription);
    }
  };

  const handleViewFeedback = () => {
    navigation.navigate('AIFeedback', {
      userAnswer: session.messages[session.messages.length - 1]?.text || '',
      mode: session.mode,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-200 px-5 py-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-3 h-10 w-10 items-center justify-center"
            >
              <Text className="text-2xl text-gray-700">←</Text>
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">{session.scenario}</Text>
              <Text className="mt-1 text-xs text-gray-500">
                Step {session.currentStep + 1} of {session.totalSteps}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress indicator */}
        <View className="mt-3 flex-row gap-1">
          {Array.from({ length: session.totalSteps }).map((_, index) => (
            <View
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index <= session.currentStep ? 'bg-red-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Chat Thread */}
      <ChatThread messages={session.messages} isTyping={isTyping} />

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-5 py-4">
        <View className="flex-row gap-3">
          {/* View Feedback Button (only show if there are messages) */}
          {session.messages.length > 0 && (
            <TouchableOpacity
              onPress={handleViewFeedback}
              className="flex-1 items-center rounded-full bg-gray-100 py-4"
              activeOpacity={0.8}
            >
              <Text className="font-semibold text-gray-700">View Feedback</Text>
            </TouchableOpacity>
          )}

          {/* Microphone Button */}
          <TouchableOpacity
            onPress={handleOpenRecorder}
            className="h-16 w-16 items-center justify-center rounded-full bg-red-500 shadow-lg"
            activeOpacity={0.8}
          >
            <IconMicrophone width={32} height={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Voice Recorder Overlay */}
      <VoiceRecorderOverlay
        visible={showRecorder}
        recordingState={recordingState}
        onClose={handleCloseRecorder}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />
    </SafeAreaView>
  );
};
