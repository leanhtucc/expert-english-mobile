import React from 'react';
import { Text, View } from 'react-native';

import type { PronunciationFeedback } from '@/types/api/submitPronunciation.response';

type Props = {
  feedback: PronunciationFeedback;
  textMain: string;
  textMuted: string;
  borderColor: string;
  surfaceBg: string;
  accentColor: string;
  /** Nền ô từng lỗi phát âm */
  mistakeRowBg: string;
  isDark: boolean;
};

/**
 * Hiển thị kết quả chấm phát âm + một khối gợi ý riêng cho người học (`learnerHint`).
 */
export const PronunciationFeedbackCard: React.FC<Props> = ({
  feedback,
  textMain,
  textMuted,
  borderColor,
  surfaceBg,
  accentColor,
  mistakeRowBg,
  isDark,
}) => {
  const { score, passed, referenceText, transcript, overallFeedback, mistakes, learnerHint } =
    feedback;

  const learnerHintBg = passed
    ? isDark
      ? 'rgba(34, 197, 94, 0.22)'
      : '#F0FDF4'
    : isDark
      ? 'rgba(251, 146, 60, 0.2)'
      : '#FFF7ED';

  return (
    <View
      className="mt-4 rounded-2xl border px-4 py-3"
      style={{ borderColor, backgroundColor: surfaceBg }}
    >
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-base font-bold" style={{ color: textMain }}>
          Kết quả phát âm
        </Text>
        <View
          className="rounded-full px-2.5 py-1"
          style={{ backgroundColor: passed ? '#DCFCE7' : '#FEE2E2' }}
        >
          <Text className="text-xs font-bold" style={{ color: passed ? '#166534' : accentColor }}>
            {passed ? 'Đạt' : 'Chưa đạt'}
          </Text>
        </View>
      </View>

      <Text className="text-2xl font-bold" style={{ color: accentColor }}>
        {score}
        <Text className="text-sm font-semibold text-gray-500"> /100</Text>
      </Text>

      <View className="mt-3 gap-1">
        <Text
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: textMuted }}
        >
          Mẫu cần nói
        </Text>
        <Text className="text-base font-medium" style={{ color: textMain }}>
          {referenceText || '—'}
        </Text>
      </View>

      <View className="mt-2 gap-1">
        <Text
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: textMuted }}
        >
          Hệ thống nghe được
        </Text>
        <Text className="text-base italic" style={{ color: textMain }}>
          {transcript?.trim() ? `«${transcript}»` : '—'}
        </Text>
      </View>

      {overallFeedback ? (
        <View className="mt-3">
          <Text
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: textMuted }}
          >
            Nhận xét chi tiết
          </Text>
          <Text className="mt-1 text-sm leading-5" style={{ color: textMain }}>
            {overallFeedback}
          </Text>
        </View>
      ) : null}

      {mistakes.length > 0 ? (
        <View className="mt-3">
          <Text
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: textMuted }}
          >
            Gợi ý theo từng phần
          </Text>
          {mistakes.map((m, i) => (
            <View
              key={`${m.segment}-${i}`}
              className="mt-2 rounded-xl px-3 py-2"
              style={{ backgroundColor: mistakeRowBg }}
            >
              <Text className="text-sm font-semibold" style={{ color: textMain }}>
                {m.segment || '—'}
              </Text>
              {m.issue ? (
                <Text className="mt-1 text-sm" style={{ color: textMain }}>
                  {m.issue}
                </Text>
              ) : null}
              {m.suggestion ? (
                <Text className="mt-1 text-sm" style={{ color: accentColor }}>
                  → {m.suggestion}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      <View
        className="mt-4 rounded-xl border-l-4 px-3 py-2.5"
        style={{ borderLeftColor: accentColor, backgroundColor: learnerHintBg }}
      >
        <Text className="text-xs font-bold uppercase tracking-wide" style={{ color: textMuted }}>
          Gợi ý cho bạn
        </Text>
        <Text className="mt-1 text-sm font-medium leading-5" style={{ color: textMain }}>
          {learnerHint}
        </Text>
      </View>
    </View>
  );
};
