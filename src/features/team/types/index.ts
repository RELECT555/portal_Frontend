export type TeamDepartment =
  | 'all'
  | 'management'
  | 'it'
  | 'hr'
  | 'finance'
  | 'sales'
  | 'logistics'
  | 'support';

export type TeamSortOption = 'name' | 'recent' | 'department';

export interface TeamMember {
  id: string;
  fullName: string;
  position: string;
  department: Exclude<TeamDepartment, 'all'>;
  email: string;
  phone?: string;
  avatarUrl?: string;
  hireDate: string;
  location?: string;
  isOnline?: boolean;
  tags: string[];
}

export interface TeamStats {
  totalEmployees: number;
  departments: number;
  newThisMonth: number;
}

export const TEAM_DEPARTMENT_LABELS: Record<TeamDepartment, string> = {
  all: 'Все',
  management: 'Руководство',
  it: 'IT',
  hr: 'HR',
  finance: 'Финансы',
  sales: 'Продажи',
  logistics: 'Логистика',
  support: 'Поддержка',
};

export const TEAM_DEPARTMENT_COLORS: Record<Exclude<TeamDepartment, 'all'>, string> = {
  management: '#6366f1',
  it: '#3b82f6',
  hr: '#ec4899',
  finance: '#f59e0b',
  sales: '#10b981',
  logistics: '#8b5cf6',
  support: '#ef4444',
};

export const SORT_LABELS: Record<TeamSortOption, string> = {
  name: 'По имени',
  recent: 'Новые',
  department: 'По отделу',
};

export const SORT_OPTIONS: [TeamSortOption, string][] = Object.entries(SORT_LABELS) as [
  TeamSortOption,
  string,
][];

export const CATEGORY_TABS: TeamDepartment[] = [
  'all',
  'management',
  'it',
  'hr',
  'finance',
  'sales',
  'logistics',
  'support',
];
