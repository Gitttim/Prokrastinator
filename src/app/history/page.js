"use client";
import { useTracker } from '@/context/TrackerContext';
import styles from '@/components/Dashboard.module.css';

export default function HistoryPage() {
    const { logs } = useTracker();

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 style={{ fontSize: '32px' }}>📜 History Log</h1>
            </div>

            <div className={`glassPanel`} style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>Time</th>
                            <th style={{ padding: '12px' }}>Channel</th>
                            <th style={{ padding: '12px' }}>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {log.channel === 'coldCalls' && '📞 Cold Call'}
                                    {log.channel === 'instagram' && '📸 Instagram'}
                                    {log.channel === 'facebook' && '💬 Facebook'}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {log.result === 'appointment' && <span style={{ color: 'var(--neon-green)' }}>✅ Termin</span>}
                                    {log.result === 'interest' && <span style={{ color: 'var(--neon-cyan)' }}>🔄 Interesse</span>}
                                    {log.result === 'no_interest' && <span style={{ color: 'var(--neon-magenta)' }}>❌ Kein Interesse</span>}
                                    {log.result === 'no_answer' && <span style={{ color: 'var(--text-secondary)' }}>📵 Nicht erreicht</span>}
                                    {log.result === 'followup' && <span style={{ color: 'var(--neon-orange)' }}>📋 Follow-up</span>}
                                </td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No activities logged yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
