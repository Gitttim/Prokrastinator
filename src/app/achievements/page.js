"use client";
import { useTracker } from '@/context/TrackerContext';
import styles from '@/components/Dashboard.module.css';

export default function AchievementsPage() {
    const { userStats, LEVELS, getLevelDetails } = useTracker();

    const currentLevelInfo = getLevelDetails(userStats.level);

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 style={{ fontSize: '32px' }}>🏆 Achievements & Level</h1>
            </div>

            <div className={`glassPanel`} style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{ fontSize: '64px' }}>🛡️</div>
                <div>
                    <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Level {userStats.level}: {currentLevelInfo.name}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Total XP: {userStats.xp.toLocaleString()}</p>
                </div>
            </div>

            <h2 style={{ marginBottom: '16px' }}>Level Ladder</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {LEVELS.map((lvl) => {
                    const isUnlocked = userStats.level >= lvl.level;
                    return (
                        <div
                            key={lvl.level}
                            className={`glassPanel`}
                            style={{
                                borderColor: isUnlocked ? 'var(--neon-green)' : 'rgba(255,255,255,0.05)',
                                opacity: isUnlocked ? 1 : 0.5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 'bold', color: isUnlocked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{lvl.level}. {lvl.name}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{lvl.xp.toLocaleString()} XP</div>
                            </div>
                            {isUnlocked && <span>✅</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
