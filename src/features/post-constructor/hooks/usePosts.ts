import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Post, PostFilters } from '../types';
import { MOCK_POSTS } from '../mockData';

const POSTS_QUERY_KEY = ['posts'] as const;

const mockFetchPosts = (filters?: PostFilters): Promise<Post[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      let result = [...MOCK_POSTS];

      if (filters?.type) {
        result = result.filter((p) => p.type === filters.type);
      }
      if (filters?.status) {
        result = result.filter((p) => p.status === filters.status);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        result = result.filter((p) => p.title.toLowerCase().includes(q));
      }

      result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      resolve(result);
    }, 300);
  });

export const usePosts = (filters?: PostFilters): UseQueryResult<Post[]> =>
  useQuery({
    queryKey: [...POSTS_QUERY_KEY, filters],
    queryFn: () => mockFetchPosts(filters),
  });

const mockFetchPost = (id: string): Promise<Post | undefined> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_POSTS.find((p) => p.id === id));
    }, 200);
  });

export const usePost = (id: string | undefined): UseQueryResult<Post | undefined> =>
  useQuery({
    queryKey: ['post', id],
    queryFn: () => mockFetchPost(id!),
    enabled: !!id,
  });
