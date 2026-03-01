import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Info, TrendingUp, Users, Calendar, Bell, Lightbulb } from 'lucide-react';
import styles from './AnnouncementTicker.module.scss';

interface AnnouncementItem {
  id: string;
  text: string;
  category: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface Props {
  items?: AnnouncementItem[];
  speed?: number;
  pauseOnHover?: boolean;
}

const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: '1',
    text: 'Регистрация на Tech Meetup открыта до 28 февраля',
    category: 'События',
    icon: <Calendar size={14} />,
    highlight: true,
  },
  {
    id: '2',
    text: 'Новая корпоративная библиотека — 50+ книг уже доступны',
    category: 'Система',
    icon: <Info size={14} />,
  },
  {
    id: '3',
    text: 'Результаты квартального опроса опубликованы',
    category: 'Финансы',
    icon: <TrendingUp size={14} />,
  },
  {
    id: '4',
    text: 'С днём рождения: Мария К., Дмитрий П., Ольга С.',
    category: 'HR',
    icon: <Users size={14} />,
  },
  {
    id: '5',
    text: 'Обновлена политика удалённой работы — ознакомьтесь в базе знаний',
    category: 'Безопасность',
    icon: <Bell size={14} />,
    highlight: true,
  },
  {
    id: '6',
    text: 'Банк идей: 3 новых предложения ждут вашего голоса',
    category: 'Идеи',
    icon: <Lightbulb size={14} />,
  },
];

export const AnnouncementTicker: React.FC<Props> = ({
  items = DEFAULT_ANNOUNCEMENTS,
  speed = 80,
  pauseOnHover = true,
}) => {
  const tickerItems = useMemo(() => {
    if (items.length === 0) return [];
    return [...items, ...items];
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={styles.ticker}>
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <motion.div
        className={`${styles.tickerTrack} ${pauseOnHover ? styles.pausable : ''}`}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            duration: speed,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
      >
        <div className={styles.tickerContent}>
          {tickerItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className={styles.tickerItem}>
              <div
                className={`${styles.tickerIconWrap} ${item.highlight ? styles.tickerIconHighlight : ''}`}
              >
                {item.icon}
              </div>
              <div className={styles.tickerTextBlock}>
                <span className={styles.tickerCategory}>{item.category}</span>
                <span className={item.highlight ? styles.tickerHighlight : styles.tickerText}>
                  {item.text}
                </span>
              </div>
              {item.highlight && <span className={styles.tickerBadge}>NEW</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
