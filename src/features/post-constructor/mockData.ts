import type { Post } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    type: 'news',
    title: 'Ссылка для подключения внутри новости',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Ссылка на прямую трансляцию Премии «Лучший сотрудник 2025»',
            },
          ],
        },
      ],
    },
    contentHtml: '<p>Ссылка на прямую трансляцию Премии «Лучший сотрудник 2025»</p>',
    tags: ['премия', 'трансляция'],
    authorId: 'u1',
    authorName: 'Администратор',
    status: 'published',
    isMain: true,
    publishedAt: '2026-02-19T10:00:00Z',
    createdAt: '2026-02-19T09:00:00Z',
    updatedAt: '2026-02-19T10:00:00Z',
    likesCount: 2,
    commentsCount: 0,
    viewsCount: 150,
  },
  {
    id: '2',
    type: 'news',
    title: 'Режим работы Компании с 20.02.2026 по 24.02.2026',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Уважаемые коллеги! Информируем вас о режиме работы компании в праздничные дни.',
            },
          ],
        },
      ],
    },
    contentHtml:
      '<p>Уважаемые коллеги! Информируем вас о режиме работы компании в праздничные дни.</p>',
    tags: ['режим работы'],
    authorId: 'u1',
    authorName: 'HR-отдел',
    status: 'published',
    publishedAt: '2026-02-18T08:00:00Z',
    createdAt: '2026-02-18T07:30:00Z',
    updatedAt: '2026-02-18T08:00:00Z',
    likesCount: 2,
    commentsCount: 0,
    viewsCount: 340,
  },
  {
    id: '3',
    type: 'live',
    title: 'Новогодние игрушки 2026 — розыгрыш',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Количество игрушек ограничено, поэтому обладателей выберем случайным образом среди всех желающих.',
            },
          ],
        },
      ],
    },
    contentHtml:
      '<p>Количество игрушек ограничено, поэтому обладателей выберем случайным образом среди всех желающих.</p>',
    tags: ['корп. культура', 'розыгрыш'],
    authorId: 'u2',
    authorName: 'Корп. культура',
    status: 'published',
    publishedAt: '2026-02-10T12:00:00Z',
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-02-10T12:00:00Z',
    likesCount: 27,
    commentsCount: 45,
    viewsCount: 507,
  },
  {
    id: '4',
    type: 'idea',
    title: 'Автоматизация отчётности через портал',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Предлагаю интегрировать генерацию ежемесячных отчётов прямо в портал, чтобы сократить ручную работу.',
            },
          ],
        },
      ],
    },
    contentHtml:
      '<p>Предлагаю интегрировать генерацию ежемесячных отчётов прямо в портал, чтобы сократить ручную работу.</p>',
    tags: ['автоматизация', 'отчёты'],
    authorId: 'u3',
    authorName: 'Борискин Иван Игоревич',
    status: 'draft',
    createdAt: '2026-02-17T14:00:00Z',
    updatedAt: '2026-02-17T14:00:00Z',
    likesCount: 0,
    commentsCount: 0,
    viewsCount: 0,
  },
];
