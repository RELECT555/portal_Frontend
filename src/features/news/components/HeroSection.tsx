import React from 'react';
import type { NewsStats } from '../types';
import styles from '../NewsPage.module.scss';

interface Props {
  stats: NewsStats;
}

export const HeroSection: React.FC<Props> = React.memo(({ stats }) => (
  <div className={styles.pageHeader}>
    <div className={styles.pageHeaderLeft}>
      <h1 className={styles.pageTitle}>Новости</h1>
      <p className={styles.pageSubtitle}>Актуальные новости компании, объявления и события</p>
    </div>

    <div className={styles.pageStats}>
      <div className={styles.pageStat}>
        <span className={styles.pageStatValue}>{stats.totalNews}</span>
        <span className={styles.pageStatLabel}>новостей</span>
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
