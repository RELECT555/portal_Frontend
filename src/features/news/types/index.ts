export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  likesCount: number;
  commentsCount: number;
  isMain?: boolean;
}
