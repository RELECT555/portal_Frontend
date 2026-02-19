import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { PostUpdatePayload, Post } from '../types';
import { MOCK_POSTS } from '../mockData';
import { renderContentToHtml } from '../utils/renderContent';

const POSTS_QUERY_KEY = ['posts'] as const;

const mockUpdatePost = (payload: PostUpdatePayload): Promise<Post> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_POSTS.findIndex((p) => p.id === payload.id);
      if (index === -1) {
        reject(new Error('Пост не найден'));
        return;
      }

      const updated: Post = {
        ...MOCK_POSTS[index],
        ...payload,
        contentHtml: payload.content
          ? renderContentToHtml(payload.content)
          : MOCK_POSTS[index].contentHtml,
        updatedAt: new Date().toISOString(),
        publishedAt:
          payload.status === 'published'
            ? (MOCK_POSTS[index].publishedAt ?? new Date().toISOString())
            : MOCK_POSTS[index].publishedAt,
      };
      MOCK_POSTS[index] = updated;
      resolve(updated);
    }, 500);
  });

export const useUpdatePost = (): UseMutationResult<Post, Error, PostUpdatePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockUpdatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['post', data.id] });
    },
  });
};
