import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ThumbUpOutlined, ChatBubbleOutline, VisibilityOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants';
import { SectionHeader } from '@/components/shared';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '@/features/news/types';
import type { NewsItem, NewsCategory } from '@/features/news/types';

interface Props {
  news: NewsItem[];
}

function getCatColor(category: NewsCategory): string {
  if (category === 'all') return '#64748b';
  return NEWS_CATEGORY_COLORS[category] ?? '#64748b';
}

const STAT_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.4,
  fontSize: '0.6875rem',
  color: 'text.secondary',
  transition: 'color 0.15s ease',
} as const;

interface NewsRowProps {
  item: NewsItem;
  index: number;
}

const NewsRow: React.FC<NewsRowProps> = React.memo(({ item, index }) => {
  const catColor = getCatColor(item.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1.25,
          px: 1.5,
          mx: -0.5,
          borderRadius: '10px',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            background: alpha(catColor, 0.04),
            boxShadow: `0 0 0 1px ${alpha(catColor, 0.06)}`,
            '& .news-title': {
              color: catColor,
            },
          },
        }}
      >
        {/* Color accent bar */}
        <Box
          sx={{
            width: 3,
            borderRadius: 2,
            flexShrink: 0,
            background: `linear-gradient(180deg, ${catColor} 0%, ${alpha(catColor, 0.2)} 100%)`,
            alignSelf: 'stretch',
            mt: 0.25,
            mb: 0.25,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Title */}
          <Typography
            className="news-title"
            component={Link}
            to={`/news/${item.id}`}
            variant="body2"
            sx={{
              display: 'block',
              mb: 0.5,
              color: 'text.primary',
              fontWeight: 550,
              fontSize: '0.8125rem',
              lineHeight: 1.35,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            {item.title}
          </Typography>

          {/* Meta row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {/* Category badge */}
            <Box
              component="span"
              sx={{
                fontSize: '0.5625rem',
                fontWeight: 600,
                px: 0.75,
                py: 0.125,
                borderRadius: '4px',
                bgcolor: alpha(catColor, 0.08),
                color: catColor,
                letterSpacing: '0.01em',
                lineHeight: 1.4,
              }}
            >
              {NEWS_CATEGORY_LABELS[item.category]}
            </Box>

            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6875rem' }}>
              {dayjs(item.publishedAt).format('DD MMM')}
            </Typography>

            <Box sx={{ flex: 1 }} />

            <Box sx={STAT_SX}>
              <ThumbUpOutlined sx={{ fontSize: 10 }} />
              {item.likesCount}
            </Box>
            <Box sx={STAT_SX}>
              <ChatBubbleOutline sx={{ fontSize: 10 }} />
              {item.commentsCount}
            </Box>
            <Box sx={STAT_SX}>
              <VisibilityOutlined sx={{ fontSize: 10 }} />
              {item.viewsCount}
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
});

export const NewsListWidget: React.FC<Props> = React.memo(({ news }) => (
  <Card
    sx={{
      height: '100%',
      borderRadius: '14px',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: 'none',
      overflow: 'hidden',
    }}
  >
    <CardContent sx={{ p: 2, '&:last-child': { pb: 1.5 } }}>
      <SectionHeader title="Новости" linkText="Все новости" linkTo={ROUTES.NEWS} />

      {news.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
          Нет новостей
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {news.map((item, index) => (
            <React.Fragment key={item.id}>
              <NewsRow item={item} index={index} />
              {index < news.length - 1 && (
                <Box
                  sx={{
                    height: '1px',
                    mx: 1,
                    background:
                      'linear-gradient(90deg, transparent, rgba(0,0,0,0.04), transparent)',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
));

NewsListWidget.displayName = 'NewsListWidget';
NewsRow.displayName = 'NewsRow';
