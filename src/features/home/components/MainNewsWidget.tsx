import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ThumbUpOutlined,
  ChatBubbleOutline,
  VisibilityOutlined,
  NewspaperRounded,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { Tilt } from '@/components/ui/Tilt';
import { Spotlight } from '@/components/ui/Spotlight';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '@/features/news/types';
import type { NewsItem } from '@/features/news/types';

interface Props {
  news: NewsItem | null;
}

const TILT_SPRING = {
  stiffness: 26.7,
  damping: 4.1,
  mass: 0.2,
} as const;

const STAT_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.4,
  fontSize: '0.6875rem',
  color: 'rgba(255,255,255,0.75)',
} as const;

export const MainNewsWidget: React.FC<Props> = React.memo(({ news }) => {
  if (!news) return null;

  const catColor =
    news.category !== 'all'
      ? (NEWS_CATEGORY_COLORS[news.category as Exclude<typeof news.category, 'all'>] ?? '#64748b')
      : '#64748b';

  const hasCover = Boolean(news.coverImageUrl);

  return (
    <Tilt
      rotationFactor={4}
      isRevese
      springOptions={TILT_SPRING}
      style={{
        transformOrigin: 'center center',
        borderRadius: '14px',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 200,
          borderRadius: '14px',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'row',
          bgcolor: hasCover ? 'transparent' : alpha(catColor, 0.03),
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.25s ease',
          '&:hover': {
            boxShadow: `0 8px 32px ${alpha(catColor, 0.15)}, 0 0 0 1px ${alpha(catColor, 0.1)}`,
          },
        }}
      >
        <Spotlight size={280} springOptions={TILT_SPRING} />

        {/* Image section — left side */}
        <Box
          sx={{
            position: 'relative',
            width: '45%',
            minHeight: '100%',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {hasCover ? (
            <Box
              component="img"
              src={news.coverImageUrl}
              alt={news.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${alpha(catColor, 0.08)} 0%, ${alpha('#6366f1', 0.05)} 50%, ${alpha('#f59e0b', 0.03)} 100%)`,
              }}
            >
              <NewspaperRounded sx={{ fontSize: 56, color: alpha(catColor, 0.15) }} />
            </Box>
          )}

          {/* Gradient fade on right edge for smooth transition to content */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 60,
              background: hasCover
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,1))'
                : 'linear-gradient(90deg, transparent, rgba(248,250,251,1))',
            }}
          />
        </Box>

        {/* Content section — right side */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 2.5,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              px: 1,
              py: 0.25,
              borderRadius: '6px',
              fontSize: '0.625rem',
              fontWeight: 600,
              mb: 1,
              bgcolor: alpha(catColor, 0.1),
              color: catColor,
            }}
          >
            {NEWS_CATEGORY_LABELS[news.category]}
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              mb: 0.5,
              color: 'text.primary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {news.title}
          </Typography>

          {news.content && (
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.8125rem',
                lineHeight: 1.45,
                mb: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {news.content}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6875rem' }}>
              {dayjs(news.publishedAt).format('DD MMMM YYYY')}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ ...STAT_SX, color: 'text.secondary' }}>
              <ThumbUpOutlined sx={{ fontSize: 12 }} />
              {news.likesCount}
            </Box>
            <Box sx={{ ...STAT_SX, color: 'text.secondary' }}>
              <ChatBubbleOutline sx={{ fontSize: 12 }} />
              {news.commentsCount}
            </Box>
            <Box sx={{ ...STAT_SX, color: 'text.secondary' }}>
              <VisibilityOutlined sx={{ fontSize: 12 }} />
              {news.viewsCount}
            </Box>
          </Box>
        </Box>
      </Box>
    </Tilt>
  );
});

MainNewsWidget.displayName = 'MainNewsWidget';
