import React from 'react';
import styles from './SharedPage.module.scss';

export interface PageHeroStat {
  value: string | number;
  label: string;
}

interface Props {
  title: string;
  subtitle: string;
  stats: PageHeroStat[];
  action?: React.ReactNode;
  className?: string;
}

export const PageHero: React.FC<Props> = React.memo(
  ({ title, subtitle, stats, action, className }) => (
    <div className={`${styles.pageHeader} ${className ?? ''}`}>
      <div className={styles.pageHeaderLeft}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>{subtitle}</p>
      </div>

      {action}

      <div className={styles.pageStats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.pageStat}>
            <span className={styles.pageStatValue}>{stat.value}</span>
            <span className={styles.pageStatLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
);
