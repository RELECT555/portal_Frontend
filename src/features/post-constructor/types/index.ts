import type { JSONContent } from '@tiptap/react';

export type PostType = 'news' | 'live' | 'idea' | 'announcement' | 'article';

export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  type: PostType;
  title: string;
  content: JSONContent;
  contentHtml: string;
  coverImageUrl?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  status: PostStatus;
  isMain?: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
}

export interface PostCreatePayload {
  type: PostType;
  title: string;
  content: JSONContent;
  coverImageUrl?: string;
  tags: string[];
  status: PostStatus;
  isMain?: boolean;
}

export interface PostUpdatePayload extends Partial<PostCreatePayload> {
  id: string;
}

export interface PostFilters {
  type?: PostType;
  status?: PostStatus;
  search?: string;
}

export const POST_TYPE_LABELS: Record<PostType, string> = {
  news: 'Новость',
  live: 'Live-публикация',
  idea: 'Идея',
  announcement: 'Объявление',
  article: 'Статья',
};

export const POST_STATUS_LABELS: Record<PostStatus, string> = {
  draft: 'Черновик',
  published: 'Опубликовано',
  archived: 'В архиве',
};
