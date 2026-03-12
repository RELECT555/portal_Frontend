import { axiosInstance } from '@/lib/api';
import type { Idea, IdeasStats, IdeaStatus, IdeaCategory } from './types';

export interface GetIdeasParams {
  status?: IdeaStatus;
  category?: Exclude<IdeaCategory, 'all'>;
  page?: number;
  limit?: number;
}

export interface GetIdeasResponse {
  success: boolean;
  data: Idea[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetIdeasStatsResponse {
  success: boolean;
  data: IdeasStats;
}

export interface CreateIdeaPayload {
  title: string;
  description: string;
  category?: Exclude<IdeaCategory, 'all'>;
  tags?: string[];
}

export interface UpdateIdeaStatusPayload {
  status: IdeaStatus;
}

const BASE = '/ideas';

export const ideasApi = {
  getList(params?: GetIdeasParams): Promise<GetIdeasResponse> {
    const search = new URLSearchParams();
    if (params?.status) search.set('status', params.status);
    if (params?.category) search.set('category', params.category);
    if (params?.page != null) search.set('page', String(params.page));
    if (params?.limit != null) search.set('limit', String(params.limit));
    const q = search.toString();
    return axiosInstance.get(`${BASE}/${q ? `?${q}` : ''}`).then((r) => r.data);
  },

  getStats(): Promise<GetIdeasStatsResponse> {
    return axiosInstance.get(`${BASE}/stats`).then((r) => r.data);
  },

  create(payload: CreateIdeaPayload): Promise<{ success: boolean; data: Idea; message?: string }> {
    return axiosInstance.post(BASE, payload).then((r) => r.data);
  },

  updateStatus(
    id: string,
    payload: UpdateIdeaStatusPayload,
  ): Promise<{ success: boolean; data: Idea; message?: string }> {
    return axiosInstance.patch(`${BASE}/${id}`, payload).then((r) => r.data);
  },

  vote(
    id: string,
  ): Promise<{
    success: boolean;
    data: { votesCount: number; hasVoted: boolean };
    message?: string;
  }> {
    return axiosInstance.post(`${BASE}/${id}/vote`).then((r) => r.data);
  },

  removeVote(
    id: string,
  ): Promise<{
    success: boolean;
    data: { votesCount: number; hasVoted: boolean };
    message?: string;
  }> {
    return axiosInstance.delete(`${BASE}/${id}/vote`).then((r) => r.data);
  },
};
