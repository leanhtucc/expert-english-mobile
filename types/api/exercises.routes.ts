/** Đường dẫn API exercises — dùng chung cho client + log curl (không hardcode trong hook). */

export const EXERCISES_ROUTES = {
  generateSpeakingForLesson: '/exercises/generate-speaking-for-lesson',
  submitSpeakingPronunciation: '/exercises/speaking/submit-pronunciation',
  /** Path tương đối (có leading slash); truyền lessonId đã encode ở caller nếu cần */
  exercisesByLessonPath: (lessonId: string) =>
    `/exercises/by-lesson/${encodeURIComponent(lessonId)}`,
} as const;

/** Ghép baseURL + path (path bắt đầu bằng `/`). */
export function buildApiUrl(baseURL: string, path: string): string {
  const base = (baseURL || '').replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
