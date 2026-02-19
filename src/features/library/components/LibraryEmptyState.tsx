import React from 'react';
import { Typography } from '@mui/material';
import { MenuBookRounded } from '@mui/icons-material';
import styles from '../LibraryPage.module.scss';

export const LibraryEmptyState: React.FC = React.memo(() => (
  <div className={styles.emptyState}>
    <div className={styles.emptyIcon}>
      <MenuBookRounded sx={{ fontSize: 24, color: '#8b5cf6', opacity: 0.4 }} />
    </div>
    <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1rem' }}>
      Книги не найдены
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ maxWidth: 320, fontSize: '0.8125rem' }}
    >
      Попробуйте изменить фильтры или поисковый запрос
    </Typography>
  </div>
));
