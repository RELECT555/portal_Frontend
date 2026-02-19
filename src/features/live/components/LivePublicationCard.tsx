import React from 'react';
import { Avatar, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ThumbUpOutlined,
  FavoriteBorder,
  VisibilityOutlined,
  ChatBubbleOutline,
  PushPin,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import classnames from 'classnames';
import type { LivePublication } from '../types';
import { LIVE_CATEGORY_LABELS } from '../types';
import styles from '../LivePage.module.scss';

interface Props {
  publication: LivePublication;
  isPinnedLayout?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  corporate: '#0d9488',
  sport: '#6366f1',
  creative: '#ec4899',
  volunteer: '#10b981',
  events: '#f59e0b',
};

const getInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const formatCount = (count: number): string => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
};

export const LivePublicationCard: React.FC<Props> = React.memo(
  ({ publication, isPinnedLayout }) => {
    const categoryColor = CATEGORY_COLORS[publication.category] ?? '#64748b';

    return (
      <article
        className={classnames(styles.card, {
          [styles.pinnedCard]: isPinnedLayout,
        })}
      >
        <div className={styles.cardImage}>
          <Box
            className={styles.cardImageInner}
            sx={{
              bgcolor: alpha(categoryColor, 0.06),
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                bgcolor: alpha(categoryColor, 0.06),
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -20,
                left: '30%',
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: alpha(categoryColor, 0.04),
              }}
            />
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: alpha(categoryColor, 0.12),
                color: categoryColor,
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              {getInitials(publication.authorName)}
            </Avatar>
          </Box>

          <div className={styles.cardImageOverlay}>
            {publication.isPinned && (
              <span className={styles.cardPinnedBadge}>
                <PushPin sx={{ fontSize: 10 }} />
                Закреп
              </span>
            )}
            <span className={styles.cardCategoryBadge}>
              {LIVE_CATEGORY_LABELS[publication.category] ?? publication.category}
            </span>
          </div>
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{publication.title}</h3>
          <p className={styles.cardDescription}>{publication.description}</p>

          {publication.tags.length > 0 && (
            <div className={styles.cardTags}>
              {publication.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.cardTag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.cardAuthor}>
            <Avatar
              sx={{
                width: 22,
                height: 22,
                fontSize: '0.55rem',
                fontWeight: 700,
                bgcolor: alpha(categoryColor, 0.15),
                color: categoryColor,
              }}
            >
              {getInitials(publication.authorName)}
            </Avatar>
            <div>
              <span className={styles.cardAuthorName}>{publication.authorName}</span>
              <span className={styles.cardDate}>
                {' · '}
                {dayjs(publication.publishedAt).format('DD MMM')}
              </span>
            </div>
          </div>

          <div className={styles.cardStats}>
            <span className={styles.cardStat}>
              <ThumbUpOutlined sx={{ fontSize: 13 }} />
              {formatCount(publication.likesCount)}
            </span>
            {publication.heartsCount > 0 && (
              <span className={styles.cardStat}>
                <FavoriteBorder sx={{ fontSize: 13, color: 'error.light' }} />
                {formatCount(publication.heartsCount)}
              </span>
            )}
            <span className={styles.cardStat}>
              <VisibilityOutlined sx={{ fontSize: 13 }} />
              {formatCount(publication.viewsCount)}
            </span>
            <span className={styles.cardStat}>
              <ChatBubbleOutline sx={{ fontSize: 13 }} />
              {formatCount(publication.commentsCount)}
            </span>
          </div>
        </div>
      </article>
    );
  },
);
