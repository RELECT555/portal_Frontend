import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { ideasApi, type GetIdeasParams, type GetIdeasResponse } from '../api';
import type { Idea } from '../types';

export const IDEAS_QUERY_KEY = ['ideas'] as const;

export function useIdeas(
  params?: GetIdeasParams,
): UseQueryResult<{ data: Idea[]; pagination: GetIdeasResponse['pagination'] }, Error> {
  return useQuery({
    queryKey: [...IDEAS_QUERY_KEY, params],
    queryFn: async () => {
      const res = await ideasApi.getList({ ...params, limit: params?.limit ?? 100 });
      return { data: res.data, pagination: res.pagination };
    },
  });
}
