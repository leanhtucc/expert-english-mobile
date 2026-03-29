import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Audio } from 'expo-av';

import { Question, SpeakingState } from './types';

interface UseRecordingProps {
  questions: Question[];
  onComplete?: (results: any) => void;
}

// BẢO VỆ LỖI: Gán questions mặc định là mảng rỗng [] nếu bị undefined
export const useRecording = ({ questions = [], onComplete }: UseRecordingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<SpeakingState>('IDLE');
  const [score, setScore] = useState<number | null>(null);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // An toàn lấy câu hỏi hiện tại
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
      if (recording) recording.stopAndUnloadAsync();
      if (sound) sound.unloadAsync();
    };
  }, [recording, sound]);

  const playSampleAudio = async () => {
    if (state === 'RECORDING' || state === 'PROCESSING' || !currentQuestion) return;
    try {
      setState('PLAYING_AUDIO');
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentQuestion.audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          setState('IDLE');
        }
      });
    } catch (error) {
      console.log('Lỗi phát âm thanh', error);
      setState('IDLE');
    }
  };

  const startRecording = async () => {
    try {
      if (sound) await sound.unloadAsync();
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
      setRecording(null);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setScore(Math.floor(Math.random() * 31) + 70);
      setState('RESULT');
    } catch (error) {
      console.error('Lỗi khi dừng thu âm', error);
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
      Alert.alert('Hoàn thành', 'Bạn đã hoàn thành bài luyện tập!');
      onComplete?.({});
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
