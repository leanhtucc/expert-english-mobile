import { RoadmapData, RoadmapLesson } from '@/types/api/learningPath.response';

/**
 * Bài học "hôm nay" trên roadmap: module `is_current` (hoặc module đầu),
 * rồi lesson `is_current` (hoặc bài đầu trong module) — cùng quy tắc với Home.
 */
export function getTodayLessonFromRoadmap(
  data: RoadmapData | null | undefined
): RoadmapLesson | undefined {
  if (!data?.learning_path) return undefined;
  const currentModule =
    data.learning_modules?.find(m => m.is_current) || data.learning_modules?.[0];
  if (!currentModule?.lessons?.length) return undefined;
  return currentModule.lessons.find(l => l.is_current) || currentModule.lessons[0];
}

export function getTodayLessonIdFromRoadmap(
  data: RoadmapData | null | undefined
): string | undefined {
  return getTodayLessonFromRoadmap(data)?._id;
}
