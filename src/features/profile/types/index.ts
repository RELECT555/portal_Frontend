import type { UserShort } from '@/types/user';

export interface ProfileStats {
  postsCount: number;
  ideasCount: number;
  gratitudesSentCount: number;
  gratitudesReceivedCount: number;
  booksReadCount: number;
  eventsAttendedCount: number;
}

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface ProfileAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  earnedAt?: string;
  progress?: number;
  maxProgress?: number;
  locked?: boolean;
}

export interface ProfileActivityItem {
  id: string;
  type: 'post' | 'idea' | 'gratitude' | 'book' | 'event' | 'comment';
  title: string;
  description: string;
  date: string;
  link?: string;
}

export interface ProfileData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  position: string;
  department: string;
  phone?: string;
  avatarUrl?: string;
  birthDate?: string;
  hireDate?: string;
  bio?: string;
  location?: string;
  telegram?: string;
  manager?: UserShort;
  skills: string[];
  stats: ProfileStats;
  achievements: ProfileAchievement[];
  recentActivity: ProfileActivityItem[];
}
