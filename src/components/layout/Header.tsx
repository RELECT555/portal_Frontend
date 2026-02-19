import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Avatar, Tooltip } from '@mui/material';
import {
  NotificationsNoneRounded as BellIcon,
  SearchRounded as SearchIcon,
  KeyboardArrowDownRounded as ArrowDownIcon,
} from '@mui/icons-material';
import classnames from 'classnames';
import type { NavItem } from '@/lib/constants';
import { NAV_ITEMS, ROUTES } from '@/lib/constants';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleDropdownEnter = useCallback((path: string): void => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(path);
  }, []);

  const handleDropdownLeave = useCallback((): void => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const isNavItemActive = useCallback(
    (item: NavItem): boolean => {
      if (location.pathname === item.path) return true;
      if (item.children?.some((child) => location.pathname === child.path)) return true;
      return false;
    },
    [location.pathname],
  );

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchFocus = useCallback((): void => {
    setSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback((): void => {
    setSearchFocused(false);
  }, []);

  const handleCloseDropdown = useCallback((): void => {
    setOpenDropdown(null);
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
    <header className={classnames(styles.header, { [styles.scrolled]: scrolled })}>
      <div className={styles.inner}>
        <Link to={ROUTES.HOME} className={styles.logoSection}>
          <svg
            className={styles.logoPill}
            width="26"
            height="38"
            viewBox="0 0 26 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pillTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="pillBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
              <linearGradient id="pillShine" x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                <stop offset="50%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <filter id="pillShadow" x="-20%" y="-10%" width="140%" height="130%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.18" />
              </filter>
            </defs>
            <g filter="url(#pillShadow)">
              <rect width="26" height="19" rx="13" ry="13" fill="url(#pillTop)" />
              <rect y="19" width="26" height="19" rx="13" ry="13" fill="url(#pillBottom)" />
              <rect y="6" width="26" height="26" fill="url(#pillTop)" />
              <rect y="19" width="26" height="13" fill="url(#pillBottom)" />
              <path d="M0 19 h26 v6 a13 13 0 0 1 -26 0 Z" fill="url(#pillBottom)" />
            </g>
            <line
              x1="4"
              y1="19"
              x2="22"
              y2="19"
              stroke="white"
              strokeWidth="0.6"
              strokeOpacity="0.5"
            />
            <rect width="26" height="38" rx="13" fill="url(#pillShine)" />
          </svg>
          <span className={styles.logoText}>Я.МЕДИПАЛ</span>
        </Link>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.path}
                className={styles.navItemWithDropdown}
                onMouseEnter={() => handleDropdownEnter(item.path)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={item.path}
                  className={classnames(styles.navLink, {
                    [styles.navLinkActive]: isNavItemActive(item),
                  })}
                >
                  {item.label}
                  <ArrowDownIcon
                    className={classnames(styles.dropdownArrow, {
                      [styles.dropdownArrowOpen]: openDropdown === item.path,
                    })}
                  />
                </Link>
                {openDropdown === item.path && (
                  <div className={styles.dropdown}>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={classnames(styles.dropdownLink, {
                          [styles.dropdownLinkActive]: location.pathname === child.path,
                        })}
                        onClick={handleCloseDropdown}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={classnames(styles.navLink, {
                  [styles.navLinkActive]: location.pathname === item.path,
                })}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className={styles.spacer} />

        <form
          className={classnames(styles.searchBar, { [styles.searchBarFocused]: searchFocused })}
          onSubmit={handleSearchSubmit}
        >
          <SearchIcon className={styles.searchIcon} />
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          {!searchFocused && !searchQuery && <kbd className={styles.searchKbd}>⌘K</kbd>}
        </form>

        <span className={styles.divider} />

        <div className={styles.actions}>
          <Tooltip title="Уведомления">
            <IconButton size="small" className={styles.actionBtn}>
              <BellIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Профиль">
            <IconButton size="small" className={styles.avatarBtn}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                }}
              >
                У
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
