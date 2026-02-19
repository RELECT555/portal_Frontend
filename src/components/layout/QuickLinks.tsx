import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import {
  Groups as GroupsIcon,
  EmojiEvents as TrophyIcon,
  Notifications as BellIcon,
  Pets as PetsIcon,
  Extension as ExtensionIcon,
  CalendarMonth as CalendarIcon,
  FavoriteBorder as HeartIcon,
} from '@mui/icons-material';
import { ROUTES } from '@/lib/constants';
import styles from './QuickLinks.module.scss';

interface QuickLinkItem {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const QUICK_LINKS: QuickLinkItem[] = [
  { icon: <GroupsIcon sx={{ fontSize: 18 }} />, label: 'Команда', to: ROUTES.TEAM },
  { icon: <TrophyIcon sx={{ fontSize: 18 }} />, label: 'Благодарности', to: ROUTES.GRATITUDE },
  { icon: <BellIcon sx={{ fontSize: 18 }} />, label: 'Новости', to: ROUTES.NEWS },
  { icon: <PetsIcon sx={{ fontSize: 18 }} />, label: 'LIVE', to: ROUTES.LIVE },
  { icon: <ExtensionIcon sx={{ fontSize: 18 }} />, label: 'Банк идей', to: ROUTES.IDEAS },
  { icon: <CalendarIcon sx={{ fontSize: 18 }} />, label: 'Вакансии', to: ROUTES.VACANCIES },
  { icon: <HeartIcon sx={{ fontSize: 18 }} />, label: 'Избранное', to: ROUTES.HOME },
];

export const QuickLinks: React.FC = () => (
  <nav className={styles.quickLinks}>
    {QUICK_LINKS.map((link) => (
      <Tooltip key={link.label} title={link.label} arrow>
        <Link to={link.to} className={styles.link}>
          {link.icon}
          <span className={styles.linkLabel}>{link.label}</span>
        </Link>
      </Tooltip>
    ))}
  </nav>
);
