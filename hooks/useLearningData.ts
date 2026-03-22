import { useCallback, useEffect, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';
import { LearningPath } from '@/types/api/learningPath.response';

// Helper format: SAT • MAR 21 hoặc MON • TODAY
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
      console.log('🚀 --- BẮT ĐẦU LOAD DATA LEARNING ---');

      // Bước 1: Lấy Path
      const pathRes = await learningApi.getLearningPaths({
        condition: JSON.stringify({ is_active: true }),
        limit: 1,
      });
      console.log('📍 1. Path Response:', pathRes.data);

      const path = pathRes.data.data?.result[0];
      if (!path) {
        console.log('⚠️ Không tìm thấy Path nào đang active');
        return;
      }
      setCurrentPath(path);
      console.log('✅ Path ID:', path._id);

      // Bước 2: Lấy Module
      const moduleRes = await learningApi.getModules({
        condition: JSON.stringify({ path_id: path._id }),
        sort: JSON.stringify({ order_index: 1 }),
        limit: 1,
      });
      console.log('📍 2. Module Response:', moduleRes.data);

      const firstModule = moduleRes.data.data?.result[0];
      if (!firstModule) {
        console.log('⚠️ Không tìm thấy Module nào cho Path này');
        return;
      }
      console.log('✅ Module ID:', firstModule._id);

      // Bước 3: Lấy danh sách 7 bài học (Roadmap)
      const lessonRes = await learningApi.getLessons({
        condition: JSON.stringify({ module_id: firstModule._id }),
        sort: JSON.stringify({ order_index: 1 }),
        limit: 7,
      });
      console.log('📍 3. Lessons Response:', lessonRes.data);

      const lessons = lessonRes.data.data?.result;
      if (!lessons || lessons.length === 0) {
        console.log('⚠️ Danh sách Lessons rỗng');
        setRoadmap([]);
        return;
      }

      // Xử lý status và format date
      const formattedRoadmap = lessons.map((lesson: any, index: number) => {
        let status: 'completed' | 'active' | 'locked' = 'locked';
        if (index === 0) status = 'completed';
        else if (index === 1) status = 'active';

        return {
          ...lesson,
          displayDate: formatRoadmapDate(lesson.created_at),
          status: status,
        };
      });

      console.log('📍 4. Roadmap đã format:', formattedRoadmap);
      setRoadmap(formattedRoadmap);

      // Tìm bài học Today
      const active = formattedRoadmap.find(item => item.status === 'active') || formattedRoadmap[0];
      setTodayLesson(active);
      console.log('✅ Today Lesson:', active?.name_en);
    } catch (error: any) {
      console.error('🚨 LỖI KHI LOAD DATA:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
      console.log('🚀 --- KẾT THÚC LOAD DATA ---');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { loading, currentPath, roadmap, todayLesson, refresh: loadData };
};
