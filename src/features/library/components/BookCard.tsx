import React from 'react';
import { alpha } from '@mui/material/styles';
import {
  StarRounded,
  MenuBookRounded,
  VisibilityOutlined,
  AutoStoriesRounded,
} from '@mui/icons-material';
import type { LibraryBook } from '../types';
import { BOOK_CATEGORY_LABELS, BOOK_STATUS_LABELS } from '../types';
import { getCategoryColor, getStatusColor, formatRating, pluralizeReviews } from '../utils';
import styles from '../LibraryPage.module.scss';

interface Props {
  book: LibraryBook;
}

export const BookCard: React.FC<Props> = React.memo(({ book }) => {
  const categoryColor = getCategoryColor(book.category);
  const statusColor = getStatusColor(book.status);

  return (
    <article className={styles.card}>
      <div className={styles.cardCover}>
        <div
          className={styles.cardCoverInner}
          style={{
            background: book.coverUrl
              ? undefined
              : `linear-gradient(135deg, ${alpha(categoryColor, 0.08)} 0%, ${alpha('#8b5cf6', 0.04)} 50%, ${alpha('#f59e0b', 0.02)} 100%)`,
          }}
        >
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className={styles.cardBookImage} />
          ) : (
            <MenuBookRounded sx={{ fontSize: 48, color: alpha(categoryColor, 0.2) }} />
          )}
        </div>

        <div className={styles.cardCoverOverlay}>
          {book.isNew && <span className={styles.cardNewBadge}>New</span>}
          <span className={styles.cardStatusBadge} style={{ color: statusColor }}>
            <span className={styles.statusDot} style={{ background: statusColor }} />
            {BOOK_STATUS_LABELS[book.status]}
          </span>
        </div>

        <span className={styles.cardCategoryBadge}>{BOOK_CATEGORY_LABELS[book.category]}</span>

        <div className={styles.pageCount}>
          <AutoStoriesRounded sx={{ fontSize: 10 }} />
          {book.pageCount} стр.
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{book.title}</h3>
        <span className={styles.cardAuthor}>{book.author}</span>
        <p className={styles.cardDescription}>{book.description}</p>

        {book.tags.length > 0 && (
          <div className={styles.cardTags}>
            {book.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.cardTag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.cardRating}>
          <StarRounded sx={{ fontSize: 14, color: '#f59e0b' }} />
          <span className={styles.cardRatingValue}>{formatRating(book.rating)}</span>
          <span className={styles.cardRatingCount}>({pluralizeReviews(book.reviewsCount)})</span>
        </div>

        <div className={styles.cardStats}>
          <span className={styles.cardStat}>
            <VisibilityOutlined sx={{ fontSize: 11 }} />
            {book.borrowCount}
          </span>
          {book.status === 'available' ? (
            <button type="button" className={styles.borrowButton}>
              Взять
            </button>
          ) : (
            <span className={`${styles.borrowButton} ${styles.borrowButtonDisabled}`}>
              {book.returnDate ? `до ${book.returnDate}` : 'Занята'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
});
