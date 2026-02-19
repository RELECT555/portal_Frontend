import type { CultureSection, CulturePageAuthor } from './types';

export const CULTURE_AUTHOR: CulturePageAuthor = {
  fullName: 'Евтушенко Иван Юрьевич',
  position: 'Девопс инженер',
};

export const CULTURE_SECTIONS: CultureSection[] = [
  {
    id: 'rules',
    title: 'Так принято',
    cards: [
      {
        id: '1',
        slug: 'work-schedule',
        title: 'Рабочий график',
        description: 'Режим работы, перерывы и гибкий график',
        order: 1,
      },
      {
        id: '2',
        slug: 'dress-code',
        title: 'Дресс-код',
        description: 'Стандарты внешнего вида в офисе и на встречах',
        order: 2,
      },
      {
        id: '3',
        slug: 'meeting-guests',
        title: 'Встреча гостей',
        description: 'Правила приёма посетителей и партнёров',
        order: 3,
      },
      {
        id: '4',
        slug: 'communication-tools',
        title: 'Инструменты коммуникации',
        description: 'Каналы связи, мессенджеры и почта',
        order: 4,
      },
      {
        id: '5',
        slug: 'safety-rules',
        title: 'Правила безопасности',
        description: 'Охрана труда и техника безопасности',
        order: 5,
      },
      {
        id: '6',
        slug: 'gratitude-culture',
        title: 'Культура благодарностей',
        description: 'Как мы ценим и поддерживаем друг друга',
        order: 6,
      },
      {
        id: '7',
        slug: 'ethics',
        title: 'Ethics',
        description: 'Этические нормы и корпоративная этика',
        order: 7,
      },
      {
        id: '8',
        slug: 'business-support',
        title: 'Опыт ведения бизнеса',
        description: 'Практики и подходы к работе',
        order: 8,
      },
    ],
  },
  {
    id: 'events',
    title: 'Мероприятия и активности',
    cards: [
      {
        id: '9',
        slug: 'corporate-events',
        title: 'Корпоративные мероприятия',
        description: 'Праздники, тимбилдинги и выездные события',
        order: 1,
      },
      {
        id: '10',
        slug: 'sports',
        title: 'Спорт',
        description: 'Спортивные мероприятия и секции компании',
        order: 2,
      },
      {
        id: '11',
        slug: 'volunteering',
        title: 'Волонтёрство',
        description: 'Социальные проекты и благотворительность',
        order: 3,
      },
      {
        id: '12',
        slug: 'education',
        title: 'Обучение и развитие',
        description: 'Тренинги, курсы и программы развития',
        order: 4,
      },
    ],
  },
];
