export const ROUTES = {
  HOME: '/',
  NEWS: '/news',
  NEWS_DETAIL: '/news/:id',
  COMPANY: '/company',
  COMPANY_SECTION: '/company/:section',
  TEAM: '/team',
  TEAM_MEMBER: '/team/:id',
  CULTURE: '/culture',
  KNOWLEDGE_BASE: '/knowledge-base',
  LIVE: '/live',
  LIVE_DETAIL: '/live/:id',
  IDEAS: '/ideas',
  VACANCIES: '/vacancies',
  GRATITUDE: '/gratitude',
  LIBRARY: '/library',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_ITEMS = [
  { label: 'Главная', path: ROUTES.HOME },
  { label: 'Компания', path: ROUTES.COMPANY },
  { label: 'Команда', path: ROUTES.TEAM },
  { label: 'Корпоративная культура', path: ROUTES.CULTURE },
  { label: 'База знаний', path: ROUTES.KNOWLEDGE_BASE },
] as const;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const DEBOUNCE_DELAY_MS = 300;

export const DEFAULT_PAGE_SIZE = 10;

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_FORMAT_SHORT = 'DD MMMM';
