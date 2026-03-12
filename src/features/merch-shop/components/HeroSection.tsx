import React from 'react';
import { MonetizationOn as CoinIcon } from '@mui/icons-material';
import type { MerchShopStats, UserBalance } from '../types';
import styles from '../MerchShopPage.module.scss';

interface Props {
  stats: MerchShopStats;
  balance: UserBalance;
}

export const HeroSection: React.FC<Props> = React.memo(({ stats, balance }) => (
  <div className={styles.hero}>
    <div className={`${styles.heroGlow} ${styles.heroGlow1}`} />
    <div className={`${styles.heroGlow} ${styles.heroGlow2}`} />
    <div className={`${styles.heroGlow} ${styles.heroGlow3}`} />

    <div className={styles.heroContent}>
      <div className={styles.heroLeft}>
        <div className={styles.heroEyebrow}>
          <span className={styles.heroEyebrowDot} />
          MEDIPAL_MERCH :: ONLINE
        </div>
        <h1 className={styles.heroTitle}>
          Корп-магазин{' '}
          <span className={styles.heroTitleAccent} data-text="мерча">
            мерча
          </span>
        </h1>
        <p className={styles.heroSubtitle}>
          Обменивайте заработанные монетки на фирменный мерч — худи, кружки, блокноты и другие вещи
          с символикой Медипал
        </p>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.balanceCard}>
          <div className={styles.balanceIcon}>
            <CoinIcon sx={{ fontSize: 22 }} />
          </div>
          <div className={styles.balanceInfo}>
            <span className={styles.balanceLabel}>// БАЛАНС</span>
            <span className={styles.balanceValue}>{balance.coins.toLocaleString('ru-RU')} ₿</span>
          </div>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{stats.totalProducts}</span>
            <span className={styles.heroStatLabel}>товаров</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{stats.soldThisMonth}</span>
            <span className={styles.heroStatLabel}>за месяц</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

HeroSection.displayName = 'HeroSection';
