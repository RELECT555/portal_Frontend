import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../MerchShopPage.module.scss';

interface Props {
  onEnter: () => void;
}

const BOOT_LINES = [
  { text: '> INITIALIZING MEDIPAL_MERCH_SYSTEM v3.7.2...', delay: 0 },
  { text: '> Загрузка каталога товаров.............. OK', delay: 400 },
  { text: '> Подключение к серверу монеток.......... OK', delay: 800 },
  { text: '> Проверка баланса пользователя.......... OK', delay: 1150 },
  { text: '> Активация голографического интерфейса.. OK', delay: 1450 },
  { text: '> SYSTEM_STATUS: ONLINE', delay: 1750 },
];

const WELCOME_TITLE = 'Добро пожаловать на тёмную сторону портала';
const WELCOME_SUBTITLE =
  'Здесь ваши монетки превращаются в реальные вещи. Худи, кружки, гаджеты — весь фирменный мерч Медипал в одном месте. Зарабатывай, выбирай, забирай.';

export const WelcomeScreen: React.FC<Props> = ({ onEnter }) => {
  const [bootPhase, setBootPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const titleTimer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setBootPhase(i + 1), line.delay));
    });
    timers.push(setTimeout(() => setShowContent(true), 2200));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    let idx = 0;
    titleTimer.current = setInterval(() => {
      idx++;
      setTitleText(WELCOME_TITLE.slice(0, idx));
      if (idx >= WELCOME_TITLE.length) {
        clearInterval(titleTimer.current);
        setTimeout(() => setShowSubtitle(true), 300);
        setTimeout(() => setShowButton(true), 800);
      }
    }, 35);
    return () => clearInterval(titleTimer.current);
  }, [showContent]);

  const handleEnter = useCallback((): void => {
    onEnter();
  }, [onEnter]);

  useEffect(() => {
    if (!showButton) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showButton, handleEnter]);

  return (
    <div className={styles.welcomeScreen}>
      <div className={styles.welcomeGlow1} />
      <div className={styles.welcomeGlow2} />
      <div className={styles.welcomeGlow3} />

      <div className={styles.welcomeScanlines} />

      <div className={styles.welcomeContent}>
        <div className={styles.welcomeTerminal}>
          {BOOT_LINES.slice(0, bootPhase).map((line, i) => (
            <div
              key={i}
              className={`${styles.welcomeTerminalLine} ${
                line.text.includes('OK') ? styles.welcomeTerminalLineOk : ''
              } ${line.text.includes('ONLINE') ? styles.welcomeTerminalLineOnline : ''}`}
            >
              {line.text}
            </div>
          ))}
          {bootPhase < BOOT_LINES.length && <span className={styles.welcomeTerminalCursor}>█</span>}
        </div>

        {showContent && (
          <div className={styles.welcomeMain}>
            <div className={styles.welcomeLogoMark}>
              <span className={styles.welcomeLogoDot} />
              <span className={styles.welcomeLogoText}>MEDIPAL MERCH CORP</span>
              <span className={styles.welcomeLogoDot} />
            </div>

            <h1 className={styles.welcomeTitle}>
              {titleText}
              {titleText.length < WELCOME_TITLE.length && (
                <span className={styles.welcomeTitleCursor}>|</span>
              )}
            </h1>

            {showSubtitle && <p className={styles.welcomeSubtitle}>{WELCOME_SUBTITLE}</p>}

            {showButton && (
              <button className={styles.welcomeEnterBtn} onClick={handleEnter}>
                <span className={styles.welcomeEnterBtnGlow} />
                <span className={styles.welcomeEnterBtnText}>[ ВОЙТИ В МАГАЗИН ]</span>
                <span className={styles.welcomeEnterBtnHint}>или нажмите Enter / Пробел</span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.welcomeFooter}>
        <span>MEDIPAL CORP © 2026</span>
        <span className={styles.welcomeFooterDivider}>|</span>
        <span>SECTOR: MERCH_DIVISION</span>
        <span className={styles.welcomeFooterDivider}>|</span>
        <span>
          STATUS: <span className={styles.welcomeFooterOnline}>ONLINE</span>
        </span>
      </div>
    </div>
  );
};

WelcomeScreen.displayName = 'WelcomeScreen';
