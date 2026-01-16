"use client";
import { useTracker } from '@/context/TrackerContext';
import styles from '@/components/Dashboard.module.css';

export default function AdminPage() {
    const { DAILY_TARGETS } = useTracker();

    const handleResetData = () => {
        if (confirm('Are you sure? This will delete all your XP, History, and Stats!')) {
            localStorage.removeItem('od_logs');
            localStorage.removeItem('od_user_stats');
            window.location.reload();
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 style={{ fontSize: '32px' }}>⚙️ Admin & Settings</h1>
            </div>

            <div className={`glassPanel`} style={{ marginBottom: '24px' }}>
                <h2 style={{ marginBottom: '16px' }}>🎯 Daily Targets Configuration</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div className={styles.statCard}>
                        <div style={{ color: 'var(--neon-orange)' }}>Cold Calls</div>
                        <div className={styles.statValue}>{DAILY_TARGETS.coldCalls}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div style={{ color: 'var(--neon-magenta)' }}>Instagram</div>
                        <div className={styles.statValue}>{DAILY_TARGETS.instagram}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div style={{ color: 'var(--neon-cyan)' }}>Facebook</div>
                        <div className={styles.statValue}>{DAILY_TARGETS.facebook}</div>
                    </div>
                </div>
                <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                    *Targets are currently fixed in the Outreach Dominator configuration.
                </p>
            </div>

            <div className={`glassPanel`} style={{ borderColor: 'var(--neon-magenta)' }}>
                <h2 style={{ marginBottom: '16px', color: 'var(--neon-magenta)' }}>⚠️ Danger Zone</h2>
                <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    Reset all your progress, XP, and history. This cannot be undone.
                </p>
                <button
                    onClick={handleResetData}
                    style={{
                        background: 'rgba(255, 0, 0, 0.2)',
                        border: '1px solid red',
                        color: 'red',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    💀 Factory Reset App
                </button>
            </div>
        </div>
    );
}
