import React, { useEffect, useId, useMemo, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

/** Đường sóng sin mềm — nhiều lớp đỏ / hồng / cam nhạt chồng (thay cột dọc) */

function buildStrokePath(
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phase: number,
  verticalBias: number,
  steps = 80
): string {
  const mid = height * 0.5 + verticalBias;
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * width;
    const y = mid + amplitude * Math.sin(t * Math.PI * 2 * frequency + phase);
    parts.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return parts.join(' ');
}

/** Vùng dưới đường cong (gradient mờ) */
function buildFillPath(
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phase: number,
  verticalBias: number,
  steps = 80
): string {
  const mid = height * 0.5 + verticalBias;
  const y0 = mid + amplitude * Math.sin(phase);
  let d = `M 0 ${y0}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const x = t * width;
    const y = mid + amplitude * Math.sin(t * Math.PI * 2 * frequency + phase);
    d += ` L ${x} ${y}`;
  }
  d += ` L ${width} ${height} L 0 ${height} Z`;
  return d;
}

interface WaveformAnimationProps {
  isRecording: boolean;
  barCount?: number;
  amplitudes?: number[];
  barMaxHeight?: number;
  warmPalette?: boolean;
  fullWidth?: boolean;
}

export const WaveformAnimation: React.FC<WaveformAnimationProps> = ({
  isRecording,
  amplitudes = [],
  barMaxHeight: barMaxHeightProp = 40,
  warmPalette = true,
  fullWidth = false,
}) => {
  const { width: screenW } = useWindowDimensions();
  const gradId = useId().replace(/:/g, '');
  const horizontalPad = fullWidth ? 0 : 12;
  const width = Math.max(1, screenW - horizontalPad * 2);

  /** Cao hơn để sóng có chỗ “nhảy” lên xuống rộng */
  const waveAreaHeight = fullWidth
    ? Math.max(barMaxHeightProp * 2.75, 148)
    : Math.max(barMaxHeightProp * 2.1, 88);

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isRecording) {
      setPhase(0);
      return;
    }
    const id = setInterval(() => setPhase(p => p + 0.14), 36);
    return () => clearInterval(id);
  }, [isRecording]);

  const lastAmp = amplitudes[amplitudes.length - 1];

  const paths = useMemo(() => {
    const p = phase;
    const w = width;
    const h = waveAreaHeight;
    const palette = warmPalette;

    /** Biên độ: ưu tiên mic — hệ số lớn hơn → đường nhảy cao hơn */
    const micBoost = typeof lastAmp === 'number' ? Math.min(1.85, 0.08 + lastAmp * 1.42) : 1;
    const breathe = 0.86 + Math.sin(p * 0.55) * 0.09 + Math.cos(p * 0.41) * 0.07;
    const scale = 15.5 * micBoost * breathe;

    const a1 = scale * 1.12;
    const a2 = scale * 0.76;
    const a3 = scale * 0.56;
    const a4 = scale * 1;

    return {
      fill1: buildFillPath(w, h, a3 * 1.88, 1.15, p * 0.92, 5),
      strokeBack: buildStrokePath(w, h, a2, 1.75, p * 0.68 + 1.1, -5),
      strokeMid: buildStrokePath(w, h, a4, 2.1, p * 1.08 + 0.35, 2),
      strokeFront: buildStrokePath(w, h, a1, 1.55, p * 1.22, 0),
      strokeHairline: buildStrokePath(w, h, a3 * 0.58, 2.65, p * 0.82 + 2.1, 9),
      colors: palette
        ? {
            fill: ['#FECACA', '#FCE7E7'],
            strokeBack: 'rgba(255, 171, 145, 0.5)',
            strokeMid: 'rgba(244, 143, 177, 0.72)',
            strokeFront: '#D32F2F',
            strokeHairline: 'rgba(211, 47, 47, 0.42)',
          }
        : {
            fill: ['#FCA5A5', '#FEE2E2'],
            strokeBack: 'rgba(239, 68, 68, 0.32)',
            strokeMid: 'rgba(239, 68, 68, 0.52)',
            strokeFront: '#EF4444',
            strokeHairline: 'rgba(185, 28, 28, 0.38)',
          },
    };
  }, [phase, width, waveAreaHeight, warmPalette, lastAmp]);

  if (!isRecording) {
    return <View style={{ width: '100%', height: waveAreaHeight * 0.3, opacity: 0.2 }} />;
  }

  return (
    <View style={{ width: '100%', paddingHorizontal: horizontalPad, alignItems: 'center' }}>
      <Svg width={width} height={waveAreaHeight} viewBox={`0 0 ${width} ${waveAreaHeight}`}>
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={paths.colors.fill[0]} stopOpacity="0.5" />
            <Stop offset="0.5" stopColor={paths.colors.fill[1]} stopOpacity="0.22" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        <Path d={paths.fill1} fill={`url(#${gradId})`} />

        <Path
          d={paths.strokeBack}
          fill="none"
          stroke={paths.colors.strokeBack}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={paths.strokeMid}
          fill="none"
          stroke={paths.colors.strokeMid}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={paths.strokeHairline}
          fill="none"
          stroke={paths.colors.strokeHairline}
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={paths.strokeFront}
          fill="none"
          stroke={paths.colors.strokeFront}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
