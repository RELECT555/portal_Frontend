export interface GratitudeTop {
  id: string;
  fullName: string;
  position: string;
  avatarUrl?: string;
  receivedCount?: number;
}

export interface GratitudeStats {
  totalCount: number;
  topEmployees: GratitudeTop[];
}

export interface GratitudeReactions {
  [emoji: string]: number;
}

export interface GratitudeEntry {
  id: string;
  fromName: string;
  toName: string;
  toPosition: string;
  message: string;
  createdAt: string;
  reactions?: GratitudeReactions;
}
