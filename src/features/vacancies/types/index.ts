export interface Vacancy {
  id: string;
  title: string;
  department?: string;
  location?: string;
  publishedAt: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  conditions?: string[];
  employmentType?: VacancyEmploymentType;
  experience?: string;
  isHot?: boolean;
  hhUrl?: string;
}

export type VacancyEmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export type VacancyDepartment =
  | 'all'
  | 'it'
  | 'hr'
  | 'finance'
  | 'logistics'
  | 'sales'
  | 'management'
  | 'support';

export const VACANCY_DEPARTMENT_LABELS: Record<VacancyDepartment, string> = {
  all: 'Все отделы',
  it: 'IT',
  hr: 'HR',
  finance: 'Финансы',
  logistics: 'Логистика',
  sales: 'Продажи',
  management: 'Управление',
  support: 'Поддержка',
};

export const VACANCY_DEPARTMENT_ICONS: Record<VacancyDepartment, string> = {
  all: '🏢',
  it: '💻',
  hr: '👥',
  finance: '💰',
  logistics: '🚛',
  sales: '📊',
  management: '📋',
  support: '🛠',
};

export const VACANCY_EMPLOYMENT_LABELS: Record<VacancyEmploymentType, string> = {
  'full-time': 'Полная занятость',
  'part-time': 'Частичная занятость',
  contract: 'Контракт',
  internship: 'Стажировка',
};
