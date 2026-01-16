"use client";
import { useState } from 'react';
import { useTracker } from '@/context/TrackerContext';
import styles from './Dashboard.module.css';
import LogModal from './LogModal';

const Dashboard = () => {
    const { userStats, dailyStats, addLog, getLevelDetails, getNextLevelDetails, DAILY_TARGETS } = useTracker();
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [activeChannel, setActiveChannel] = useState('coldCalls');

    const openLogModal = (channel) => {
        setActiveChannel(channel);
        setIsLogModalOpen(true);
    };

    const handleLog = (channel, result, direction, amount) => {
        addLog(channel, result, direction, amount);
        // Play sound or confetti here later
    };

    // Calculate Progress
    const calculateProgress = (current, target) => {
        const percent = (current / target) * 100;
        return Math.min(percent, 100);
    };

    const nextLevel = getNextLevelDetails(userStats.level);
    const currentLevelInfo = getLevelDetails(userStats.level);

    // XP Progress for bar
    const xpProgress = nextLevel
        ? ((userStats.xp - currentLevelInfo.xp) / (nextLevel.xp - currentLevelInfo.xp)) * 100
        : 100;

    const channels = [
        { id: 'coldCalls', label: 'Cold Calls', icon: '📞', color: 'var(--neon-orange)' },
        { id: 'instagram', label: 'Instagram DMs', icon: '📸', color: 'var(--neon-magenta)' },
        { id: 'facebook', label: 'Facebook Msgs', icon: '💬', color: 'var(--neon-cyan)' },
    ];

    const totalActivities = dailyStats.coldCalls + dailyStats.instagram + dailyStats.facebook;
    const totalTarget = DAILY_TARGETS.coldCalls + DAILY_TARGETS.instagram + DAILY_TARGETS.facebook;

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Outreach Dominator</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Level {userStats.level} • {currentLevelInfo.name}
                    </p>
                </div>
                <div className="glassPanel" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>🔥</span>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{userStats.currentStreak}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Streak</div>
                    </div>
                </div>
            </div>

            {/* Level Progress */}
            <div className={styles.levelBarContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px' }}>
                    <span>{userStats.xp.toLocaleString()} XP</span>
                    <span>{nextLevel ? `${nextLevel.xp.toLocaleString()} XP` : 'MAX LEVEL'}</span>
                </div>
                <div className={styles.xpBarBg}>
                    <div className={styles.xpBar} style={{ width: `${xpProgress}%` }}></div>
                </div>
            </div>

            {/* Main Channels */}
            <div className={styles.channelGrid}>
                {channels.map(channel => {
                    const current = dailyStats[channel.id];
                    const target = DAILY_TARGETS[channel.id];
                    const progress = calculateProgress(current, target);

                    return (
                        <div
                            key={channel.id}
                            className={styles.channelCard}
                            style={{ '--channel-color': channel.color }}
                            onClick={() => openLogModal(channel.id)}
                        >
                            <div className={styles.channelIcon}>{channel.icon}</div>
                            <h2 style={{ marginBottom: '16px' }}>{channel.label}</h2>

                            <div className={styles.progressCircle} style={{ '--progress': `${progress}%` }}>
                                <div className={styles.progressValue}>
                                    {current}<span style={{ fontSize: '14px', opacity: 0.7 }}>/{target}</span>
                                </div>
                            </div>

                            <button className={styles.logBtn}>
                                + Log Activity
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Total Stats */}
            <div className={styles.statsGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div className={`${styles.glassPanel} ${styles.totalStats}`}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Today's Effort</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <div className={styles.statCard}>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '12px' }}>Total Sent</div>
                            <div className={styles.statValue}>
                                {totalActivities} <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/ {totalTarget}</span>
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '12px' }}>Completion</div>
                            <div className={styles.statValue}>
                                {Math.round((totalActivities / totalTarget) * 100)}%
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.glassPanel} ${styles.totalStats}`} style={{ borderColor: 'var(--neon-green)' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--neon-green)' }}>Today's Harvest (Results)</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <div className={styles.statCard}>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '12px' }}>Replies</div>
                            <div className={styles.statValue} style={{ color: 'var(--neon-cyan)' }}>
                                {dailyStats.replies}
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '12px' }}>Bookings</div>
                            <div className={styles.statValue} style={{ color: 'var(--neon-green)' }}>
                                {dailyStats.bookings}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LogModal
                isOpen={isLogModalOpen}
                onClose={() => setIsLogModalOpen(false)}
                channel={activeChannel}
                onLog={handleLog}
            />
        </div>
    );
};

export default Dashboard;
