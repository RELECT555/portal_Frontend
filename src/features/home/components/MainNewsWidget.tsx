import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ThumbUpOutlined, ChatBubbleOutline } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import dayjs from 'dayjs';
import type { NewsItem } from '@/features/news/types';

interface Props {
  news: NewsItem | null;
}

export const MainNewsWidget: React.FC<Props> = React.memo(({ news }) => {
  if (!news) {
    return null;
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: 220,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -20,
            right: 80,
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          }}
        />
        <Chip
          label="Главная новость дня"
          size="small"
          variant="outlined"
          color="primary"
          sx={{ alignSelf: 'flex-start', mb: 1.5, fontWeight: 600, fontSize: '0.7rem' }}
        />
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{ position: 'relative', zIndex: 1, lineHeight: 1.3, color: 'text.primary' }}
        >
          {news.title}
        </Typography>
      </Box>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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

MainNewsWidget.displayName = 'MainNewsWidget';
