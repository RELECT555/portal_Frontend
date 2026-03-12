import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from '../MerchShopPage.module.scss';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  velocityX: number;
  velocityY: number;
  type: 'confetti' | 'coin' | 'spark';
  delay: number;
  duration: number;
  shape: 'rect' | 'circle';
}

const CONFETTI_COLORS = [
  '#00fff1',
  '#ff00aa',
  '#fbbf24',
  '#a855f7',
  '#3b82f6',
  '#10b981',
  '#f43f5e',
  '#e0e7ff',
];

const COIN_EMOJIS = ['🪙', '💰', '✨', '⭐', '🥇'];

function createParticles(count: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const isCoin = i < 12;
    const isSpark = !isCoin && i < 20;

    particles.push({
      id: i,
      x: 10 + Math.random() * 80,
      y: -10 - Math.random() * 30,
      size: isCoin
        ? 28 + Math.random() * 16
        : isSpark
          ? 4 + Math.random() * 6
          : 6 + Math.random() * 10,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      velocityX: (Math.random() - 0.5) * 40,
      velocityY: 60 + Math.random() * 80,
      type: isCoin ? 'coin' : isSpark ? 'spark' : 'confetti',
      delay: Math.random() * 600,
      duration: 2000 + Math.random() * 2000,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    });
  }

  return particles;
}

interface Props {
  active: boolean;
  onComplete?: () => void;
  coinsAmount?: number;
}

export const CelebrationEffect: React.FC<Props> = ({ active, onComplete, coinsAmount }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showCoinsText, setShowCoinsText] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    setVisible(true);
    setParticles(createParticles(60));

    const textTimer = setTimeout(() => setShowCoinsText(true), 300);

    const cleanupTimer = setTimeout(() => {
      setVisible(false);
      setShowCoinsText(false);
      setParticles([]);
      onComplete?.();
    }, 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(cleanupTimer);
    };
  }, [active, onComplete]);

  const getParticleContent = useCallback((p: Particle) => {
    if (p.type === 'coin') {
      return COIN_EMOJIS[p.id % COIN_EMOJIS.length];
    }
    return null;
  }, []);

  const flyingCoins = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 120 + Math.random() * 80;
        return {
          key: `fc-${i}`,
          delay: `${200 + i * 80}ms`,
          flyX: `${Math.cos(angle) * distance}px`,
          flyY: `${Math.sin(angle) * distance}px`,
        };
      }),
    // Recompute each time the effect becomes visible
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible],
  );

  if (!visible) return null;

  return (
    <div className={styles.celebrationOverlay}>
      {/* Flash */}
      <div className={styles.celebrationFlash} />

      {/* Radial glow */}
      <div className={styles.celebrationGlow} />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`${styles.celebrationParticle} ${styles[`celebrationParticle_${p.type}`]}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.type === 'confetti' ? p.size : undefined,
            height: p.type === 'confetti' ? p.size * (p.shape === 'rect' ? 0.4 : 1) : undefined,
            fontSize: p.type === 'coin' ? p.size : p.type === 'spark' ? p.size : undefined,
            backgroundColor: p.type === 'confetti' ? p.color : undefined,
            borderRadius: p.shape === 'circle' || p.type === 'spark' ? '50%' : '2px',
            boxShadow: p.type === 'spark' ? `0 0 ${p.size * 2}px ${p.color}` : undefined,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
            // @ts-expect-error CSS custom properties
            '--vx': `${p.velocityX}px`,
            '--vy': `${p.velocityY}%`,
            '--rot': `${p.rotation + 720}deg`,
          }}
        >
          {getParticleContent(p)}
        </div>
      ))}

      {/* Center coin burst text */}
      {showCoinsText && coinsAmount != null && (
        <div className={styles.celebrationCenter}>
          <div className={styles.celebrationCoinIcon}>🎉</div>
          <div className={styles.celebrationAmount}>-{coinsAmount.toLocaleString('ru-RU')} ₿</div>
          <div className={styles.celebrationLabel}>Заказ оформлен!</div>
        </div>
      )}

      {/* Flying coins from center outward */}
      {flyingCoins.map((coin) => (
        <div
          key={coin.key}
          className={styles.celebrationFlyingCoin}
          style={{
            animationDelay: coin.delay,
            // @ts-expect-error CSS custom properties
            '--fly-x': coin.flyX,
            '--fly-y': coin.flyY,
          }}
        >
          🪙
        </div>
      ))}
    </div>
  );
};

CelebrationEffect.displayName = 'CelebrationEffect';
