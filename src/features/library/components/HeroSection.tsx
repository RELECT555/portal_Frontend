import React from 'react';
import type { LibraryStats } from '../types';
import styles from '../LibraryPage.module.scss';

interface Props {
  stats: LibraryStats;
}

export const HeroSection: React.FC<Props> = React.memo(({ stats }) => (
  <div className={styles.pageHeader}>
    <div className={styles.pageHeaderLeft}>
      <h1 className={styles.pageTitle}>Корпоративная библиотека</h1>
      <p className={styles.pageSubtitle}>
        Книги для профессионального и личностного роста сотрудников
      </p>
    </div>

    <div className={styles.pageStats}>
      <div className={styles.pageStat}>
        <span className={styles.pageStatValue}>{stats.totalBooks}</span>
        <span className={styles.pageStatLabel}>книг</span>
      </div>
      <div className={styles.pageStat}>
        <span className={styles.pageStatValue}>{stats.available}</span>
        <span className={styles.pageStatLabel}>доступно</span>
      </div>
      <div className={styles.pageStat}>
        <span className={styles.pageStatValue}>{stats.readers}</span>
        <span className={styles.pageStatLabel}>читателей</span>
      </div>
    </div>
  </div>
));
