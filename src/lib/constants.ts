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
  MERCH_SHOP: '/merch-shop',
  POST_CONSTRUCTOR: '/constructor',
  POST_CONSTRUCTOR_EDIT: '/constructor/:id',
  PROFILE: '/profile',
  MOOD: '/mood',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface NavChild {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Главная', path: ROUTES.HOME },
  {
    label: 'Компания',
    path: ROUTES.COMPANY,
    children: [
      { label: 'Новости', path: ROUTES.NEWS },
      { label: 'Вакансии', path: ROUTES.VACANCIES },
    ],
  },
  { label: 'Команда', path: ROUTES.TEAM },
  {
    label: 'Корпоративная культура',
    path: ROUTES.CULTURE,
    children: [
      { label: 'Лайв', path: ROUTES.LIVE },
      { label: 'Благодарности', path: ROUTES.GRATITUDE },
      { label: 'Банк идей', path: ROUTES.IDEAS },
      { label: 'Корп-магазин мерча', path: ROUTES.MERCH_SHOP },
      { label: 'Дневник настроения', path: ROUTES.MOOD },
    ],
  },
  {
    label: 'База знаний',
    path: ROUTES.KNOWLEDGE_BASE,
    children: [{ label: 'Библиотека', path: ROUTES.LIBRARY }],
  },
];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const DEBOUNCE_DELAY_MS = 300;

export const DEFAULT_PAGE_SIZE = 10;

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_FORMAT_SHORT = 'DD MMMM';
