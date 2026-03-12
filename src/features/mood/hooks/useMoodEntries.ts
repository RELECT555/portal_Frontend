import { useQuery } from '@tanstack/react-query';
import { moodApi, type GetMoodEntriesParams } from '../api';

export const MOOD_ENTRIES_KEY = ['mood-entries'] as const;

export function useMoodEntries(params?: GetMoodEntriesParams) {
  return useQuery({
    queryKey: [...MOOD_ENTRIES_KEY, params],
    queryFn: () => moodApi.getEntries({ ...params, limit: params?.limit ?? 100 }),
  });
}
