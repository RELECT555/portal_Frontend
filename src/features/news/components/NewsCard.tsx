import React from 'react';
import { Avatar, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ThumbUpOutlined,
  VisibilityOutlined,
  ChatBubbleOutline,
  PushPin,
  NewspaperRounded,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import type { NewsItem } from '../types';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '../types';
import styles from '../NewsPage.module.scss';

interface Props {
  item: NewsItem;
}

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

export const NewsCard: React.FC<Props> = React.memo(({ item }) => {
  const categoryColor =
    item.category !== 'all' ? (NEWS_CATEGORY_COLORS[item.category] ?? '#64748b') : '#64748b';

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <Box className={styles.cardImageInner} sx={{ bgcolor: alpha(categoryColor, 0.06) }}>
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
          {item.coverImageUrl ? (
            <Box
              component="img"
              src={item.coverImageUrl}
              alt={item.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              }}
            />
          ) : (
            <NewspaperRounded sx={{ fontSize: 40, color: alpha(categoryColor, 0.3) }} />
          )}
        </Box>

        <div className={styles.cardImageOverlay}>
          {item.isPinned && (
            <span className={styles.cardPinnedBadge}>
              <PushPin sx={{ fontSize: 10 }} />
              Закреп
            </span>
          )}
          <span className={styles.cardCategoryBadge}>
            {NEWS_CATEGORY_LABELS[item.category] ?? item.category}
          </span>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDescription}>{item.content}</p>

        {item.tags.length > 0 && (
          <div className={styles.cardTags}>
            {item.tags.slice(0, 3).map((tag) => (
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
            {getInitials(item.authorName)}
          </Avatar>
          <div>
            <span className={styles.cardAuthorName}>{item.authorName}</span>
            <span className={styles.cardDate}>
              {' · '}
              {dayjs(item.publishedAt).format('DD MMM')}
            </span>
          </div>
        </div>

        <div className={styles.cardStats}>
          <span className={styles.cardStat}>
            <ThumbUpOutlined sx={{ fontSize: 13 }} />
            {formatCount(item.likesCount)}
          </span>
          <span className={styles.cardStat}>
            <VisibilityOutlined sx={{ fontSize: 13 }} />
            {formatCount(item.viewsCount)}
          </span>
          <span className={styles.cardStat}>
            <ChatBubbleOutline sx={{ fontSize: 13 }} />
            {formatCount(item.commentsCount)}
          </span>
        </div>
      </div>
    </article>
  );
});
