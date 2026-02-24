import React, { useCallback, useMemo, useState } from 'react';
import { EmojiEvents } from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { AchievementRarity, ProfileAchievement } from '../types';
import { GlassCard } from './GlassCard';
import styles from '../ProfilePage.module.scss';

interface Props {
  achievements: ProfileAchievement[];
}

const ACHIEVEMENT_ICONS: Record<string, string> = {
  rocket: '\u{1F680}',
  lightbulb: '\u{1F4A1}',
  heart: '\u2764\uFE0F',
  book: '\u{1F4DA}',
  users: '\u{1F465}',
  star: '\u2B50',
  trophy: '\u{1F3C6}',
};

const RARITY_LABELS: Record<AchievementRarity, string> = {
  common: 'Обычное',
  rare: 'Редкое',
  epic: 'Эпическое',
  legendary: 'Легендарное',
};

type FilterTab = 'all' | 'unlocked' | 'locked';

export const ProfileAchievementsCard: React.FC<Props> = ({ achievements }) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const getIcon = useCallback(
    (iconKey: string): string => ACHIEVEMENT_ICONS[iconKey] ?? '\u{1F3C6}',
    [],
  );

  const { unlocked, locked, summary } = useMemo(() => {
    const u = achievements.filter((a) => !a.locked);
    const l = achievements.filter((a) => a.locked);
    return {
      unlocked: u,
      locked: l,
      summary: { total: achievements.length, unlocked: u.length, locked: l.length },
    };
  }, [achievements]);

  const filtered = useMemo(() => {
    if (activeTab === 'unlocked') return unlocked;
    if (activeTab === 'locked') return locked;
    return [...unlocked, ...locked];
  }, [activeTab, unlocked, locked]);

  if (achievements.length === 0) return null;

  const progressPercent =
    summary.total > 0 ? Math.round((summary.unlocked / summary.total) * 100) : 0;

  return (
    <GlassCard delay={0.25} tilt={false}>
      <div className={styles.achHeader}>
        <div className={styles.cardTitle}>
          <span className={styles.cardTitleIcon}>
            <EmojiEvents sx={{ fontSize: 14 }} />
          </span>
          Достижения
        </div>

        <div className={styles.achSummary}>
          <span className={styles.achSummaryCount}>
            {summary.unlocked}/{summary.total}
          </span>
          <div className={styles.achSummaryBar}>
            <motion.div
              className={styles.achSummaryBarFill}
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      <div className={styles.achTabs}>
        {(
          [
            ['all', `Все (${summary.total})`],
            ['unlocked', `Открыто (${summary.unlocked})`],
            ['locked', `В процессе (${summary.locked})`],
          ] as [FilterTab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            className={`${styles.achTab} ${activeTab === key ? styles.achTabActive : ''}`}
            onClick={() => setActiveTab(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.achGrid}>
        {filtered.map((ach, index) => (
          <AchievementBadge key={ach.id} achievement={ach} icon={getIcon(ach.icon)} index={index} />
        ))}
      </div>
    </GlassCard>
  );
};

interface BadgeProps {
  achievement: ProfileAchievement;
  icon: string;
  index: number;
}

const AchievementBadge: React.FC<BadgeProps> = React.memo(({ achievement, icon, index }) => {
  const isLocked = achievement.locked;
  const rarityClass = styles[`achRarity_${achievement.rarity}`] ?? '';
  const progress =
    achievement.progress != null && achievement.maxProgress
      ? Math.round((achievement.progress / achievement.maxProgress) * 100)
      : null;

  return (
    <motion.div
      className={`${styles.achBadge} ${rarityClass} ${isLocked ? styles.achBadgeLocked : ''}`}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.45,
        delay: 0.1 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.achBadgeGlow} />

      <div className={`${styles.achBadgeIcon} ${isLocked ? styles.achBadgeIconLocked : ''}`}>
        <span className={styles.achBadgeEmoji}>{icon}</span>
        {!isLocked && <div className={styles.achBadgeIconRing} />}
      </div>

      <div className={styles.achBadgeContent}>
        <div className={styles.achBadgeTitleRow}>
          <p className={styles.achBadgeTitle}>{achievement.title}</p>
          <span className={`${styles.achRarityTag} ${rarityClass}`}>
            {RARITY_LABELS[achievement.rarity]}
          </span>
        </div>
        <p className={styles.achBadgeDesc}>{achievement.description}</p>

        {progress !== null && (
          <div className={styles.achProgress}>
            <div className={styles.achProgressBar}>
              <motion.div
                className={`${styles.achProgressFill} ${rarityClass}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
            <span className={styles.achProgressText}>
              {achievement.progress}/{achievement.maxProgress}
            </span>
          </div>
        )}

        {!isLocked && achievement.earnedAt && (
          <p className={styles.achBadgeDate}>
            {new Date(achievement.earnedAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </motion.div>
  );
});

AchievementBadge.displayName = 'AchievementBadge';
