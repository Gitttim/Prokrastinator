"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const TrackerContext = createContext();

// Constants based on Outreach Dominator Specs
// "Effort" Targets
const DAILY_TARGETS = {
    coldCalls: 50,
    instagram: 50,
    facebook: 50
};

// XP System
const XP_VALUES = {
    OUTBOUND: 10,       // Effort: Sending a DM / Making a Call
    INBOUND_REPLY: 20,  // Result: Getting a reply
    APPOINTMENT: 100,   // Result: Booking
    CHANNEL_TARGET: 50,
    ALL_TARGETS: 200,
    STREAK_7: 500,
    STREAK_30: 2000
};

const LEVELS = [
    { level: 1, name: "Outreach Rookie", xp: 0 },
    { level: 2, name: "Contact Starter", xp: 500 },
    { level: 3, name: "Pipeline Builder", xp: 1500 },
    { level: 4, name: "Deal Hunter", xp: 3500 },
    { level: 5, name: "Sales Warrior", xp: 7000 },
    { level: 6, name: "Closer Elite", xp: 12000 },
    { level: 7, name: "Revenue Machine", xp: 20000 },
    { level: 8, name: "Outreach Legend", xp: 35000 },
    { level: 9, name: "Sales Titan", xp: 55000 },
    { level: 10, name: "Dominator Supreme", xp: 80000 }
];

export const TrackerProvider = ({ children }) => {
    // Core Data
    const [logs, setLogs] = useState([]);
    const [userStats, setUserStats] = useState({
        xp: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        achievements: [] // Array of string IDs
    });

    // Computed Daily Stats (Derived from logs to ensure consistency)
    const [dailyStats, setDailyStats] = useState({
        coldCalls: 0,
        instagram: 0,
        facebook: 0,
        replies: 0,
        bookings: 0
    });

    // Load Data
    useEffect(() => {
        const savedLogs = localStorage.getItem('od_logs');
        const savedUserStats = localStorage.getItem('od_user_stats');

        if (savedLogs) {
            const parsedLogs = JSON.parse(savedLogs);
            setLogs(parsedLogs);
            updateDailyStats(parsedLogs);
        }

        if (savedUserStats) {
            setUserStats(JSON.parse(savedUserStats));
        }
    }, []);

    // Save Data
    useEffect(() => {
        localStorage.setItem('od_logs', JSON.stringify(logs));
        updateDailyStats(logs);
    }, [logs]);

    useEffect(() => {
        localStorage.setItem('od_user_stats', JSON.stringify(userStats));
    }, [userStats]);

    const updateDailyStats = (currentLogs) => {
        const today = new Date().toDateString();
        const todaysLogs = currentLogs.filter(log => new Date(log.timestamp).toDateString() === today);

        const stats = {
            // Count efforts (outbound) - Summing 'amount' for bulk logging
            coldCalls: todaysLogs.filter(l => l.channel === 'coldCalls' && l.direction === 'outbound').reduce((acc, l) => acc + (l.amount || 1), 0),
            instagram: todaysLogs.filter(l => l.channel === 'instagram' && l.direction === 'outbound').reduce((acc, l) => acc + (l.amount || 1), 0),
            facebook: todaysLogs.filter(l => l.channel === 'facebook' && l.direction === 'outbound').reduce((acc, l) => acc + (l.amount || 1), 0),
            // Count findings (inbound/results)
            replies: todaysLogs.filter(l => l.direction === 'inbound' && (l.result === 'interest' || l.result === 'reply')).length,
            bookings: todaysLogs.filter(l => l.result === 'appointment').length
        };
        setDailyStats(stats);
    };

    const calculateLevel = (xp) => {
        // Find highest level where xp >= requirement
        const level = LEVELS.slice().reverse().find(l => xp >= l.xp) || LEVELS[0];
        return level.level;
    };

    const addLog = (channel, result, direction = 'outbound', amount = 1) => {
        // channel: 'coldCalls' | 'instagram' | 'facebook'
        // result: 'sent' | 'appointment' | 'interest' | 'no_interest' ...
        // direction: 'outbound' | 'inbound'

        const newLog = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            channel,
            result,
            direction,
            amount
        };

        const updatedLogs = [newLog, ...logs];
        setLogs(updatedLogs);

        // Calculate XP Gain
        let xpGain = 0;

        if (direction === 'outbound') {
            // XP for Effort
            xpGain += XP_VALUES.OUTBOUND * amount;
        } else {
            // XP for Results
            if (result === 'appointment') xpGain += XP_VALUES.APPOINTMENT;
            else if (result === 'interest' || result === 'reply') xpGain += XP_VALUES.INBOUND_REPLY;
        }

        // Check for Daily Targets Bonus (Only for Outbound Effort)
        if (direction === 'outbound') {
            const today = new Date().toDateString();
            const todaysLogs = updatedLogs.filter(log => new Date(log.timestamp).toDateString() === today);

            // Calculate total for this channel including the new log
            const channelCount = todaysLogs
                .filter(l => l.channel === channel && l.direction === 'outbound')
                .reduce((acc, l) => acc + (l.amount || 1), 0);

            // Previous count
            const prevCount = channelCount - amount;

            // If we crossed the threshold just now
            if (prevCount < DAILY_TARGETS[channel] && channelCount >= DAILY_TARGETS[channel]) {
                xpGain += XP_VALUES.CHANNEL_TARGET;

                // Check if ALL 3 are now hit
                const allHit = ['coldCalls', 'instagram', 'facebook'].every(c => {
                    const count = todaysLogs
                        .filter(l => l.channel === c && l.direction === 'outbound')
                        .reduce((acc, l) => acc + (l.amount || 1), 0);
                    return count >= DAILY_TARGETS[c];
                });

                if (allHit) {
                    xpGain += XP_VALUES.ALL_TARGETS;
                }
            }
        }

        // Update User Stats
        setUserStats(prev => {
            const newXp = prev.xp + xpGain;
            return {
                ...prev,
                xp: newXp,
                level: calculateLevel(newXp)
            };
        });
    };

    // Helper to get total progress
    const getLevelDetails = (levelNum) => LEVELS.find(l => l.level === levelNum);
    const getNextLevelDetails = (levelNum) => LEVELS.find(l => l.level === levelNum + 1);

    return (
        <TrackerContext.Provider value={{
            logs,
            userStats,
            dailyStats,
            addLog,
            getLevelDetails,
            getNextLevelDetails,
            DAILY_TARGETS,
            LEVELS
        }}>
            {children}
        </TrackerContext.Provider>
    );
};

export const useTracker = () => useContext(TrackerContext);
