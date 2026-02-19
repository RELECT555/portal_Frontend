export interface Idea {
  id: string;
  title: string;
  description: string;
  authorName: string;
  status: 'new' | 'review' | 'approved' | 'rejected' | 'implemented';
  votesCount: number;
  createdAt: string;
}
