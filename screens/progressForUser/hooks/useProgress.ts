import { useEffect, useState } from 'react';

import { MOCK_PROGRESS_DATA } from '../constants/progress.constants';
import { ProgressData } from '../types/progress.types';

export const useProgress = () => {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập fetch API
    setTimeout(() => {
      setData(MOCK_PROGRESS_DATA);
      setLoading(false);
    }, 500);
  }, []);

  return { data, loading };
};
