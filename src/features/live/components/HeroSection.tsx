import React from 'react';
import styles from '../LivePage.module.scss';

interface LiveStats {
  totalPublications: number;
  thisMonth: number;
  totalAuthors: number;
}

interface Props {
  stats: LiveStats;
}

export const HeroSection: React.FC<Props> = React.memo(({ stats }) => (
  <div className={styles.pageHeader}>
    <div className={styles.pageHeaderLeft}>
      <h1 className={styles.pageTitle}>Live</h1>
      <p className={styles.pageSubtitle}>Публикации, события и активности сотрудников</p>
    </div>

    <div className={styles.pageStats}>
      <div className={styles.pageStat}>
        <span className={styles.pageStatValue}>{stats.totalPublications}</span>
        <span className={styles.pageStatLabel}>публикаций</span>
      </div>
      <div className={styles.pageStat}>
        <span className={styles.pageStatValue}>{stats.thisMonth}</span>
        <span className={styles.pageStatLabel}>за месяц</span>
      </div>
      <div className={styles.pageStat}>
        <span className={styles.pageStatValue}>{stats.totalAuthors}</span>
        <span className={styles.pageStatLabel}>авторов</span>
      </div>
    </div>
  </div>
));
