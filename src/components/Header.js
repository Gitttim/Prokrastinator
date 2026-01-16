"use client";
import styles from './Header.module.css';
import { useTracker } from '@/context/TrackerContext';

const Header = () => {
    const { streak } = useTracker();

    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <h1>Dashboard</h1>
                <p className={styles.subtitle}>Welcome back, Boss. Let's crush it.</p>
            </div>
            <div className={styles.actions}>
                <div className={styles.date}>
                    🔥 {streak} Day Streak
                </div>
                <div className={styles.date}>{new Date().toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                <div className={styles.profile}>
                    <div className={styles.avatar}>T</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
