"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: '🚀' },
        { name: 'Stats', path: '/outreach', icon: '📊' },
        { name: 'Achievements', path: '/achievements', icon: '🏆' },
        { name: 'History', path: '/history', icon: '📜' },
        { name: 'Admin', path: '/admin', icon: '⚙️' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button 
                className={styles.hamburger} 
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
            </button>

            {/* Backdrop for mobile */}
            {isMobileMenuOpen && (
                <div 
                    className={styles.backdrop} 
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.logo}>
                    AGENCY<span className="text-gradient">OS</span>
                </div>
                <nav className={styles.nav}>
                    {menuItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.path} 
                            className={styles.link}
                            onClick={closeMobileMenu}
                        >
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
        </>
    );
};

export default Sidebar;
