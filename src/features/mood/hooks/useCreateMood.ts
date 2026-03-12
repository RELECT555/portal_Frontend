import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moodApi, type CreateMoodPayload } from '../api';
import { MOOD_ENTRIES_KEY } from './useMoodEntries';
import { MOOD_STATS_KEY } from './useMoodStats';

export function useCreateMood() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMoodPayload) => moodApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MOOD_ENTRIES_KEY });
      qc.invalidateQueries({ queryKey: MOOD_STATS_KEY });
    },
  });
}
