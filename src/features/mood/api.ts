import { axiosInstance } from '@/lib/api';
import type { MoodEntry, MoodStats } from './types';

export interface GetMoodEntriesParams {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
}

export interface GetMoodEntriesResponse {
  success: boolean;
  data: MoodEntry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetMoodStatsResponse {
  success: boolean;
  data: MoodStats;
}

export interface CreateMoodPayload {
  mood: string;
  note?: string;
  tags?: string[];
}

export interface UpdateMoodPayload {
  mood?: string;
  note?: string;
  tags?: string[];
}

const BASE = '/mood';

export const moodApi = {
  getEntries(params?: GetMoodEntriesParams): Promise<GetMoodEntriesResponse> {
    const search = new URLSearchParams();
    if (params?.page != null) search.set('page', String(params.page));
    if (params?.limit != null) search.set('limit', String(params.limit));
    if (params?.from) search.set('from', params.from);
    if (params?.to) search.set('to', params.to);
    const q = search.toString();
    return axiosInstance.get(`${BASE}${q ? `?${q}` : ''}`).then((r) => r.data);
  },

  getStats(): Promise<GetMoodStatsResponse> {
    return axiosInstance.get(`${BASE}/stats`).then((r) => r.data);
  },

  create(payload: CreateMoodPayload): Promise<{ success: boolean; data: MoodEntry }> {
    return axiosInstance.post(BASE, payload).then((r) => r.data);
  },

  update(id: string, payload: UpdateMoodPayload): Promise<{ success: boolean; data: MoodEntry }> {
    return axiosInstance.patch(`${BASE}/${id}`, payload).then((r) => r.data);
  },

  delete(id: string): Promise<{ success: boolean }> {
    return axiosInstance.delete(`${BASE}/${id}`).then((r) => r.data);
  },
};
