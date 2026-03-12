import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { ideasApi } from '../api';
import type { IdeasStats } from '../types';

export function useIdeasStats(): UseQueryResult<IdeasStats, Error> {
  return useQuery({
    queryKey: ['ideas', 'stats'],
    queryFn: async () => {
      const res = await ideasApi.getStats();
      return res.data;
    },
  });
}
