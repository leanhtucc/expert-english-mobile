import { useCallback, useState } from 'react';

import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

import { RecordingState } from '@/types/speaking.types';

export const useVoiceRecorder = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  const stopRecording = useCallback(async () => {
    if (!recorder || !recorderState.isRecording) return;

    try {
      setRecordingState('processing');
      await recorder.stop();
      // const uri = recorder.uri; // Available for future use
      // Simulate speech-to-text processing
      return new Promise<string>(resolve => {
        setTimeout(() => {
          setRecordingState('idle');
          resolve('This is a simulated transcription of your speech.');
        }, 1500);
      });
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setRecordingState('idle');
      return null;
    }
  }, [recorder, recorderState.isRecording]);

  const startRecording = useCallback(async () => {
    try {
      // Request permissions
      const { status } = await requestRecordingPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Audio permission not granted');
        return;
      }

      // Configure audio mode
      await setAudioModeAsync({
        allowsRecording: true,
      });

      setRecordingState('recording');

      // Start recording
      await recorder.record();

      // Auto-stop after 5 seconds (simulated)
      setTimeout(() => {
        if (recorderState.isRecording) {
          stopRecording();
        }
      }, 5000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setRecordingState('idle');
    }
  }, [recorder, recorderState.isRecording, stopRecording]);

  const reset = useCallback(() => {
    setRecordingState('idle');
  }, []);

  return {
    recordingState,
    startRecording,
    stopRecording,
    reset,
  };
};
