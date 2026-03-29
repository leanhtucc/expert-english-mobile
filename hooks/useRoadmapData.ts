import { useCallback, useEffect, useState } from 'react';

import { learningApi } from '@/api/endpoints/learning.api';
import { RoadmapData } from '@/types/api/learningPath.response';

export const useRoadmapData = (token: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RoadmapData | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) return; // Không có token thì khoan gọi
    setLoading(true);
    setError(null);
    try {
      // Gọi qua API Client chuẩn
      const res = await learningApi.getRoadmapData();
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
