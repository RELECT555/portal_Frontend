import { z } from 'zod';
import type { JSONContent } from '@tiptap/react';

export const postSchema = z.object({
  type: z.enum(['news', 'live', 'idea', 'announcement', 'article'], {
    message: 'Выберите тип поста',
  }),
  title: z
    .string({ message: 'Введите заголовок' })
    .min(3, 'Минимум 3 символа')
    .max(200, 'Максимум 200 символов'),
  content: z.custom<JSONContent>(
    (val) => val !== undefined && val !== null && typeof val === 'object',
    'Контент обязателен',
  ),
  coverImageUrl: z.string().url('Некорректный URL изображения').optional().or(z.literal('')),
  tags: z.array(z.string()).max(10, 'Максимум 10 тегов'),
  status: z.enum(['draft', 'published', 'archived'], {
    message: 'Выберите статус',
  }),
  isMain: z.boolean().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;
