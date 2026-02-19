import React from 'react';
import { Avatar, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ThumbUpOutlined,
  VisibilityOutlined,
  ChatBubbleOutline,
  PushPin,
  NewspaperRounded,
  AccessTimeRounded,
} from '@mui/icons-material';
import type { NewsItem } from '../types';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '../types';
import {
  getInitials,
  formatCount,
  formatRelativeDate,
  getCategoryColor,
  estimateReadingTime,
} from '../utils';
import styles from '../NewsPage.module.scss';

interface Props {
  item: NewsItem;
}

export const NewsCard: React.FC<Props> = React.memo(({ item }) => {
  const categoryColor = getCategoryColor(item.category, NEWS_CATEGORY_COLORS);
  const readTime = item.readingTimeMin ?? estimateReadingTime(item.content);

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <div
          className={styles.cardImageInner}
          style={{
            background: item.coverImageUrl
              ? undefined
              : `linear-gradient(135deg, ${alpha(categoryColor, 0.07)} 0%, ${alpha('#6366f1', 0.04)} 50%, ${alpha('#f59e0b', 0.02)} 100%)`,
          }}
        >
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
            <NewspaperRounded sx={{ fontSize: 36, color: alpha(categoryColor, 0.18) }} />
          )}
        </div>

        <div className={styles.cardImageOverlay}>
          {item.isPinned && (
            <span className={styles.cardPinnedBadge}>
              <PushPin sx={{ fontSize: 9 }} />
              Закреп
            </span>
          )}
          <span className={styles.cardCategoryBadge}>
            {NEWS_CATEGORY_LABELS[item.category] ?? item.category}
          </span>
        </div>

        <div className={styles.cardReadTime}>
          <AccessTimeRounded sx={{ fontSize: 10 }} />
          {readTime} мин
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
              width: 18,
              height: 18,
              fontSize: '0.5rem',
              fontWeight: 600,
              bgcolor: alpha(categoryColor, 0.08),
              color: categoryColor,
            }}
          >
            {getInitials(item.authorName)}
          </Avatar>
          <div>
            <span className={styles.cardAuthorName}>{item.authorName}</span>
            <span className={styles.cardDate}>
              {' · '}
              {formatRelativeDate(item.publishedAt)}
            </span>
          </div>
        </div>

        <div className={styles.cardStats}>
          <span className={styles.cardStat}>
            <ThumbUpOutlined sx={{ fontSize: 11 }} />
            {formatCount(item.likesCount)}
          </span>
          <span className={styles.cardStat}>
            <VisibilityOutlined sx={{ fontSize: 11 }} />
            {formatCount(item.viewsCount)}
          </span>
          <span className={styles.cardStat}>
            <ChatBubbleOutline sx={{ fontSize: 11 }} />
            {formatCount(item.commentsCount)}
          </span>
        </div>
      </div>
    </article>
  );
});
