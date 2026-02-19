import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, keyframes } from '@mui/material';
import {
  ThumbUpOutlined,
  FavoriteBorder,
  VisibilityOutlined,
  ChatBubbleOutline,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/shared';
import { ROUTES } from '@/lib/constants';
import type { LivePublication } from '@/features/live/types';

interface Props {
  publications: LivePublication[];
}

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
`;

const LiveDot: React.FC = () => (
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      bgcolor: 'error.main',
      animation: `${pulse} 1.5s ease-in-out infinite`,
      flexShrink: 0,
    }}
  />
);

const LiveTitle: React.FC = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <LiveDot />
    <Typography variant="h4" component="h2" fontWeight={700} color="error.main">
      LIVE
    </Typography>
  </Box>
);

const StatBadge: React.FC<{ icon: React.ReactNode; count: number }> = ({ icon, count }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    {icon}
    <Typography variant="caption">{count}</Typography>
  </Box>
);

export const LiveWidget: React.FC<Props> = React.memo(({ publications }) => (
  <Box>
    <SectionHeader
      titleNode={<LiveTitle />}
      linkText="Вся наша LIVE"
      linkTo={ROUTES.LIVE}
      action={
        <Chip
          label="+ Публикация"
          component={Link}
          to={ROUTES.LIVE}
          clickable
          color="primary"
          variant="outlined"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      }
    />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
      {publications.map((pub) => (
        <Card
          key={pub.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <CardMedia
            component="div"
            sx={{
              height: 150,
              backgroundColor: 'grey.100',
              backgroundImage: pub.imageUrl ? `url(${pub.imageUrl})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <Chip
              label={pub.authorName}
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(4px)',
                fontWeight: 600,
                fontSize: '0.65rem',
              }}
            />
          </CardMedia>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              {pub.title}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 1.5,
              }}
            >
              {pub.description}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                pt: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <StatBadge
                icon={<ThumbUpOutlined sx={{ fontSize: 13, color: 'text.secondary' }} />}
                count={pub.likesCount}
              />
              <StatBadge
                icon={<FavoriteBorder sx={{ fontSize: 13, color: 'error.light' }} />}
                count={pub.heartsCount}
              />
              <StatBadge
                icon={<VisibilityOutlined sx={{ fontSize: 13, color: 'text.secondary' }} />}
                count={pub.viewsCount}
              />
              <StatBadge
                icon={<ChatBubbleOutline sx={{ fontSize: 13, color: 'text.secondary' }} />}
                count={pub.commentsCount}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
));

LiveWidget.displayName = 'LiveWidget';
