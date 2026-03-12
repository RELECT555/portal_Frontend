import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../MerchShopPage.module.scss';

export interface GameResult {
  coinsEarned: number;
  totalClicks: number;
  accuracy: number;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  type: 'bronze' | 'silver' | 'gold' | 'bomb';
  speed: number;
  size: number;
  rotation: number;
  caught: boolean;
}

const ITEM_VALUES: Record<FallingItem['type'], number> = {
  bronze: 1,
  silver: 3,
  gold: 5,
  bomb: -3,
};

const ITEM_ICONS: Record<FallingItem['type'], string> = {
  bronze: '🪙',
  silver: '🥈',
  gold: '🥇',
  bomb: '💣',
};

const GAME_DURATION = 30;
const SPAWN_INTERVAL = 600;

interface Props {
  onFinish: (result: GameResult) => void;
  onCancel: () => void;
}

export const CoinGame: React.FC<Props> = ({ onFinish, onCancel }) => {
  const [gameState, setGameState] = useState<'countdown' | 'playing' | 'finished'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [hitClicks, setHitClicks] = useState(0);
  const [combo, setCombo] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState<
    { id: number; x: number; y: number; value: number; type: FallingItem['type'] }[]
  >([]);

  const nextItemId = useRef(0);
  const nextTextId = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const itemsRef = useRef<FallingItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    if (gameState !== 'countdown') return;
    if (countdown <= 0) {
      const t = setTimeout(() => setGameState('playing'), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      const t = setTimeout(() => setGameState('finished'), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTimeLeft((tl) => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (gameState === 'finished') {
      const accuracy = totalClicks === 0 ? 0 : Math.round((hitClicks / totalClicks) * 100);
      onFinish({ coinsEarned: Math.max(0, score), totalClicks, accuracy });
    }
  }, [gameState, score, totalClicks, hitClicks, onFinish]);

  const spawnItem = useCallback(() => {
    const rand = Math.random();
    let type: FallingItem['type'];
    if (rand < 0.1) type = 'bomb';
    else if (rand < 0.25) type = 'gold';
    else if (rand < 0.5) type = 'silver';
    else type = 'bronze';

    const newItem: FallingItem = {
      id: nextItemId.current++,
      x: 5 + Math.random() * 90,
      y: -5,
      type,
      speed: 0.3 + Math.random() * 0.4,
      size: type === 'gold' ? 48 : type === 'silver' ? 42 : type === 'bomb' ? 44 : 36,
      rotation: Math.random() * 360,
      caught: false,
    };

    setItems((prev) => [...prev, newItem]);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    let lastTime = performance.now();

    const animate = (now: number): void => {
      const dt = now - lastTime;
      lastTime = now;

      if (now - lastSpawnRef.current > SPAWN_INTERVAL) {
        spawnItem();
        lastSpawnRef.current = now;
      }

      setItems((prev) =>
        prev
          .map((item) => ({
            ...item,
            y: item.y + item.speed * (dt / 16),
            rotation: item.rotation + 1,
          }))
          .filter((item) => item.y < 110 && !item.caught),
      );

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState, spawnItem]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFloatingTexts((prev) => prev.slice(-8));
    }, 1200);
    return () => clearTimeout(timer);
  }, [floatingTexts.length]);

  const handleItemClick = useCallback(
    (e: React.MouseEvent, item: FallingItem) => {
      e.stopPropagation();
      if (gameState !== 'playing' || item.caught) return;

      setTotalClicks((c) => c + 1);
      setHitClicks((c) => c + 1);

      const value = ITEM_VALUES[item.type];
      setScore((s) => s + value);

      if (item.type !== 'bomb') {
        setCombo((c) => c + 1);
      } else {
        setCombo(0);
      }

      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, caught: true } : i)));

      const rect = gameAreaRef.current?.getBoundingClientRect();
      if (rect) {
        setFloatingTexts((prev) => [
          ...prev,
          {
            id: nextTextId.current++,
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            value,
            type: item.type,
          },
        ]);
      }
    },
    [gameState],
  );

  const handleMissClick = useCallback(() => {
    if (gameState !== 'playing') return;
    setTotalClicks((c) => c + 1);
    setCombo(0);
  }, [gameState]);

  const progressPercent = ((GAME_DURATION - timeLeft) / GAME_DURATION) * 100;

  return (
    <div className={styles.gameOverlay}>
      <div className={styles.gameContainer}>
        {/* Header */}
        <div className={styles.gameHeader}>
          <div className={styles.gameHeaderLeft}>
            <span className={styles.gameHeaderLabel}>SCORE</span>
            <span className={styles.gameHeaderScore}>{score} ₿</span>
          </div>

          <div className={styles.gameHeaderCenter}>
            <div className={styles.gameTimerBar}>
              <div
                className={styles.gameTimerBarFill}
                style={{ width: `${100 - progressPercent}%` }}
              />
            </div>
            <span className={styles.gameTimerText}>{timeLeft}s</span>
          </div>

          <div className={styles.gameHeaderRight}>
            {combo > 1 && <span className={styles.gameCombo}>x{combo} COMBO</span>}
            <button className={styles.gameCancelBtn} onClick={onCancel}>
              ESC
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className={styles.gameArea} ref={gameAreaRef} onClick={handleMissClick}>
          {/* Countdown */}
          {gameState === 'countdown' && (
            <div className={styles.gameCountdown}>
              <span className={styles.gameCountdownNumber}>{countdown || 'GO!'}</span>
              <span className={styles.gameCountdownHint}>Лови монетки!</span>
            </div>
          )}

          {/* Falling Items */}
          {items.map((item) => (
            <button
              key={item.id}
              className={`${styles.gameCoin} ${styles[`gameCoin_${item.type}`]} ${
                item.caught ? styles.gameCoinCaught : ''
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              }}
              onClick={(e) => handleItemClick(e, item)}
            >
              {ITEM_ICONS[item.type]}
            </button>
          ))}

          {/* Floating score texts */}
          {floatingTexts.map((ft) => (
            <span
              key={ft.id}
              className={`${styles.gameFloatText} ${
                ft.value > 0 ? styles.gameFloatTextPositive : styles.gameFloatTextNegative
              }`}
              style={{ left: `${ft.x}%`, top: `${ft.y}%` }}
            >
              {ft.value > 0 ? `+${ft.value}` : ft.value}
            </span>
          ))}
        </div>

        {/* Footer hint */}
        <div className={styles.gameFooter}>
          <span>🪙 = 1₿</span>
          <span>🥈 = 3₿</span>
          <span>🥇 = 5₿</span>
          <span className={styles.gameFooterDanger}>💣 = -3₿</span>
        </div>
      </div>
    </div>
  );
};

CoinGame.displayName = 'CoinGame';
