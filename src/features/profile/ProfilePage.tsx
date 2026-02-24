import React from 'react';
import { ProfileHero } from './components/ProfileHero';
import { ProfileInfoCard } from './components/ProfileInfoCard';
import { ProfileBioCard } from './components/ProfileBioCard';
import { ProfileStatsCard } from './components/ProfileStatsCard';
import { ProfileAchievementsCard } from './components/ProfileAchievementsCard';
import { ProfileActivityCard } from './components/ProfileActivityCard';
import { ProfileManagerCard } from './components/ProfileManagerCard';
import { MOCK_PROFILE } from './data/mockProfile';
import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const profile = MOCK_PROFILE;

  return (
    <div className={styles.page}>
      <div className={styles.ambientGlow} />
      <div className={styles.ambientGlow2} />

      <ProfileHero profile={profile} />

      <div className={styles.bentoGrid}>
        <div className={styles.bentoSpan5}>
          <ProfileInfoCard profile={profile} />
        </div>
        <div className={styles.bentoSpan4}>
          <ProfileBioCard profile={profile} />
        </div>
        <div className={styles.bentoSpan3}>
          {profile.manager && <ProfileManagerCard manager={profile.manager} />}
          <div style={{ marginTop: profile.manager ? 16 : 0 }}>
            <ProfileStatsCard stats={profile.stats} />
          </div>
        </div>
      </div>

      <ProfileAchievementsCard achievements={profile.achievements} />
      <ProfileActivityCard activity={profile.recentActivity} />
    </div>
  );
};

export default ProfilePage;
