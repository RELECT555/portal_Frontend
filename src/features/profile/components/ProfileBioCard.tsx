import React from 'react';
import { AutoStories } from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { ProfileData } from '../types';
import { GlassCard } from './GlassCard';
import styles from '../ProfilePage.module.scss';

interface Props {
  profile: ProfileData;
}

export const ProfileBioCard: React.FC<Props> = ({ profile }) => {
  if (!profile.bio && profile.skills.length === 0) return null;

  return (
    <GlassCard delay={0.15}>
      <div className={styles.cardTitle}>
        <span className={styles.cardTitleIcon}>
          <AutoStories sx={{ fontSize: 14 }} />
        </span>
        О себе
      </div>

      {profile.bio && <p className={styles.bioText}>{profile.bio}</p>}

      {profile.skills.length > 0 && (
        <div className={styles.skillsList}>
          {profile.skills.map((skill, i) => (
            <motion.span
              key={skill}
              className={styles.skillChip}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.04 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      )}
    </GlassCard>
  );
};
