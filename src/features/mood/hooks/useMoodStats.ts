import { useQuery } from '@tanstack/react-query';
import { moodApi } from '../api';

export const MOOD_STATS_KEY = ['mood-stats'] as const;

export function useMoodStats() {
  return useQuery({
    queryKey: MOOD_STATS_KEY,
    queryFn: () => moodApi.getStats().then((r) => r.data),
  });
}
