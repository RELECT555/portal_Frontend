import React, { useMemo } from 'react';
import { SupervisorAccount } from '@mui/icons-material';
import type { UserShort } from '@/types/user';
import { GlassCard } from './GlassCard';
import styles from '../ProfilePage.module.scss';

interface Props {
  manager: UserShort;
}

export const ProfileManagerCard: React.FC<Props> = ({ manager }) => {
  const initials = useMemo(() => {
    const parts = manager.fullName.split(' ');
    return parts.length >= 2
      ? `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
      : parts[0].charAt(0).toUpperCase();
  }, [manager.fullName]);

  return (
    <GlassCard delay={0.2}>
      <div className={styles.cardTitle}>
        <span className={styles.cardTitleIcon}>
          <SupervisorAccount sx={{ fontSize: 14 }} />
        </span>
        Руководитель
      </div>

      <div className={styles.managerInfo}>
        {manager.avatarUrl ? (
          <img src={manager.avatarUrl} alt={manager.fullName} className={styles.managerAvatar} />
        ) : (
          <div className={styles.managerAvatar}>{initials}</div>
        )}
        <div className={styles.managerDetails}>
          <p className={styles.managerName}>{manager.fullName}</p>
          <p className={styles.managerPosition}>{manager.position}</p>
        </div>
      </div>
    </GlassCard>
  );
};
