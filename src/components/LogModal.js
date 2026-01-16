"use client";
import { useState, useEffect } from 'react';
import styles from './LogModal.module.css';

const LogModal = ({ isOpen, onClose, channel, onLog }) => {
    const [mode, setMode] = useState('effort'); // 'effort' | 'result'
    const [amount, setAmount] = useState(1);
    const [resultType, setResultType] = useState(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setMode('effort');
            setAmount(1);
            setResultType(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const channelIcons = {
        coldCalls: '📞',
        instagram: '📸',
        facebook: '💬'
    };

    const channelNames = {
        coldCalls: 'Cold Calls',
        instagram: 'Instagram DMs',
        facebook: 'Facebook Msgs'
    };

    const actionVerb = {
        coldCalls: 'Calls Made',
        instagram: 'DMs Sent',
        facebook: 'Msgs Sent'
    };

    const resultOptions = [
        { id: 'appointment', label: 'Termin gebucht', icon: '✅', color: 'var(--neon-green)' },
        { id: 'interest', label: 'Interesse / Reply', icon: '🔄', color: 'var(--neon-cyan)' },
        { id: 'no_interest', label: 'Kein Interesse', icon: '❌', color: 'var(--neon-magenta)' },
        { id: 'no_answer', label: 'Nicht erreicht', icon: '📵', color: 'var(--text-secondary)' },
        { id: 'followup', label: 'Follow-up nötig', icon: '📋', color: 'var(--neon-orange)' }
    ];

    const handleSubmit = () => {
        if (mode === 'effort') {
            onLog(channel, 'sent', 'outbound', parseInt(amount));
        } else {
            if (resultType) {
                onLog(channel, resultType, 'inbound', 1);
            }
        }
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span style={{ fontSize: '24px' }}>{channelIcons[channel]}</span>
                    <h2>{channelNames[channel]} loggen</h2>
                    <button onClick={onClose} className={styles.closeBtn}>✕</button>
                </div>

                {/* Mode Switcher */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px', marginBottom: '24px' }}>
                    <button
                        className={styles.optionBtn}
                        style={{ flex: 1, justifyContent: 'center', background: mode === 'effort' ? 'var(--neon-cyan)' : 'transparent', color: mode === 'effort' ? '#000' : 'var(--text-secondary)', border: 'none' }}
                        onClick={() => setMode('effort')}
                    >
                        📤 Effort (Sent)
                    </button>
                    <button
                        className={styles.optionBtn}
                        style={{ flex: 1, justifyContent: 'center', background: mode === 'result' ? 'var(--neon-green)' : 'transparent', color: mode === 'result' ? '#000' : 'var(--text-secondary)', border: 'none' }}
                        onClick={() => setMode('result')}
                    >
                        📥 Result (Harvest)
                    </button>
                </div>

                {mode === 'effort' ? (
                    <div style={{ textAlign: 'center', margin: '32px 0' }}>
                        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            How many {actionVerb[channel]}?
                        </div>
                        <input
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: '2px solid var(--neon-cyan)',
                                color: 'var(--text-primary)',
                                fontSize: '48px',
                                width: '120px',
                                textAlign: 'center',
                                borderRadius: '12px',
                                padding: '8px'
                            }}
                        />
                        <div style={{ marginTop: '16px', color: 'var(--neon-cyan)', fontSize: '12px' }}>
                            + {amount * 10} XP
                        </div>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {resultOptions.map(r => (
                            <button
                                key={r.id}
                                className={`${styles.optionBtn} ${resultType === r.id ? styles.selected : ''}`}
                                onClick={() => setResultType(r.id)}
                                style={{ '--btn-color': r.color }}
                            >
                                <span className={styles.icon}>{r.icon}</span>
                                <span>{r.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                <button
                    className={styles.submitBtn}
                    disabled={mode === 'result' && !resultType}
                    onClick={handleSubmit}
                    style={{ background: mode === 'effort' ? 'linear-gradient(90deg, var(--neon-cyan), #00aaff)' : 'linear-gradient(90deg, var(--neon-green), #00ff88)' }}
                >
                    {mode === 'effort' ? 'Log Effort' : 'Log Result'}
                </button>
            </div>
        </div>
    );
};

export default LogModal;
