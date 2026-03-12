import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { ideasApi, type CreateIdeaPayload } from '../api';
import type { Idea } from '../types';
import { IDEAS_QUERY_KEY } from './useIdeas';

export function useCreateIdea(): UseMutationResult<Idea, Error, CreateIdeaPayload> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateIdeaPayload) => {
      const res = await ideasApi.create(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IDEAS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['ideas', 'stats'] });
    },
  });
}
