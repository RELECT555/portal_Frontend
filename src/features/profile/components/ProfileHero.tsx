import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ProfileData } from '../types';
import { Spotlight } from '@/components/ui/Spotlight';
import styles from '../ProfilePage.module.scss';

interface Props {
  profile: ProfileData;
}

const AURORA_BLOBS = [
  { color: 'rgba(99, 102, 241, 0.35)', size: 340, x: '15%', y: '20%', dur: 18 },
  { color: 'rgba(14, 165, 233, 0.3)', size: 280, x: '60%', y: '60%', dur: 22 },
  { color: 'rgba(139, 92, 246, 0.25)', size: 300, x: '75%', y: '15%', dur: 20 },
  { color: 'rgba(20, 184, 166, 0.3)', size: 260, x: '35%', y: '75%', dur: 16 },
  { color: 'rgba(244, 114, 182, 0.2)', size: 220, x: '85%', y: '55%', dur: 24 },
];

export const ProfileHero: React.FC<Props> = ({ profile }) => {
  const initials = useMemo(
    () => `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase(),
    [profile.firstName, profile.lastName],
  );

  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.heroBanner}>
        <div className={styles.auroraBase} />

        {AURORA_BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className={styles.auroraBlob}
            style={{
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              left: blob.x,
              top: blob.y,
            }}
            animate={{
              x: [0, 30, -20, 15, 0],
              y: [0, -25, 15, -10, 0],
              scale: [1, 1.15, 0.9, 1.1, 1],
            }}
            transition={{
              duration: blob.dur,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          />
        ))}

        <div className={styles.heroBannerNoise} />
        <Spotlight size={350} />
      </div>

      <motion.div
        className={styles.heroGlass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarGlow} />
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.fullName} className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
        </div>

        <div className={styles.heroInfo}>
          <h1 className={styles.heroName}>{profile.fullName}</h1>
          <p className={styles.heroPosition}>{profile.position}</p>
          <p className={styles.heroDepartment}>{profile.department}</p>
        </div>
      </motion.div>
    </motion.section>
  );
};
