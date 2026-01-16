"use client";
import { useTracker } from '@/context/TrackerContext';
import styles from '@/components/Dashboard.module.css';
import TrendChart from '@/components/charts/TrendChart';

export default function StatsPage() {
    const { dailyStats, DAILY_TARGETS } = useTracker();

    // Mock historical data for trends (since we just started)
    // In a real scenario, we'd pull from stored history
    const trendData = [
        { date: 'Mon', leads: 40 },
        { date: 'Tue', leads: 65 },
        { date: 'Wed', leads: 80 },
        { date: 'Thu', leads: 120 },
        { date: 'Fri', leads: 150 }, // Today-ish target
    ];

    const statsConfig = [
        { id: 'coldCalls', label: 'Cold Calls', color: 'var(--neon-orange)' },
        { id: 'instagram', label: 'Instagram', color: 'var(--neon-magenta)' },
        { id: 'facebook', label: 'Facebook', color: 'var(--neon-cyan)' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 style={{ fontSize: '32px' }}>📊 Statistics</h1>
            </div>

            <div className={styles.channelGrid}>
                {statsConfig.map(stat => (
                    <div key={stat.id} className={`glassPanel`} style={{ textAlign: 'center' }}>
                        <h2 style={{ color: stat.color }}>{stat.label}</h2>
                        <div className={styles.statValue} style={{ fontSize: '48px', marginTop: '16px' }}>
                            {dailyStats[stat.id]}
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>/ {DAILY_TARGETS[stat.id]} Target</div>
                    </div>
                ))}
            </div>

            <div className={`glassPanel`}>
                <h2 style={{ marginBottom: '24px' }}>📈 Weekly Trend (Simulation)</h2>
                <div style={{ height: '300px', width: '100%' }}>
                    <TrendChart data={trendData} dataKey="leads" color="var(--neon-cyan)" />
                </div>
            </div>
        </div>
    );
}
