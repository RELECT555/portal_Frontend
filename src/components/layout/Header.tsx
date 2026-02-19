import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Avatar, Tooltip } from '@mui/material';
import {
  Menu as MenuIcon,
  NotificationsNoneRounded as BellIcon,
  SearchRounded as SearchIcon,
} from '@mui/icons-material';
import classnames from 'classnames';
import { NAV_ITEMS, ROUTES } from '@/lib/constants';
import { useUiStore } from '@/stores';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`${ROUTES.TEAM}?search=${encodeURIComponent(searchQuery.trim())}`);
        inputRef.current?.blur();
      }
    },
    [searchQuery, navigate],
  );

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to={ROUTES.HOME} className={styles.logoSection}>
          <svg
            className={styles.logoPill}
            width="26"
            height="38"
            viewBox="0 0 26 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="26" height="38" rx="13" fill="#f59e0b" />
            <rect y="19" width="26" height="19" fill="#0d9488" />
            <path d="M0 19 h26 v6 a13 13 0 0 1 -26 0 Z" fill="#0d9488" />
            <line
              x1="3"
              y1="19"
              x2="23"
              y2="19"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </svg>
          <span className={styles.logoText}>МЕДИПАЛ</span>
        </Link>

        <form
          className={classnames(styles.searchBar, { [styles.searchBarFocused]: searchFocused })}
          onSubmit={handleSearchSubmit}
        >
          <SearchIcon className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder="Поиск сотрудника, документа или раздела..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {!searchFocused && !searchQuery && <kbd className={styles.searchKbd}>⌘K</kbd>}
        </form>

        <div className={styles.actions}>
          <Tooltip title="Уведомления">
            <IconButton size="small" className={styles.actionBtn}>
              <BellIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Профиль">
            <IconButton size="small" sx={{ ml: 0.5 }}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: 'secondary.main',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                У
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>

        <IconButton className={styles.mobileMenuBtn} onClick={toggleSidebar} aria-label="Меню">
          <MenuIcon />
        </IconButton>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={classnames(styles.navLink, {
              [styles.navLinkActive]: location.pathname === item.path,
            })}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
