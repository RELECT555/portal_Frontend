import React from 'react';
import { Typography } from '@mui/material';
import styles from './SharedPage.module.scss';

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export const EmptyState: React.FC<Props> = React.memo(
  ({ icon, title, subtitle = 'Попробуйте изменить фильтры или поисковый запрос', className }) => (
    <div className={`${styles.emptyState} ${className ?? ''}`}>
      <div className={styles.emptyIcon}>{icon}</div>
      <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1rem' }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 320, fontSize: '0.8125rem' }}
      >
        {subtitle}
      </Typography>
    </div>
  ),
);
