import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './AnnouncementTicker.module.scss';

interface AnnouncementItem {
  id: string;
  text: string;
  highlight?: boolean;
  icon?: string;
}

interface Props {
  items?: AnnouncementItem[];
  speed?: number;
}

const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: '1',
    text: 'Регистрация на Tech Meetup открыта до 28 февраля',
    highlight: true,
    icon: '\u{1F3AF}',
  },
  { id: '2', text: 'Новая корпоративная библиотека — 50+ книг уже доступны', icon: '\u{1F4DA}' },
  { id: '3', text: 'Результаты квартального опроса опубликованы', icon: '\u{1F4CA}' },
  { id: '4', text: 'С днём рождения: Мария К., Дмитрий П., Ольга С.', icon: '\u{1F382}' },
  {
    id: '5',
    text: 'Обновлена политика удалённой работы — ознакомьтесь в базе знаний',
    highlight: true,
    icon: '\u{1F4CB}',
  },
  { id: '6', text: 'Банк идей: 3 новых предложения ждут вашего голоса', icon: '\u{1F4A1}' },
];

export const AnnouncementTicker: React.FC<Props> = ({
  items = DEFAULT_ANNOUNCEMENTS,
  speed = 120,
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
        className={styles.tickerTrack}
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
            <span key={`${item.id}-${index}`} className={styles.tickerItem}>
              <span className={styles.tickerDot} />
              {item.icon && <span className={styles.tickerIcon}>{item.icon}</span>}
              <span className={item.highlight ? styles.tickerHighlight : styles.tickerText}>
                {item.text}
              </span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
