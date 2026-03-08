import { useCallback, useState } from 'react';

import { Audio } from 'expo-av';

import { RecordingState } from '@/types/speaking.types';

export const useVoiceRecorder = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const stopRecording = useCallback(async () => {
    if (!recording) return;

    try {
      setRecordingState('processing');
      await recording.stopAndUnloadAsync();
      // const uri = recording.getURI(); // Available for future use
      setRecording(null);

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
  }, [recording]);

  const startRecording = useCallback(async () => {
    try {
      // Request permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Audio permission not granted');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      setRecordingState('recording');

      // Create recording
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);

      // Auto-stop after 5 seconds (simulated)
      setTimeout(() => {
        if (newRecording) {
          stopRecording();
        }
      }, 5000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setRecordingState('idle');
    }
  }, [stopRecording]);

  const reset = useCallback(() => {
    setRecordingState('idle');
    setRecording(null);
  }, []);

  return {
    recordingState,
    startRecording,
    stopRecording,
    reset,
  };
};
