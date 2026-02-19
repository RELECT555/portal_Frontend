import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { ThumbUpOutlined, ChatBubbleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { ROUTES } from '@/lib/constants';
import { SectionHeader } from '@/components/shared';
import type { NewsItem } from '@/features/news/types';

interface Props {
  news: NewsItem[];
}

export const NewsListWidget: React.FC<Props> = React.memo(({ news }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <SectionHeader title="Новости" linkText="Все новости" linkTo={ROUTES.NEWS} />
      {news.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Нет новостей
        </Typography>
      ) : (
        news.map((item, index) => (
          <React.Fragment key={item.id}>
            <Box
              sx={{
                py: 1.5,
                px: 1,
                mx: -1,
                borderRadius: 1,
                borderLeft: '2px solid transparent',
                transition: 'background 0.15s, border-color 0.15s',
                '&:hover': {
                  background: 'rgba(0,0,0,0.02)',
                  borderLeftColor: 'primary.main',
                },
              }}
            >
              <Typography
                component={Link}
                to={`/news/${item.id}`}
                variant="body2"
                fontWeight={500}
                sx={{
                  display: 'block',
                  mb: 0.5,
                  color: 'text.primary',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.15s',
                }}
              >
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    bgcolor: 'rgba(13, 148, 136, 0.06)',
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 1,
                    fontSize: '0.65rem',
                  }}
                >
                  {dayjs(item.publishedAt).format('DD MMMM')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ThumbUpOutlined sx={{ fontSize: 13, color: 'text.secondary' }} />
                  <Typography variant="caption">{item.likesCount}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ChatBubbleOutline sx={{ fontSize: 13, color: 'text.secondary' }} />
                  <Typography variant="caption">{item.commentsCount}</Typography>
                </Box>
              </Box>
            </Box>
            {index < news.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
          </React.Fragment>
        ))
      )}
    </CardContent>
  </Card>
));

NewsListWidget.displayName = 'NewsListWidget';
