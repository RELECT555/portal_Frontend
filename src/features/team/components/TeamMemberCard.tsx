import React from 'react';
import { Avatar } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  EmailOutlined,
  PhoneOutlined,
  PlaceOutlined,
  CalendarTodayOutlined,
} from '@mui/icons-material';
import type { TeamMember } from '../types';
import { TEAM_DEPARTMENT_LABELS, TEAM_DEPARTMENT_COLORS } from '../types';
import { getInitials, formatHireDate, getDepartmentColor } from '../utils';
import styles from '../TeamPage.module.scss';

interface Props {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<Props> = React.memo(({ member }) => {
  const deptColor = getDepartmentColor(member.department, TEAM_DEPARTMENT_COLORS);

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardAvatarWrap}>
          <Avatar
            src={member.avatarUrl}
            sx={{
              width: 48,
              height: 48,
              fontSize: '0.875rem',
              fontWeight: 600,
              bgcolor: alpha(deptColor, 0.1),
              color: deptColor,
            }}
          >
            {getInitials(member.fullName)}
          </Avatar>
          {member.isOnline && <span className={styles.cardOnline} />}
        </div>

        <div className={styles.cardInfo}>
          <div className={styles.cardName}>{member.fullName}</div>
          <div className={styles.cardPosition}>{member.position}</div>
        </div>
      </div>

      <span
        className={styles.cardDepartmentBadge}
        style={{
          color: deptColor,
          background: alpha(deptColor, 0.08),
        }}
      >
        {TEAM_DEPARTMENT_LABELS[member.department]}
      </span>

      <div className={styles.cardDetails}>
        <div className={styles.cardDetailRow}>
          <EmailOutlined sx={{ fontSize: 13, opacity: 0.6 }} />
          {member.email}
        </div>
        {member.phone && (
          <div className={styles.cardDetailRow}>
            <PhoneOutlined sx={{ fontSize: 13, opacity: 0.6 }} />
            {member.phone}
          </div>
        )}
        <div className={styles.cardDetailRow}>
          <CalendarTodayOutlined sx={{ fontSize: 13, opacity: 0.6 }} />В компании с{' '}
          {formatHireDate(member.hireDate)}
        </div>
      </div>

      {member.tags.length > 0 && (
        <div className={styles.cardTags}>
          {member.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.cardTag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {member.location && (
        <div className={styles.cardFooter}>
          <span className={styles.cardLocation}>
            <PlaceOutlined sx={{ fontSize: 13, opacity: 0.6 }} />
            {member.location}
          </span>
        </div>
      )}
    </article>
  );
});
