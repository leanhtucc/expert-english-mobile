import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import type { RecordingOptions } from 'expo-audio';

import { waitRecordingFileReady } from '@/utils/waitRecordingFileReady';

/** Giống useMicLevelForVisualizer — đồng bộ sóng với file ghi thật */
function dbToUnit(db: number): number {
  const t = Math.min(1, Math.max(0, (db + 52) / 52));
  const boosted = Math.pow(t, 0.68);
  return Math.min(1, Math.max(0.04, boosted));
}

const basePreset = RecordingPresets.HIGH_QUALITY;

/** AAC/m4a — iOS & Android (không chuyển định dạng sau khi ghi). */
const SPEAKING_RECORD: RecordingOptions = {
  ...basePreset,
  isMeteringEnabled: true,
  numberOfChannels: 1,
  bitRate: 128000,
  extension: '.m4a',
  android: {
    ...basePreset.android,
    extension: '.m4a',
    sampleRate: 44100,
  },
  ios: {
    ...basePreset.ios,
    extension: '.m4a',
  },
  web: basePreset.web,
};

/**
 * Ghi expo-audio → URI file .m4a (AAC).
 * Web: sóng giả lập, không có URI.
 */
export function useSpeakingPronunciationRecorder() {
  const [micLevel, setMicLevel] = useState(0.22);
  const smoothRef = useRef(0.22);
  const webTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingActiveRef = useRef(false);

  const recorder = useAudioRecorder(SPEAKING_RECORD);
  const recorderState = useAudioRecorderState(recorder, 32);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    if (!recorderState.isRecording) return;

    let next: number;
    if (recorderState.metering !== undefined) {
      next = dbToUnit(recorderState.metering);
    } else {
      next = Math.min(1, Math.max(0.12, smoothRef.current + (Math.random() - 0.48) * 0.26));
    }
    const a = next > smoothRef.current ? 0.82 : 0.38;
    smoothRef.current = smoothRef.current * (1 - a) + next * a;
    setMicLevel(smoothRef.current);
  }, [recorderState.isRecording, recorderState.metering]);

  useEffect(() => {
    return () => {
      if (webTimerRef.current) {
        clearInterval(webTimerRef.current);
        webTimerRef.current = null;
      }
      recordingActiveRef.current = false;
      if (Platform.OS !== 'web') {
        void recorder.stop().catch(() => null);
      }
    };
  }, [recorder]);

  const start = useCallback(async (): Promise<boolean> => {
    smoothRef.current = 0.22;
    setMicLevel(0.22);

    if (recordingActiveRef.current) {
      return false;
    }

    if (Platform.OS === 'web') {
      let t = 0;
      webTimerRef.current = setInterval(() => {
        t += 0.18;
        const v = 0.38 + Math.sin(t) * 0.28 + (Math.random() - 0.5) * 0.18;
        smoothRef.current = smoothRef.current * 0.5 + v * 0.5;
        setMicLevel(smoothRef.current);
      }, 50);
      recordingActiveRef.current = true;
      return true;
    }

    try {
      const perm = await requestRecordingPermissionsAsync();
      if (!perm.granted) {
        console.warn('[useSpeakingPronunciationRecorder] không có quyền mic');
        return false;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
        interruptionMode: 'duckOthers',
        shouldPlayInBackground: false,
        shouldRouteThroughEarpiece: false,
      });

      await recorder.prepareToRecordAsync(SPEAKING_RECORD);
      recorder.record();
      recordingActiveRef.current = true;
      return true;
    } catch (e) {
      console.warn('[useSpeakingPronunciationRecorder] start', e);
      return false;
    }
  }, [recorder]);

  const stop = useCallback(async (): Promise<string | null> => {
    if (Platform.OS === 'web') {
      if (webTimerRef.current) {
        clearInterval(webTimerRef.current);
        webTimerRef.current = null;
      }
      recordingActiveRef.current = false;
      console.log('[useSpeakingPronunciationRecorder] Web: không có file audio để gửi API.');
      return null;
    }

    if (!recordingActiveRef.current) {
      return null;
    }

    try {
      const durationBeforeStopMs = recorder.getStatus().durationMillis;
      await recorder.stop();
      recordingActiveRef.current = false;

      const status = recorder.getStatus();
      const rawUri = status.url ?? recorder.uri ?? null;
      if (__DEV__) {
        console.log('[useSpeakingPronunciationRecorder] sau stop', {
          durationBeforeStopMs,
          url: rawUri,
          durationMillisAfterStop: status.durationMillis,
        });
      }
      if (!rawUri) {
        return null;
      }

      await waitRecordingFileReady(rawUri);
      return rawUri;
    } catch (e) {
      recordingActiveRef.current = false;
      console.warn('[useSpeakingPronunciationRecorder] stop', e);
      return null;
    }
  }, [recorder]);

  return { micLevel, start, stop };
}
