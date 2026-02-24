import React, { useMemo } from 'react';
import { Email, Phone, CalendarMonth, WorkOutline, LocationOn } from '@mui/icons-material';
import type { ProfileData } from '../types';
import { GlassCard } from './GlassCard';
import styles from '../ProfilePage.module.scss';

interface Props {
  profile: ProfileData;
}

interface InfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '\u2014';
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const ProfileInfoCard: React.FC<Props> = ({ profile }) => {
  const infoItems = useMemo((): InfoItem[] => {
    const items: InfoItem[] = [
      { icon: <Email fontSize="small" />, label: 'Email', value: profile.email },
      { icon: <WorkOutline fontSize="small" />, label: 'Отдел', value: profile.department },
    ];

    if (profile.phone) {
      items.push({ icon: <Phone fontSize="small" />, label: 'Телефон', value: profile.phone });
    }
    if (profile.location) {
      items.push({
        icon: <LocationOn fontSize="small" />,
        label: 'Локация',
        value: profile.location,
      });
    }
    if (profile.birthDate) {
      items.push({
        icon: <CalendarMonth fontSize="small" />,
        label: 'День рождения',
        value: formatDate(profile.birthDate),
      });
    }
    if (profile.hireDate) {
      items.push({
        icon: <CalendarMonth fontSize="small" />,
        label: 'В компании с',
        value: formatDate(profile.hireDate),
      });
    }

    return items;
  }, [profile]);

  return (
    <GlassCard delay={0.1}>
      <div className={styles.cardTitle}>
        <span className={styles.cardTitleIcon}>
          <WorkOutline sx={{ fontSize: 14 }} />
        </span>
        Контакты
      </div>

      <div className={styles.infoGrid}>
        {infoItems.map((item) => (
          <div key={item.label} className={styles.infoRow}>
            <div className={styles.infoIcon}>{item.icon}</div>
            <div className={styles.infoContent}>
              <p className={styles.infoLabel}>{item.label}</p>
              <p className={styles.infoValue}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
