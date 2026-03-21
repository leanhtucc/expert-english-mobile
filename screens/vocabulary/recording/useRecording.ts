import { useCallback, useRef, useState } from 'react';

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioUrl?: string;
}

interface UseRecordingProps {
  onRecordingComplete?: (audioUrl: string) => void;
}

export const useRecording = ({ onRecordingComplete }: UseRecordingProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setIsPaused(false);
    setDuration(0);
    setAudioUrl(undefined);

    // Start timer
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    // TODO: Implement actual recording logic
    console.log('Recording started');
  }, []);

  const pauseRecording = useCallback(() => {
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    console.log('Recording paused');
  }, []);

  const resumeRecording = useCallback(() => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    console.log('Recording resumed');
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // TODO: Implement actual recording stop and file generation
    const mockAudioUrl = 'mock-audio-url.mp3';
    setAudioUrl(mockAudioUrl);

    console.log('Recording stopped');

    // Analyze recording
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      onRecordingComplete?.(mockAudioUrl);
    }, 2000);
  }, [onRecordingComplete]);

  const reset = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);
    setDuration(0);
    setAudioUrl(undefined);
    setIsAnalyzing(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    isRecording,
    isPaused,
    duration,
    audioUrl,
    isAnalyzing,
    formattedDuration: formatDuration(duration),
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    reset,
  };
};
