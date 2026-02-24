import React, { useMemo } from 'react';
import { BarChart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { ProfileStats } from '../types';
import { GlassCard } from './GlassCard';
import styles from '../ProfilePage.module.scss';

interface Props {
  stats: ProfileStats;
}

interface StatDisplay {
  key: string;
  label: string;
  value: number;
}

export const ProfileStatsCard: React.FC<Props> = ({ stats }) => {
  const statItems = useMemo(
    (): StatDisplay[] => [
      { key: 'posts', label: 'Публикации', value: stats.postsCount },
      { key: 'ideas', label: 'Идеи', value: stats.ideasCount },
      { key: 'sent', label: 'Отправлено', value: stats.gratitudesSentCount },
      { key: 'received', label: 'Получено', value: stats.gratitudesReceivedCount },
      { key: 'books', label: 'Книги', value: stats.booksReadCount },
      { key: 'events', label: 'Мероприятия', value: stats.eventsAttendedCount },
    ],
    [stats],
  );

  return (
    <GlassCard delay={0.2}>
      <div className={styles.cardTitle}>
        <span className={styles.cardTitleIcon}>
          <BarChart sx={{ fontSize: 14 }} />
        </span>
        Активность
      </div>

      <div className={styles.statsGrid}>
        {statItems.map((item, index) => (
          <motion.div
            key={item.key}
            className={styles.statItem}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className={styles.statValue}>{item.value}</span>
            <span className={styles.statLabel}>{item.label}</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};
