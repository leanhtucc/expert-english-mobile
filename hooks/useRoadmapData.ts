import axios from 'axios';

import { useCallback, useEffect, useState } from 'react';

// Kiểu dữ liệu tham khảo từ response mẫu
export interface RoadmapLesson {
  _id: string;
  module_id: string;
  name_en: string;
  name_vi: string;
  order_index: number;
  lesson_type: string;
  estimated_minutes: number;
  createdAt: string;
  created_at: string;
  is_current?: boolean;
}

export interface RoadmapModule {
  _id: string;
  path_id: string;
  name_en: string;
  name_vi: string;
  order_index: number;
  createdAt: string;
  created_at: string;
  is_current?: boolean;
  lessons: RoadmapLesson[];
}

export interface RoadmapPath {
  _id: string;
  user_id: string;
  name_en: string;
  name_vi: string;
  target_level: string;
  description: string;
  estimated_hours: number;
  is_active: boolean;
  createdAt: string;
  created_at: string;
}

export interface RoadmapData {
  learning_path: RoadmapPath;
  learning_modules: RoadmapModule[];
}

interface UseRoadmapDataResult {
  loading: boolean;
  error: string | null;
  data: RoadmapData | null;
  refresh: () => Promise<void>;
}

// Nhận vào token hoặc tự lấy từ store nếu có
export const useRoadmapData = (token: string): UseRoadmapDataResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RoadmapData | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://prolingo-be.iuptit.com/roadmap/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data?.data || null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Lỗi khi tải roadmap');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, data, refresh: fetchData };
};
