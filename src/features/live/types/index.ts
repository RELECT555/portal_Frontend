export interface LivePublication {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  authorName: string;
  publishedAt: string;
  likesCount: number;
  heartsCount: number;
  viewsCount: number;
  commentsCount: number;
}
