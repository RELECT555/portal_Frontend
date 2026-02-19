import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { ThumbUpOutlined, ChatBubbleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ROUTES } from '@/lib/constants';
import { SectionHeader } from '@/components/shared';
import type { NewsItem } from '@/features/news/types';

dayjs.locale('ru');

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
                transition: 'background 0.15s',
                '&:hover': { background: 'rgba(0,0,0,0.02)' },
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
                <Typography variant="caption" color="primary.main" fontWeight={600}>
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
