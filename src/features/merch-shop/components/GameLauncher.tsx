import React, { useState, useCallback, useEffect } from 'react';
import {
  SportsEsports as GameIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { CoinGame, type GameResult } from './CoinGame';
import styles from '../MerchShopPage.module.scss';

const DAILY_KEY = 'medipal_coin_game_last_played';
const LAST_RESULT_KEY = 'medipal_coin_game_last_result';

function canPlayToday(): boolean {
  // TODO: restore daily cooldown before production
  return true;
}

function getTimeUntilReset(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}ч ${minutes}м`;
}

function getLastResult(): GameResult | null {
  const raw = localStorage.getItem(LAST_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

interface Props {
  onCoinsEarned: (coins: number) => void;
}

export const GameLauncher: React.FC<Props> = ({ onCoinsEarned }) => {
  const [showGame, setShowGame] = useState(false);
  const [canPlay, setCanPlay] = useState(canPlayToday);
  const [resetTime, setResetTime] = useState(getTimeUntilReset);
  const [lastResult, setLastResult] = useState<GameResult | null>(getLastResult);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (canPlay) return;
    const interval = setInterval(() => {
      setResetTime(getTimeUntilReset());
      if (canPlayToday()) {
        setCanPlay(true);
        setLastResult(null);
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [canPlay]);

  const handleStart = useCallback(() => {
    if (!canPlay) return;
    setShowGame(true);
    setShowResult(false);
  }, [canPlay]);

  const handleFinish = useCallback(
    (result: GameResult) => {
      localStorage.setItem(DAILY_KEY, new Date().toISOString());
      localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
      setCanPlay(false);
      setLastResult(result);
      setShowGame(false);
      setShowResult(true);
      setResetTime(getTimeUntilReset());
      onCoinsEarned(result.coinsEarned);
    },
    [onCoinsEarned],
  );

  const handleCancel = useCallback(() => {
    setShowGame(false);
  }, []);

  const handleDismissResult = useCallback(() => {
    setShowResult(false);
  }, []);

  return (
    <>
      <div className={styles.gameLauncher}>
        <div className={styles.gameLauncherGlow} />

        <div className={styles.gameLauncherContent}>
          <div className={styles.gameLauncherLeft}>
            <div className={styles.gameLauncherIcon}>
              <GameIcon sx={{ fontSize: 24 }} />
            </div>
            <div className={styles.gameLauncherInfo}>
              <span className={styles.gameLauncherTag}>DAILY BONUS</span>
              <span className={styles.gameLauncherTitle}>Coin Catcher</span>
              <span className={styles.gameLauncherDesc}>
                Лови падающие монетки и зарабатывай ₿ в магазин!
              </span>
            </div>
          </div>

          <div className={styles.gameLauncherRight}>
            {canPlay ? (
              <button className={styles.gameLauncherPlayBtn} onClick={handleStart}>
                <GameIcon sx={{ fontSize: 16 }} />
                ИГРАТЬ
              </button>
            ) : (
              <div className={styles.gameLauncherCooldown}>
                <TimerIcon sx={{ fontSize: 14 }} />
                <span>Следующая игра через {resetTime}</span>
              </div>
            )}
            {lastResult && !canPlay && (
              <div className={styles.gameLauncherLastResult}>
                <TrophyIcon sx={{ fontSize: 14 }} />
                <span>+{lastResult.coinsEarned} ₿ сегодня</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showGame && <CoinGame onFinish={handleFinish} onCancel={handleCancel} />}

      {showResult && lastResult && (
        <div className={styles.gameResultOverlay} onClick={handleDismissResult}>
          <div className={styles.gameResultCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.gameResultGlow} />
            <TrophyIcon sx={{ fontSize: 48, color: '#fbbf24' }} />
            <h2 className={styles.gameResultTitle}>Раунд завершён!</h2>
            <div className={styles.gameResultScore}>+{lastResult.coinsEarned} ₿</div>
            <div className={styles.gameResultStats}>
              <div className={styles.gameResultStat}>
                <span className={styles.gameResultStatValue}>{lastResult.totalClicks}</span>
                <span className={styles.gameResultStatLabel}>кликов</span>
              </div>
              <div className={styles.gameResultStat}>
                <span className={styles.gameResultStatValue}>{lastResult.accuracy}%</span>
                <span className={styles.gameResultStatLabel}>точность</span>
              </div>
            </div>
            <p className={styles.gameResultHint}>
              Монетки зачислены на баланс. Приходи завтра за новым бонусом!
            </p>
            <button className={styles.gameResultBtn} onClick={handleDismissResult}>
              ОТЛИЧНО
            </button>
          </div>
        </div>
      )}
    </>
  );
};

GameLauncher.displayName = 'GameLauncher';
