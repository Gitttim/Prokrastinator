import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/', icon: '🚀' },
        { name: 'Stats', path: '/outreach', icon: '📊' },
        { name: 'Achievements', path: '/achievements', icon: '🏆' },
        { name: 'History', path: '/history', icon: '📜' },
        { name: 'Admin', path: '/admin', icon: '⚙️' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                AGENCY<span className="text-gradient">OS</span>
            </div>
            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <Link key={item.name} href={item.path} className={styles.link}>
                        <span className={styles.icon}>{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className={styles.footer}>
                <div className={styles.status}>
                    <div className={styles.dot}></div>
                    Online
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
