import React from 'react';
import { alpha } from '@mui/material/styles';
import { StarRounded, MenuBookRounded, AutoStoriesRounded } from '@mui/icons-material';
import type { LibraryBook } from '../types';
import { BOOK_STATUS_LABELS } from '../types';
import { getCategoryColor, getStatusColor, formatRating, pluralizeReviews } from '../utils';
import styles from '../LibraryPage.module.scss';

interface Props {
  books: LibraryBook[];
}

export const FeaturedBooks: React.FC<Props> = React.memo(({ books }) => {
  if (books.length === 0) return null;

  return (
    <>
      <div className={styles.sectionDivider}>
        <div className={styles.sectionDividerLine} />
        <span className={styles.sectionDividerLabel}>Рекомендуем</span>
        <div className={styles.sectionDividerLine} />
      </div>

      <div className={styles.featured}>
        {books.map((book) => {
          const categoryColor = getCategoryColor(book.category);
          const statusColor = getStatusColor(book.status);

          return (
            <article key={book.id} className={styles.featuredCard}>
              <div className={styles.featuredCover}>
                <div
                  className={styles.featuredCoverInner}
                  style={{
                    background: `linear-gradient(135deg, ${alpha(categoryColor, 0.08)} 0%, ${alpha('#8b5cf6', 0.04)} 50%, ${alpha('#f59e0b', 0.02)} 100%)`,
                  }}
                >
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      style={{ height: '160px', objectFit: 'contain' }}
                    />
                  ) : (
                    <MenuBookRounded sx={{ fontSize: 56, color: alpha(categoryColor, 0.18) }} />
                  )}
                </div>
                <div className={styles.featuredCoverOverlay}>
                  <span className={styles.cardStatusBadge} style={{ color: statusColor }}>
                    <span className={styles.statusDot} style={{ background: statusColor }} />
                    {BOOK_STATUS_LABELS[book.status]}
                  </span>
                </div>
              </div>

              <div className={styles.featuredBody}>
                <h3 className={styles.featuredTitle}>{book.title}</h3>
                <span className={styles.featuredAuthor}>{book.author}</span>
                <p className={styles.featuredDescription}>{book.description}</p>
              </div>

              <div className={styles.featuredFooter}>
                <div className={styles.cardRating}>
                  <StarRounded sx={{ fontSize: 14, color: '#f59e0b' }} />
                  <span className={styles.cardRatingValue}>{formatRating(book.rating)}</span>
                  <span className={styles.cardRatingCount}>
                    ({pluralizeReviews(book.reviewsCount)})
                  </span>
                </div>

                <div className={styles.cardStats}>
                  <span className={styles.cardStat}>
                    <AutoStoriesRounded sx={{ fontSize: 11 }} />
                    {book.pageCount} стр.
                  </span>
                  {book.status === 'available' ? (
                    <button type="button" className={styles.borrowButton}>
                      Взять
                    </button>
                  ) : (
                    <span className={`${styles.borrowButton} ${styles.borrowButtonDisabled}`}>
                      Занята
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
});
