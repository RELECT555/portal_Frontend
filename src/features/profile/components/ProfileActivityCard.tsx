import React, { useCallback, useMemo } from 'react';
import {
  Timeline,
  Article,
  Lightbulb,
  Favorite,
  MenuBook,
  Event,
  ChatBubbleOutline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import type { ProfileActivityItem } from '../types';
import { GlassCard } from './GlassCard';
import styles from '../ProfilePage.module.scss';

interface Props {
  activity: ProfileActivityItem[];
}

const ACTIVITY_TYPE_CONFIG: Record<
  ProfileActivityItem['type'],
  { icon: React.ReactNode; styleKey: string }
> = {
  post: { icon: <Article fontSize="small" />, styleKey: 'activityIconPost' },
  idea: { icon: <Lightbulb fontSize="small" />, styleKey: 'activityIconIdea' },
  gratitude: { icon: <Favorite fontSize="small" />, styleKey: 'activityIconGratitude' },
  book: { icon: <MenuBook fontSize="small" />, styleKey: 'activityIconBook' },
  event: { icon: <Event fontSize="small" />, styleKey: 'activityIconEvent' },
  comment: { icon: <ChatBubbleOutline fontSize="small" />, styleKey: 'activityIconComment' },
};

const formatRelativeDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Сегодня';
  if (diffDays === 1) return 'Вчера';
  if (diffDays < 7) return `${diffDays} дн. назад`;

  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
};

export const ProfileActivityCard: React.FC<Props> = ({ activity }) => {
  const getConfig = useCallback(
    (type: ProfileActivityItem['type']) => ACTIVITY_TYPE_CONFIG[type],
    [],
  );

  const sortedActivity = useMemo(
    () => [...activity].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [activity],
  );

  if (sortedActivity.length === 0) return null;

  return (
    <GlassCard delay={0.3} tilt={false}>
      <div className={styles.cardTitle}>
        <span className={styles.cardTitleIcon}>
          <Timeline sx={{ fontSize: 14 }} />
        </span>
        Последняя активность
      </div>

      <div className={styles.activityList}>
        {sortedActivity.map((item, index) => {
          const config = getConfig(item.type);
          return (
            <motion.div
              key={item.id}
              className={styles.activityItem}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.35 + index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className={classnames(styles.activityIcon, styles[config.styleKey])}>
                {config.icon}
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityTitle}>{item.title}</p>
                <p className={styles.activityDesc}>{item.description}</p>
              </div>
              <span className={styles.activityDate}>{formatRelativeDate(item.date)}</span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
};
