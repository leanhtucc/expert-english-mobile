/**
 * Phần `data` từ API submit-pronunciation (thành công).
 * Cấu trúc lồng: `assessment_raw.data` chứa chi tiết chấm từ dịch vụ đánh giá.
 */
export type PronunciationMistakeItem = {
  segment: string;
  issue: string;
  suggestion: string;
};

/** Dữ liệu đã map cho UI — một dòng gợi ý riêng cho người học (`learnerHint`). */
export type PronunciationFeedback = {
  score: number;
  passed: boolean;
  referenceText: string;
  transcript: string;
  overallFeedback: string;
  mistakes: PronunciationMistakeItem[];
  attemptId: string | null;
  progressUpdated: boolean;
  /** Gợi ý tóm tắt cho người luyện (ưu tiên overall_feedback, sau đó gợi ý từ lỗi). */
  learnerHint: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function parseMistakes(raw: unknown): PronunciationMistakeItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map(item => {
    if (!isRecord(item)) {
      return { segment: '', issue: '', suggestion: '' };
    }
    return {
      segment: String(item.segment ?? ''),
      issue: String(item.issue ?? ''),
      suggestion: String(item.suggestion ?? ''),
    };
  });
}

function buildLearnerHint(params: {
  passed: boolean;
  overallFeedback: string;
  mistakes: PronunciationMistakeItem[];
  referenceText: string;
}): string {
  const { passed, overallFeedback, mistakes, referenceText } = params;
  if (passed) {
    return 'Chúc mừng! Bạn đã đạt yêu cầu phát âm cho câu này.';
  }
  const trimmed = overallFeedback.trim();
  if (trimmed) {
    return trimmed;
  }
  const first = mistakes[0];
  if (first?.suggestion?.trim()) {
    return first.suggestion.trim();
  }
  if (first?.issue?.trim()) {
    return first.issue.trim();
  }
  if (referenceText) {
    return `Hãy luyện lại cách phát âm từ: «${referenceText}».`;
  }
  return 'Hãy nghe mẫu và thử lại — tập trung vào từng âm tiết.';
}

/**
 * Map JSON response từ POST submit-pronunciation → `PronunciationFeedback`.
 */
export function mapSubmitPronunciationResponse(body: unknown): PronunciationFeedback | null {
  if (!isRecord(body)) {
    return null;
  }

  const payload = body.success === true && isRecord(body.data) ? body.data : body;

  if (!isRecord(payload)) {
    return null;
  }

  let assessmentInner: Record<string, unknown> | null = null;
  const raw = payload.assessment_raw;
  if (isRecord(raw) && isRecord(raw.data)) {
    assessmentInner = raw.data;
  }

  const score = Number(payload.score ?? assessmentInner?.score ?? 0);
  const passed = Boolean(payload.passed);
  const referenceText = String(payload.reference_text ?? assessmentInner?.reference_text ?? '');
  const transcript = String(assessmentInner?.transcript ?? '');
  const overallFeedback = String(assessmentInner?.overall_feedback ?? '');
  const mistakes = parseMistakes(assessmentInner?.mistakes);
  const attemptId = payload.attempt_id != null ? String(payload.attempt_id) : null;
  const progressUpdated = Boolean(payload.progress_updated);

  const learnerHint = buildLearnerHint({
    passed,
    overallFeedback,
    mistakes,
    referenceText,
  });

  return {
    score,
    passed,
    referenceText,
    transcript,
    overallFeedback,
    mistakes,
    attemptId,
    progressUpdated,
    learnerHint,
  };
}
