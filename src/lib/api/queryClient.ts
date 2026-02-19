import { QueryClient } from '@tanstack/react-query';
import { logger } from '@/lib/logger';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        logger.error('Mutation error', 'ReactQuery', error);
      },
    },
  },
});
