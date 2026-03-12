import React from 'react';
import { SearchOff as SearchOffIcon } from '@mui/icons-material';
import styles from '../MerchShopPage.module.scss';

export const MerchEmptyState: React.FC = React.memo(() => (
  <div className={styles.emptyState}>
    <div className={styles.emptyIcon}>
      <SearchOffIcon sx={{ fontSize: 32, color: '#00fff1', opacity: 0.4 }} />
    </div>
    <h3
      className={styles.emptyTitle}
      style={{ fontSize: '1rem', fontWeight: 600, color: '#e0e7ff' }}
    >
      // NO_RESULTS_FOUND
    </h3>
    <p
      className={styles.emptySubtitle}
      style={{
        fontSize: '0.8125rem',
        maxWidth: 340,
        color: 'rgba(224, 231, 255, 0.45)',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      Попробуйте изменить параметры фильтрации или поисковой запрос
    </p>
  </div>
));

MerchEmptyState.displayName = 'MerchEmptyState';
