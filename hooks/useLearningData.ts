import { useCallback, useEffect, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';
import { LearningPath } from '@/types/api/learningPath.response';

// Helper format date: Giữ nguyên logic của bạn
const formatRoadmapDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  return isToday ? `${dayName} • TODAY` : `${dayName} • ${monthName} ${dayNum}`;
};

export const useLearningData = () => {
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [todayLesson, setTodayLesson] = useState<any | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🚀 --- START LOAD DATA ---');

      // BƯỚC 1: Lấy Learning Path đang active
      const pathRes = await learningApi.getLearningPaths({
        condition: JSON.stringify({ is_active: true }),
        limit: 1,
      });

      // Lưu ý: Cấu trúc res.data.data.result
      const path = pathRes.data?.data?.result?.[0];
      if (!path) {
        console.warn('⚠️ No active path found');
        return;
      }
      setCurrentPath(path);

      // BƯỚC 2: Lấy Module đầu tiên của Path này
      const moduleRes = await learningApi.getModules({
        condition: JSON.stringify({ path_id: path._id }),
        sort: JSON.stringify({ order_index: 1 }),
        limit: 1,
      });

      const firstModule = moduleRes.data?.data?.result?.[0];
      if (!firstModule) {
        console.warn('⚠️ No module found for this path');
        return;
      }

      // BƯỚC 3: Lấy danh sách Lessons (QUAN TRỌNG: Cần limit > 1)
      const lessonRes = await learningApi.getLessons({
        condition: JSON.stringify({ module_id: firstModule._id }),
        sort: JSON.stringify({ order_index: 1 }),
        limit: 20, // Lấy dư ra để đảm bảo hiện đủ 7 ngày hoặc nhiều hơn
        page: 1,
      });

      // Log để debug chính xác cấu trúc mảng
      console.log('📍 3. Raw Lessons Data:', lessonRes.data);

      const lessons = lessonRes.data?.data?.result || [];

      if (lessons.length === 0) {
        console.warn('⚠️ Lesson list is empty');
        setRoadmap([]);
        return;
      }

      // BƯỚC 4: Format Roadmap
      const formattedRoadmap = lessons.map((lesson: any, index: number) => {
        let status: 'completed' | 'active' | 'locked' = 'locked';

        // Logic chuẩn cho người mới gen lộ trình:
        // Bài đầu tiên (index 0) sẽ là bài đang học (active)
        // Các bài sau (index > 0) sẽ bị khóa (locked)
        if (index === 0) {
          status = 'active';
        } else {
          status = 'locked';
        }

        // Sau này khi Backend trả về trường is_completed, bạn sẽ sửa thành:
        // if (lesson.is_completed) status = 'completed';
        // else if (isNextToLearn) status = 'active';

        return {
          ...lesson,
          displayDate: formatRoadmapDate(lesson.created_at),
          status: status,
        };
      });

      console.log('✅ Final Roadmap (Count):', formattedRoadmap.length);
      setRoadmap(formattedRoadmap);

      // Tìm bài học hôm nay (thường là bài 'active')
      const activeLesson =
        formattedRoadmap.find(item => item.status === 'active') || formattedRoadmap[0];
      setTodayLesson(activeLesson);
    } catch (error: any) {
      console.error('🚨 API ERROR:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
      console.log('🏁 --- END LOAD DATA ---');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { loading, currentPath, roadmap, todayLesson, refresh: loadData };
};
