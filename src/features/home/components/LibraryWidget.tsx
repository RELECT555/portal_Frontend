import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { AutoStories as BookIcon } from '@mui/icons-material';
import { SectionHeader } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import type { Book } from '@/features/home/mockData';

interface Props {
  books: Book[];
}

const BOOK_COLORS = ['#f1f5f9', '#e2e8f0', '#f8fafc', '#eef2f7'];

export const LibraryWidget: React.FC<Props> = React.memo(({ books }) => (
  <Card>
    <CardContent>
      <SectionHeader
        title="Корпоративная библиотека"
        linkText="Все книги"
        linkTo={ROUTES.LIBRARY}
      />
      {books.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Нет доступных книг
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 2,
          }}
        >
          {books.map((book, idx) => (
            <Box
              key={book.id}
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '3/4',
                  backgroundColor: book.coverUrl
                    ? 'grey.200'
                    : BOOK_COLORS[idx % BOOK_COLORS.length],
                  borderRadius: 2,
                  mb: 1,
                  backgroundImage: book.coverUrl ? `url(${book.coverUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {!book.coverUrl && <BookIcon sx={{ fontSize: 28, opacity: 0.3 }} />}
              </Box>
              <Typography
                variant="caption"
                fontWeight={500}
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {book.title}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
));

LibraryWidget.displayName = 'LibraryWidget';
