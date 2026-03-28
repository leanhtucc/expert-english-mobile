import { useCallback, useEffect, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';
import { RoadmapLesson, RoadmapModule, RoadmapPath } from '@/types/api/learningPath.response';

// HÀM TẠO NGÀY GIẢ LẬP ĐỂ UI ĐẸP NHƯ THIẾT KẾ
// Tính toán ngày dựa vào khoảng cách so với bài đang học (Hôm nay)
const getSimulatedDate = (activeIndex: number, currentIndex: number) => {
  const date = new Date();
  const diff = currentIndex - activeIndex; // 0: Hôm nay, -1: Hôm qua, 1: Ngày mai
  date.setDate(date.getDate() + diff);

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

  if (diff === 0) return `${dayName} • TODAY`;
  return `${dayName} • ${monthName} ${dayNum}`;
};

export const useLearningData = () => {
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState<RoadmapPath | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [todayLesson, setTodayLesson] = useState<RoadmapLesson | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🚀 --- START LOAD ROADMAP DATA ---');

      // GỌI DUY NHẤT 1 API: /roadmap/me
      const res = await learningApi.getRoadmapData();
      const roadmapData = res.data?.data;

      if (!roadmapData || !roadmapData.learning_path) {
        console.warn('⚠️ Không tìm thấy lộ trình học tập!');
        setRoadmap([]);
        setModules([]);
        return;
      }

      // 1. SET LEARNING PATH
      setCurrentPath(roadmapData.learning_path);

      // 2. XỬ LÝ MODULES (THANH NGANG)
      const rawModules = roadmapData.learning_modules || [];
      let foundCurrentModule = false;

      const formattedModules = rawModules.map((mod: RoadmapModule, index: number) => {
        let status: 'completed' | 'current' | 'locked' = 'locked';
        if (mod.is_current) {
          status = 'current';
          foundCurrentModule = true;
        } else if (!foundCurrentModule) {
          status = 'completed';
        }

        return {
          id: mod._id,
          number: index + 1,
          label: status === 'current' ? 'Đang học' : `Tuần ${index + 1}`,
          status,
        };
      });

      // FAKE DATA: Đảm bảo luôn hiện ít nhất 4 cụm "Tuần" cho đẹp mắt
      while (formattedModules.length < 4) {
        const nextIndex = formattedModules.length;
        formattedModules.push({
          id: `fake-locked-mod-${nextIndex}`,
          number: nextIndex + 1,
          label: `Tuần ${nextIndex + 1}`,
          status: 'locked',
        });
      }
      setModules(formattedModules);

      // 3. XỬ LÝ LESSONS (DẢI DỌC)
      const currentModule = rawModules.find((m: RoadmapModule) => m.is_current) || rawModules[0];

      if (currentModule && currentModule.lessons && currentModule.lessons.length > 0) {
        // Tìm ra index của bài đang học để làm mốc thời gian
        let activeIndex = currentModule.lessons.findIndex((l: RoadmapLesson) => l.is_current);
        if (activeIndex === -1) activeIndex = 0; // Nếu không có, gán bài đầu là TODAY

        const formattedRoadmap = currentModule.lessons.map((lesson: RoadmapLesson, idx: number) => {
          let status: 'completed' | 'active' | 'locked' = 'locked';

          if (idx < activeIndex) {
            status = 'completed';
          } else if (idx === activeIndex) {
            status = 'active';
          }

          return {
            ...lesson,
            _id: lesson._id,
            name_en: lesson.name_vi || lesson.name_en,
            displayDate: getSimulatedDate(activeIndex, idx), // Tạo ngày MON * JUL 10
            status: status,
          };
        });

        setRoadmap(formattedRoadmap);

        // Tìm bài học Focus cho tấm thẻ to ở trên cùng
        const activeLesson =
          formattedRoadmap.find((l: any) => l.status === 'active') || formattedRoadmap[0];
        setTodayLesson(activeLesson);
      } else {
        setRoadmap([]);
      }
    } catch (error: any) {
      console.error('🚨 API ERROR /roadmap/me:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
      console.log('🏁 --- END LOAD DATA ---');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { loading, currentPath, modules, roadmap, todayLesson, refresh: loadData };
};
