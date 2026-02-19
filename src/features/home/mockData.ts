import type { NewsItem } from '@/features/news/types';
import type { BirthdayPerson, NewEmployee, AnniversaryPerson } from '@/features/birthdays/types';
import type { LivePublication } from '@/features/live/types';
import type { GratitudeEntry } from '@/features/gratitude/types';
import type { Vacancy } from '@/features/vacancies/types';
import type { Book } from '@/features/library/types';
import type { KnowledgeBaseDocument } from '@/features/knowledge-base/types';

export const MOCK_MAIN_NEWS: NewsItem = {
  id: '1',
  title: 'Ссылка для подключения внутри новости',
  content: 'Ссылка на прямую трансляцию Премии «Лучший сотрудник 2025»',
  publishedAt: '2026-02-19',
  likesCount: 2,
  commentsCount: 0,
  viewsCount: 540,
  isMain: true,
  authorName: 'HR-отдел',
  category: 'events',
  tags: ['премия', 'трансляция'],
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '2',
    title: 'Режим работы Компании с 20.02.2026 по 24.02.2026',
    content: '',
    publishedAt: '2026-02-18',
    likesCount: 2,
    commentsCount: 0,
    viewsCount: 320,
    authorName: 'Администрация',
    category: 'announcements',
    tags: ['расписание'],
  },
  {
    id: '3',
    title: 'ВАЖНЫЕ ИЗМЕНЕНИЯ программы добровольного медицинского страхования (ДМС)!',
    content: '',
    publishedAt: '2026-02-18',
    likesCount: 2,
    commentsCount: 0,
    viewsCount: 890,
    authorName: 'HR-отдел',
    category: 'hr',
    tags: ['ДМС', 'страхование'],
  },
  {
    id: '4',
    title: 'До объявления победителей премии «Лучший сотрудник 2025» остается... 1 день!',
    content: '',
    publishedAt: '2026-02-18',
    likesCount: 5,
    commentsCount: 0,
    viewsCount: 1200,
    authorName: 'Корп. культура',
    category: 'events',
    tags: ['премия'],
  },
  {
    id: '5',
    title: 'Лучший сотрудник 2025. Приглашаем на премию!',
    content: '',
    publishedAt: '2026-02-17',
    likesCount: 9,
    commentsCount: 0,
    viewsCount: 2100,
    authorName: 'HR-отдел',
    category: 'events',
    tags: ['премия', 'мероприятие'],
  },
];

export const MOCK_BIRTHDAYS: BirthdayPerson[] = [
  {
    id: '1',
    fullName: 'Назаров Николай Андреевич',
    position: 'Системный администратор',
    date: '19 февраля',
  },
];

export const MOCK_NEW_EMPLOYEES: NewEmployee[] = [
  {
    id: '1',
    fullName: 'Тарасов Сергей Анатольевич',
    position: 'Менеджер интернет-продаж',
    hireDate: '18 февраля',
  },
];

export const MOCK_ANNIVERSARIES: AnniversaryPerson[] = [
  {
    id: '1',
    fullName: 'Борискин Иван Игоревич',
    position: 'Инженер технической поддержки',
    date: '24 февраля',
    years: 1,
  },
];

export const MOCK_LIVE_PUBLICATIONS: LivePublication[] = [
  {
    id: '1',
    title: 'Новогодние игрушки 2026 — розыгрыш',
    description:
      'Количество игрушек ограничено, поэтому обладателей выберем случайным образом среди всех желающих.',
    imageUrl: '',
    authorName: 'Корп. культура',
    publishedAt: '2026-02-10',
    likesCount: 27,
    heartsCount: 3,
    viewsCount: 507,
    commentsCount: 45,
    tags: ['розыгрыш', 'новый год'],
    category: 'corporate',
  },
  {
    id: '2',
    title: 'Забег РФ ЗАБЕГ — это праздник для всех',
    description: 'Забег РФ Десятый всероссийский полумарафон с синхронным стартом',
    imageUrl: '',
    authorName: 'Спорт',
    publishedAt: '2026-02-08',
    likesCount: 19,
    heartsCount: 0,
    viewsCount: 204,
    commentsCount: 8,
    tags: ['спорт', 'забег'],
    category: 'sport',
  },
];

export const MOCK_GRATITUDE_FEED: GratitudeEntry[] = [
  {
    id: '1',
    fromName: 'Иванова Мария',
    toName: 'Ляхов Алексей Федорович',
    toPosition: 'Системный аналитик',
    message: 'Огромное спасибо за помощь с аналитикой по проекту!',
    createdAt: '2026-02-19',
  },
  {
    id: '2',
    fromName: 'Петров Дмитрий',
    toName: 'Битяй Елена Анатольевна',
    toPosition: 'Специалист',
    message: 'Лена, спасибо что всегда готова помочь — настоящий командный игрок.',
    createdAt: '2026-02-18',
  },
  {
    id: '3',
    fromName: 'Смирнова Ольга',
    toName: 'Костикова Дарья Евгеньевна',
    toPosition: 'Клиент-менеджер',
    message: 'Дарья, благодарю за отличную работу с клиентами!',
    createdAt: '2026-02-18',
  },
  {
    id: '4',
    fromName: 'Борискин Иван',
    toName: 'Назаров Николай Андреевич',
    toPosition: 'Системный администратор',
    message: 'Коля, спасибо за оперативное решение проблемы с сервером!',
    createdAt: '2026-02-17',
  },
  {
    id: '5',
    fromName: 'Козлова Анна',
    toName: 'Тарасов Сергей Анатольевич',
    toPosition: 'Менеджер интернет-продаж',
    message: 'Сергей, спасибо за помощь с обучением — очень доступно объяснил.',
    createdAt: '2026-02-17',
  },
  {
    id: '6',
    fromName: 'Федорова Екатерина',
    toName: 'Борискин Иван Игоревич',
    toPosition: 'Инженер технической поддержки',
    message: 'Иван, огромное спасибо за быструю настройку оборудования!',
    createdAt: '2026-02-16',
  },
  {
    id: '7',
    fromName: 'Григорьев Максим',
    toName: 'Козлова Анна Викторовна',
    toPosition: 'Бухгалтер',
    message: 'Анна, благодарю за терпение и помощь с отчётностью.',
    createdAt: '2026-02-16',
  },
];

export const MOCK_VACANCIES: Vacancy[] = [
  {
    id: '1',
    title: 'Вечерний специалист по уборке помещений (Центр...',
    publishedAt: '2026-02-18',
  },
  { id: '2', title: 'Специалист технической поддержки 1С', publishedAt: '2026-02-17' },
  { id: '3', title: 'Клиент-менеджер', publishedAt: '2026-02-17' },
  { id: '4', title: 'Старший бухгалтер по производству', publishedAt: '2026-02-16' },
  { id: '5', title: 'Механик', publishedAt: '2026-02-16' },
  { id: '6', title: 'Аналитик бизнес-процессов', publishedAt: '2026-02-15' },
  { id: '7', title: 'Менеджер по закупкам (медицинские изделия)', publishedAt: '2026-02-15' },
];

export const MOCK_BOOKS: Book[] = [
  { id: '1', title: 'Управление результативностью', author: '', isAvailable: true },
  { id: '2', title: 'Убеждение', author: '', isAvailable: true },
  { id: '3', title: 'Управление бизнес-процессами', author: '', isAvailable: true },
  {
    id: '4',
    title: 'SMART 2.0. Как ставить цели, которые работают',
    author: '',
    isAvailable: true,
  },
];

export const MOCK_KB_DOCUMENTS: KnowledgeBaseDocument[] = [
  {
    id: '1',
    title: '03-СОП-06-02 Требования к компьютеризированным системам (МЕДИПАЛ)',
    category: 'СОП',
    updatedAt: '2026-02-18',
  },
  {
    id: '2',
    title:
      '11-П-08-01 О допуске подрядных организаций к производству работ на объектах (территории) (УО МЕДЕКА)',
    category: 'Политики',
    updatedAt: '2026-02-17',
  },
  {
    id: '3',
    title:
      '11-И-25-04 Инструкция по охране труда для специалиста, старшего специалиста (участок приемки и обработки товара) (МЕДИПАЛ)',
    category: 'Инструкции',
    updatedAt: '2026-02-16',
  },
  {
    id: '4',
    title:
      '11-И-30-04 По охране труда для контролера и старшего специалиста (участок контроля и экспедиции) (МЕДИПАЛ)',
    category: 'Инструкции',
    updatedAt: '2026-02-15',
  },
];
