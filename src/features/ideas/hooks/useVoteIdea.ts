import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { ideasApi } from '../api';
import { IDEAS_QUERY_KEY } from './useIdeas';

export interface VoteResult {
  votesCount: number;
  hasVoted: boolean;
}

export function useVoteIdea(): UseMutationResult<VoteResult, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await ideasApi.vote(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IDEAS_QUERY_KEY });
    },
  });
}

export function useRemoveVoteIdea(): UseMutationResult<VoteResult, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await ideasApi.removeVote(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IDEAS_QUERY_KEY });
    },
  });
}
