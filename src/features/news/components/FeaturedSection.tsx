import React, { useMemo } from 'react';
import { Avatar, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ThumbUpOutlined,
  VisibilityOutlined,
  ChatBubbleOutline,
  PushPin,
  NewspaperRounded,
} from '@mui/icons-material';
import type { NewsItem } from '../types';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '../types';
import { getInitials, formatCount, formatRelativeDate, getCategoryColor } from '../utils';
import styles from '../NewsPage.module.scss';

interface Props {
  mainNews: NewsItem;
  sidebarNews: NewsItem[];
}

const SidebarCard: React.FC<{ item: NewsItem }> = React.memo(({ item }) => {
  const catColor = getCategoryColor(item.category, NEWS_CATEGORY_COLORS);

  return (
    <div className={styles.featuredSideCard}>
      <div
        className={styles.featuredSideImage}
        style={{
          background: `linear-gradient(135deg, ${alpha(catColor, 0.08)} 0%, ${alpha('#6366f1', 0.05)} 100%)`,
        }}
      >
        <NewspaperRounded sx={{ fontSize: 22, color: alpha(catColor, 0.25) }} />
      </div>
      <div className={styles.featuredSideBody}>
        <span className={styles.cardCategoryBadge}>{NEWS_CATEGORY_LABELS[item.category]}</span>
        <h4 className={styles.featuredSideTitle}>{item.title}</h4>
        <div className={styles.featuredSideMeta}>
          <span>{formatRelativeDate(item.publishedAt)}</span>
          <span className={styles.metaDot} />
          <span className={styles.metaIcon}>
            <ThumbUpOutlined sx={{ fontSize: 10 }} />
            {item.likesCount}
          </span>
          <span className={styles.metaDot} />
          <span className={styles.metaIcon}>
            <VisibilityOutlined sx={{ fontSize: 10 }} />
            {item.viewsCount}
          </span>
        </div>
      </div>
    </div>
  );
});

export const FeaturedSection: React.FC<Props> = React.memo(({ mainNews, sidebarNews }) => {
  const mainInitials = useMemo(() => getInitials(mainNews.authorName), [mainNews.authorName]);
  const mainCatColor = getCategoryColor(mainNews.category, NEWS_CATEGORY_COLORS);

  return (
    <>
      <div className={styles.featured}>
        <article className={styles.featuredMain}>
          <div
            className={styles.featuredMainImage}
            style={
              !mainNews.coverImageUrl
                ? {
                    background: `linear-gradient(135deg, ${alpha(mainCatColor, 0.07)} 0%, ${alpha('#6366f1', 0.04)} 50%, ${alpha('#f59e0b', 0.03)} 100%)`,
                  }
                : undefined
            }
          >
            {mainNews.coverImageUrl ? (
              <Box
                component="img"
                src={mainNews.coverImageUrl}
                alt={mainNews.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  inset: 0,
                }}
              />
            ) : (
              <NewspaperRounded sx={{ fontSize: 48, color: alpha(mainCatColor, 0.15) }} />
            )}

            <div className={styles.featuredMainImageOverlay}>
              <span className={styles.cardPinnedBadge}>Главная</span>
              <span className={styles.cardCategoryBadge}>
                {NEWS_CATEGORY_LABELS[mainNews.category]}
              </span>
            </div>
          </div>

          <div className={styles.featuredMainBody}>
            <h2 className={styles.featuredMainTitle}>{mainNews.title}</h2>
            <p className={styles.featuredMainContent}>{mainNews.content}</p>

            {mainNews.tags.length > 0 && (
              <div className={styles.featuredMainTags}>
                {mainNews.tags.map((tag) => (
                  <span key={tag} className={styles.featuredMainTag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.featuredMainFooter}>
            <div className={styles.cardAuthor}>
              <Avatar
                sx={{
                  width: 20,
                  height: 20,
                  fontSize: '0.5rem',
                  fontWeight: 600,
                  bgcolor: alpha(mainCatColor, 0.08),
                  color: mainCatColor,
                }}
              >
                {mainInitials}
              </Avatar>
              <div>
                <span className={styles.cardAuthorName}>{mainNews.authorName}</span>
                <span className={styles.cardDate}>
                  {' · '}
                  {formatRelativeDate(mainNews.publishedAt)}
                </span>
              </div>
            </div>
            <div className={styles.cardStats}>
              <span className={styles.cardStat}>
                <ThumbUpOutlined sx={{ fontSize: 11 }} />
                {formatCount(mainNews.likesCount)}
              </span>
              <span className={styles.cardStat}>
                <VisibilityOutlined sx={{ fontSize: 11 }} />
                {formatCount(mainNews.viewsCount)}
              </span>
              <span className={styles.cardStat}>
                <ChatBubbleOutline sx={{ fontSize: 11 }} />
                {formatCount(mainNews.commentsCount)}
              </span>
            </div>
          </div>
        </article>

        <div className={styles.featuredSidebar}>
          {sidebarNews.map((item) => (
            <SidebarCard key={item.id} item={item} />
          ))}

          {sidebarNews.length === 0 && (
            <div className={styles.featuredSideEmpty}>
              <PushPin sx={{ fontSize: 18, mb: 0.5, opacity: 0.3 }} />
              Нет закреплённых
            </div>
          )}
        </div>
      </div>

      <div className={styles.sectionDivider}>
        <div className={styles.sectionDividerLine} />
        <span className={styles.sectionDividerLabel}>Все новости</span>
        <div className={styles.sectionDividerLine} />
      </div>
    </>
  );
});
