import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { PostCreatePayload, Post } from '../types';
import { MOCK_POSTS } from '../mockData';
import { renderContentToHtml } from '../utils/renderContent';

const POSTS_QUERY_KEY = ['posts'] as const;

const mockCreatePost = (payload: PostCreatePayload): Promise<Post> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const newPost: Post = {
        id: crypto.randomUUID(),
        ...payload,
        coverImageUrl: payload.coverImageUrl || undefined,
        contentHtml: renderContentToHtml(payload.content),
        authorId: 'current-user',
        authorName: 'Текущий пользователь',
        publishedAt: payload.status === 'published' ? new Date().toISOString() : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        viewsCount: 0,
      };
      MOCK_POSTS.push(newPost);
      resolve(newPost);
    }, 500);
  });

export const useCreatePost = (): UseMutationResult<Post, Error, PostCreatePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockCreatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });
};
