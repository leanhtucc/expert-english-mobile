import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { Audio } from 'expo-av';

/**
 * Ghi âm tạm (không dùng file) + đọc mức âm (metering) để điều khiển visualizer.
 * iOS: metering ổn định. Android: có thể thiếu metering — dùng dao động mượt thay thế.
 * Web: không ghi thật — mô phỏng mức sóng.
 */

/** Đẩy nhạy: tiếng nhỏ vẫn nhích rõ; gamma < 1 làm tăng động trong vùng nói thường (~-45…-10 dB) */
function dbToUnit(db: number): number {
  const t = Math.min(1, Math.max(0, (db + 52) / 52));
  const boosted = Math.pow(t, 0.68);
  return Math.min(1, Math.max(0.04, boosted));
}

export function useMicLevelForVisualizer(isActive: boolean): number {
  const [level, setLevel] = useState(0.22);
  const smoothRef = useRef(0.22);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const webTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    smoothRef.current = 0.22;
    setLevel(0.22);

    if (!isActive) {
      const rec = recordingRef.current;
      recordingRef.current = null;
      if (rec) {
        rec.stopAndUnloadAsync().catch(() => null);
      }
      if (webTimerRef.current) {
        clearInterval(webTimerRef.current);
        webTimerRef.current = null;
      }
      return;
    }

    if (Platform.OS === 'web') {
      let t = 0;
      webTimerRef.current = setInterval(() => {
        t += 0.18;
        const v = 0.38 + Math.sin(t) * 0.28 + (Math.random() - 0.5) * 0.18;
        smoothRef.current = smoothRef.current * 0.5 + v * 0.5;
        setLevel(smoothRef.current);
      }, 50);
      return () => {
        if (webTimerRef.current) {
          clearInterval(webTimerRef.current);
          webTimerRef.current = null;
        }
      };
    }

    let cancelled = false;

    void (async () => {
      try {
        const perm = await Audio.requestPermissionsAsync();
        if (perm.status !== 'granted' || cancelled) return;

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        if (cancelled) return;

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync({
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          isMeteringEnabled: true,
        });
        if (cancelled) {
          await recording.stopAndUnloadAsync().catch(() => null);
          return;
        }

        recording.setProgressUpdateInterval(32);
        recording.setOnRecordingStatusUpdate(status => {
          if (cancelled || status.isDoneRecording) return;
          if (!status.isRecording) return;

          let next: number;
          if (status.metering !== undefined) {
            next = dbToUnit(status.metering);
          } else {
            next = Math.min(1, Math.max(0.12, smoothRef.current + (Math.random() - 0.48) * 0.26));
          }
          // Tăng nhanh khi âm lớn lên, giảm chậm khi nhỏ xuống — cảm giác “bắt” tiếng nói hơn
          const a = next > smoothRef.current ? 0.82 : 0.38;
          smoothRef.current = smoothRef.current * (1 - a) + next * a;
          setLevel(smoothRef.current);
        });

        await recording.startAsync();
        if (cancelled) {
          await recording.stopAndUnloadAsync().catch(() => null);
          return;
        }
        recordingRef.current = recording;
      } catch (e) {
        console.warn('[useMicLevelForVisualizer]', e);
        if (!cancelled) {
          let t = 0;
          webTimerRef.current = setInterval(() => {
            t += 0.2;
            const v = 0.4 + Math.sin(t) * 0.18;
            smoothRef.current = smoothRef.current * 0.7 + v * 0.3;
            setLevel(smoothRef.current);
          }, 60);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (webTimerRef.current) {
        clearInterval(webTimerRef.current);
        webTimerRef.current = null;
      }
      const rec = recordingRef.current;
      recordingRef.current = null;
      if (rec) {
        rec.stopAndUnloadAsync().catch(() => null);
      }
    };
  }, [isActive]);

  return level;
}
