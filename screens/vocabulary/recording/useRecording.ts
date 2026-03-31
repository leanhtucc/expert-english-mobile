import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Audio } from 'expo-av';

import { submitSpeakingPronunciation } from '@/api/submitSpeakingPronunciation';

import { Question, SpeakingState } from './types';

interface UseRecordingProps {
  questions: Question[];
  onComplete?: (results: any) => void;
  lessonId?: string;
}

export const useRecording = ({ questions = [], onComplete, lessonId }: UseRecordingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<SpeakingState>('IDLE');
  const [score, setScore] = useState<number | null>(null);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền truy cập', 'Ứng dụng cần quyền sử dụng Micro để thu âm.');
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (recording) recording.stopAndUnloadAsync().catch(() => {});
      if (sound) sound.unloadAsync().catch(() => {});
    };
  }, [recording, sound]);

  const playSampleAudio = async () => {
    // Ngăn chặn việc bấm chồng chéo nếu đang ghi âm, đang xử lý điểm, hoặc đang phát âm thanh
    if (
      state === 'RECORDING' ||
      state === 'PROCESSING' ||
      state === 'PLAYING_AUDIO' ||
      !currentQuestion
    )
      return;

    // LƯU LẠI TRẠNG THÁI HIỆN TẠI ĐỂ BIẾT MÀ QUAY VỀ
    // (Nếu đang ở IDLE -> quay về IDLE. Nếu đang ở RESULT -> quay về RESULT)
    const previousState = state;

    if (!currentQuestion.audioUrl) {
      Alert.alert('Thông báo', 'Từ vựng này chưa có âm thanh mẫu.');
      return;
    }

    try {
      setState('PLAYING_AUDIO');

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentQuestion.audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          // PHỤC HỒI TRẠNG THÁI CŨ KHI PHÁT XONG
          setState(previousState);
        }
      });
    } catch (error) {
      console.log('🚨 Lỗi phát âm thanh:', error);
      setState(previousState); // Phục hồi trạng thái cũ nếu lỗi
    }
  };

  const startRecording = async () => {
    try {
      if (sound) await sound.unloadAsync().catch(() => {});
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setState('RECORDING');
    } catch (err) {
      console.error('Không thể bắt đầu thu âm', err);
      setState('IDLE');
    }
  };

  const stopRecordingAndScore = async () => {
    if (!recording) return;
    setState('PROCESSING');

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri && currentQuestion) {
        const actualVocabId = currentQuestion.vocab_id || currentQuestion.id;
        const actualReferenceText = currentQuestion.text;

        const result = await submitSpeakingPronunciation({
          audioUri: uri,
          vocabId: actualVocabId,
          referenceText: actualReferenceText,
          lessonId: lessonId,
        });

        if (result) {
          setScore(Math.round(result.score));
        } else {
          setScore(0);
        }
      }
      setState('RESULT');
    } catch (error) {
      console.error('🚨 Lỗi chấm điểm:', error);
      Alert.alert('Lỗi', 'Không thể kết nối với máy chủ chấm điểm.');
      setState('IDLE');
    }
  };

  const handleRetry = () => {
    setScore(null);
    setState('IDLE');
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setScore(null);
      setState('IDLE');
    } else {
      onComplete?.(score ?? 0);
    }
  };

  return {
    state,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    score,
    playSampleAudio,
    startRecording,
    stopRecordingAndScore,
    handleRetry,
    handleNext,
  };
};
