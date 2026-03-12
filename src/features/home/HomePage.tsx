import React, { useMemo } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  ThumbUpOutlined,
  ChatBubbleOutline,
  VisibilityOutlined,
  NewspaperRounded,
  Cake,
  PersonAdd,
  EmojiEvents,
  ArrowForward,
  AutoStories,
  Lightbulb,
  LiveTv,
  FavoriteBorder,
  Storefront,
  MoodOutlined,
  MenuBook,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ROUTES } from '@/lib/constants';
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_COLORS } from '@/features/news/types';
import type { NewsCategory } from '@/features/news/types';
import {
  MOCK_MAIN_NEWS,
  MOCK_NEWS,
  MOCK_BIRTHDAYS,
  MOCK_NEW_EMPLOYEES,
  MOCK_ANNIVERSARIES,
} from './mockData';
import styles from './HomePage.module.scss';

dayjs.locale('ru');

function catColor(category: NewsCategory): string {
  if (category === 'all') return '#64748b';
  return NEWS_CATEGORY_COLORS[category] ?? '#64748b';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

const QUICK_LINKS = [
  { icon: <LiveTv sx={{ fontSize: 16 }} />, label: 'Лайв', to: ROUTES.LIVE },
  { icon: <FavoriteBorder sx={{ fontSize: 16 }} />, label: 'Благодарности', to: ROUTES.GRATITUDE },
  { icon: <Lightbulb sx={{ fontSize: 16 }} />, label: 'Банк идей', to: ROUTES.IDEAS },
  { icon: <Storefront sx={{ fontSize: 16 }} />, label: 'Корп-магазин', to: ROUTES.MERCH_SHOP },
  { icon: <MoodOutlined sx={{ fontSize: 16 }} />, label: 'Настроение', to: ROUTES.MOOD },
  { icon: <MenuBook sx={{ fontSize: 16 }} />, label: 'База знаний', to: ROUTES.KNOWLEDGE_BASE },
  { icon: <AutoStories sx={{ fontSize: 16 }} />, label: 'Библиотека', to: ROUTES.LIBRARY },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const HomePage: React.FC = () => {
  const hero = MOCK_MAIN_NEWS;
  const gridNews = useMemo(() => MOCK_NEWS.slice(0, 2), []);
  const listNews = useMemo(() => MOCK_NEWS.slice(2), []);
  const heroColor = catColor(hero.category);
  const todayFormatted = dayjs().format('dddd, D MMMM YYYY');

  const peopleGroups = [
    {
      icon: <Cake sx={{ fontSize: 14 }} />,
      label: 'Дни рождения',
      color: '#ec4899',
      items: MOCK_BIRTHDAYS.map((p) => ({
        id: p.id,
        name: p.fullName,
        sub: `${p.position} · ${p.date}`,
        avatar: p.avatarUrl,
      })),
    },
    {
      icon: <PersonAdd sx={{ fontSize: 14 }} />,
      label: 'Новые сотрудники',
      color: '#0d9488',
      items: MOCK_NEW_EMPLOYEES.map((p) => ({
        id: p.id,
        name: p.fullName,
        sub: `${p.position} · ${p.hireDate}`,
        avatar: p.avatarUrl,
      })),
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 14 }} />,
      label: 'Юбилеи',
      color: '#f59e0b',
      items: MOCK_ANNIVERSARIES.map((p) => ({
        id: p.id,
        name: p.fullName,
        sub: `${p.position} · ${p.years} г.`,
        avatar: p.avatarUrl,
      })),
    },
  ];

  return (
    <div className={styles.magazine}>
      {/* ── Masthead ── */}
      <header className={styles.masthead}>
        <div className={styles.mastheadLeft}>
          <span className={styles.mastheadEdition}>Корпоративный портал</span>
          <h1 className={styles.mastheadTitle}>Новости</h1>
        </div>
        <span className={styles.mastheadDate}>{todayFormatted}</span>
      </header>

      {/* ── Hero Feature Article ── */}
      <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
        <Link to={`/news/${hero.id}`} style={{ textDecoration: 'none' }}>
          <article className={styles.heroArticle}>
            {hero.coverImageUrl ? (
              <img src={hero.coverImageUrl} alt={hero.title} className={styles.heroImage} />
            ) : (
              <div
                className={styles.heroPlaceholder}
                style={{
                  background: `linear-gradient(135deg, ${alpha(heroColor, 0.12)} 0%, ${alpha('#6366f1', 0.08)} 50%, ${alpha('#f59e0b', 0.04)} 100%)`,
                }}
              >
                <NewspaperRounded sx={{ fontSize: 80, color: alpha(heroColor, 0.12) }} />
              </div>
            )}
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <span className={styles.heroBadge} style={{ backgroundColor: heroColor }}>
                {NEWS_CATEGORY_LABELS[hero.category]}
              </span>
              <h2 className={styles.heroTitle}>{hero.title}</h2>
              {hero.content && <p className={styles.heroExcerpt}>{hero.content}</p>}
              <div className={styles.heroMeta}>
                <span>{hero.authorName}</span>
                <span>·</span>
                <span>{dayjs(hero.publishedAt).format('D MMMM YYYY')}</span>
                <Box sx={{ flex: 1 }} />
                <span className={styles.heroStat}>
                  <VisibilityOutlined sx={{ fontSize: 13 }} />
                  {hero.viewsCount}
                </span>
                <span className={styles.heroStat}>
                  <ThumbUpOutlined sx={{ fontSize: 13 }} />
                  {hero.likesCount}
                </span>
                <span className={styles.heroStat}>
                  <ChatBubbleOutline sx={{ fontSize: 13 }} />
                  {hero.commentsCount}
                </span>
              </div>
            </div>
          </article>
        </Link>
      </motion.div>

      {/* ── Main + Sidebar ── */}
      <div className={styles.contentLayout}>
        <div className={styles.mainColumn}>
          {/* ── Editorial Grid ── */}
          <div className={styles.newsGrid}>
            {gridNews.map((item, i) => {
              const color = catColor(item.category);
              return (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  animate="visible"
                  custom={i + 1}
                  variants={fadeUp}
                >
                  <Link to={`/news/${item.id}`} style={{ textDecoration: 'none' }}>
                    <article className={styles.articleCard}>
                      <div className={styles.articleThumb}>
                        {item.coverImageUrl ? (
                          <img
                            src={item.coverImageUrl}
                            alt={item.title}
                            className={styles.articleThumbImg}
                          />
                        ) : (
                          <NewspaperRounded sx={{ fontSize: 40, color: alpha(color, 0.12) }} />
                        )}
                      </div>
                      <div className={styles.articleMeta}>
                        <span
                          className={styles.articleBadge}
                          style={{ backgroundColor: alpha(color, 0.1), color }}
                        >
                          {NEWS_CATEGORY_LABELS[item.category]}
                        </span>
                        <span>{dayjs(item.publishedAt).format('D MMM')}</span>
                      </div>
                      <h3 className={styles.articleTitle}>{item.title}</h3>
                      {item.content && <p className={styles.articleExcerpt}>{item.content}</p>}
                      <div className={styles.articleStats}>
                        <span className={styles.stat}>
                          <VisibilityOutlined sx={{ fontSize: 12 }} />
                          {item.viewsCount}
                        </span>
                        <span className={styles.stat}>
                          <ThumbUpOutlined sx={{ fontSize: 12 }} />
                          {item.likesCount}
                        </span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ── More Stories ── */}
          {listNews.length > 0 && (
            <>
              <div className={styles.sectionRule}>
                <span className={styles.sectionLabel}>Ещё новости</span>
              </div>

              <div className={styles.newsList}>
                {listNews.map((item, i) => {
                  const color = catColor(item.category);
                  return (
                    <motion.div
                      key={item.id}
                      initial="hidden"
                      animate="visible"
                      custom={i + 3}
                      variants={fadeUp}
                    >
                      <Link to={`/news/${item.id}`} style={{ textDecoration: 'none' }}>
                        <div className={styles.newsListItem}>
                          <span className={styles.newsListNumber}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className={styles.newsListBody}>
                            <span className={styles.newsListTitle}>{item.title}</span>
                            <div className={styles.newsListMeta}>
                              <span
                                className={styles.articleBadge}
                                style={{ backgroundColor: alpha(color, 0.1), color }}
                              >
                                {NEWS_CATEGORY_LABELS[item.category]}
                              </span>
                              <span>{item.authorName}</span>
                              <span>·</span>
                              <span>{dayjs(item.publishedAt).format('D MMM')}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}

          <Link to={ROUTES.NEWS} className={styles.allNewsLink}>
            Все новости
            <ArrowForward sx={{ fontSize: 16 }} />
          </Link>
        </div>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          {/* People widget */}
          {peopleGroups.map((group) => (
            <div key={group.label} className={styles.sidebarWidget}>
              <div className={styles.sidebarHeader}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '8px',
                    bgcolor: alpha(group.color, 0.08),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: group.color,
                  }}
                >
                  {group.icon}
                </Box>
                {group.label}
                {group.items.length > 0 && (
                  <Box
                    component="span"
                    sx={{
                      ml: 'auto',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      color: group.color,
                      bgcolor: alpha(group.color, 0.08),
                      borderRadius: 1,
                      px: 0.75,
                      py: 0.125,
                    }}
                  >
                    {group.items.length}
                  </Box>
                )}
              </div>
              <div className={styles.sidebarBody}>
                {group.items.length === 0 ? (
                  <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.725rem' }}>
                    Пока нет
                  </Typography>
                ) : (
                  group.items.map((person) => (
                    <div key={person.id} className={styles.sidebarPersonItem}>
                      <Avatar
                        src={person.avatar}
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: '0.625rem',
                          fontWeight: 600,
                          bgcolor: alpha(group.color, 0.08),
                          color: group.color,
                        }}
                      >
                        {getInitials(person.name)}
                      </Avatar>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <div className={styles.sidebarPersonName}>{person.name}</div>
                        <div className={styles.sidebarPersonSub}>{person.sub}</div>
                      </Box>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {/* Quick Links */}
          <div className={styles.sidebarWidget}>
            <div className={styles.sidebarHeader}>
              <AutoStories sx={{ fontSize: 16, color: '#6366f1' }} />
              Разделы
            </div>
            <div className={styles.quickLinks}>
              {QUICK_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className={styles.quickLink}>
                  <Box sx={{ color: 'text.secondary', display: 'flex' }}>{link.icon}</Box>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
