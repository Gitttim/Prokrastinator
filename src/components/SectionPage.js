import styles from './Dashboard.module.css';

const SectionPage = ({ title, emoji }) => {
    return (
        <div className={styles.dashboard}>
            <div className={`glass-panel ${styles.section}`} style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>{emoji}</div>
                <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>{title}</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Advanced tracking for {title} coming soon.</p>
                <div style={{ marginTop: '32px', padding: '16px', border: '1px solid var(--neon-blue)', borderRadius: '8px', color: 'var(--neon-blue)' }}>
                    AgencyOS v1.0
                </div>
            </div>
        </div>
    );
};

export default SectionPage;
