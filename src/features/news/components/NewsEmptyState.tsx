import React from 'react';
import { Typography } from '@mui/material';
import { NewspaperRounded } from '@mui/icons-material';
import styles from '../NewsPage.module.scss';

export const NewsEmptyState: React.FC = React.memo(() => (
  <div className={styles.emptyState}>
    <div className={styles.emptyIcon}>
      <NewspaperRounded sx={{ fontSize: 24, color: '#0d9488', opacity: 0.4 }} />
    </div>
    <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1rem' }}>
      Новости не найдены
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
