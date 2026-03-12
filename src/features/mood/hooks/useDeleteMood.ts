import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moodApi } from '../api';
import { MOOD_ENTRIES_KEY } from './useMoodEntries';
import { MOOD_STATS_KEY } from './useMoodStats';

export function useDeleteMood() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => moodApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MOOD_ENTRIES_KEY });
      qc.invalidateQueries({ queryKey: MOOD_STATS_KEY });
    },
  });
}
