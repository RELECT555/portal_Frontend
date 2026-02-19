import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { ThumbUpOutlined, ChatBubbleOutline } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import type { NewsItem } from '@/features/news/types';

dayjs.locale('ru');

interface Props {
  news: NewsItem | null;
}

export const MainNewsWidget: React.FC<Props> = React.memo(({ news }) => {
  if (!news) {
    return null;
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="div"
        sx={{
          height: 200,
          background: 'linear-gradient(145deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          p: 2.5,
          position: 'relative',
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{ position: 'relative', zIndex: 1, lineHeight: 1.3, color: 'text.primary' }}
        >
          {news.title}
        </Typography>
      </CardMedia>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Chip
          label="Главная новость дня"
          size="small"
          color="secondary"
          sx={{ mb: 1.5, alignSelf: 'flex-start', fontWeight: 600, fontSize: '0.7rem' }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 'auto', pb: 1.5 }}>
          {news.content}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            pt: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThumbUpOutlined sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption">{news.likesCount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ChatBubbleOutline sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="caption">{news.commentsCount}</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            {dayjs(news.publishedAt).format('DD MMMM')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});
