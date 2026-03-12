import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { ideasApi, type UpdateIdeaStatusPayload } from '../api';
import type { Idea } from '../types';
import { IDEAS_QUERY_KEY } from './useIdeas';

export function useUpdateIdeaStatus(): UseMutationResult<
  Idea,
  Error,
  { id: string; payload: UpdateIdeaStatusPayload }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateIdeaStatusPayload }) => {
      const res = await ideasApi.updateStatus(id, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IDEAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['ideas', 'stats'] });
    },
  });
}
