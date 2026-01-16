"use client";
import { useState, useEffect } from 'react';
import SectionPage from '@/components/SectionPage';
import { useTracker } from '@/context/TrackerContext';
import styles from '@/components/Dashboard.module.css';

export default function AdminPage() {
    const { tasks, addTask, deleteTask, toggleTask, targets, updateTargets } = useTracker();
    const [newTaskText, setNewTaskText] = useState('');

    // Local state for targets to avoid jittery inputs while typing
    const [localTargets, setLocalTargets] = useState(targets);

    // Sync local state when context targets change (initial load)
    useEffect(() => {
        setLocalTargets(targets);
    }, [targets]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        addTask(newTaskText);
        setNewTaskText('');
    };

    const handleUpdateTargets = (e) => {
        e.preventDefault();
        updateTargets(localTargets);
        alert('Targets updated!');
    };

    const handleTargetChange = (key, value) => {
        setLocalTargets(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
    };

    return (
        <div className={styles.dashboard}>
            <div className={`glass-panel ${styles.section}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚙️</div>
                    <h1>Admin & Organization</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage your tasks and set your daily goals.</p>
                </div>

                <div className={styles.chartsRow} style={{ gridTemplateColumns: '1fr' }}>

                    {/* Task Management */}
                    <div className={`glass-panel`}>
                        <h2>📝 Task Management</h2>
                        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                            <input
                                type="text"
                                placeholder="Add a new task..."
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: '0 24px',
                                    borderRadius: '8px',
                                    background: 'var(--neon-blue)',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Add
                            </button>
                        </form>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {tasks.map(task => (
                                <div key={task.id} className={styles.todoItem} style={{ justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTask(task.id)}
                                            className={styles.checkbox}
                                        />
                                        <span style={{
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)'
                                        }}>
                                            {task.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            padding: '4px'
                                        }}
                                        title="Delete Task"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            {tasks.length === 0 && <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No tasks added.</p>}
                        </div>
                    </div>

                    {/* Target Settings */}
                    <div className={`glass-panel`}>
                        <h2>🎯 Daily Targets</h2>
                        <form onSubmit={handleUpdateTargets} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Leads</label>
                                <input
                                    type="number"
                                    value={localTargets.leads}
                                    onChange={(e) => handleTargetChange('leads', e.target.value)}
                                    style={{
                                        width: '100%', padding: '8px', borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--neon-blue)', color: 'var(--neon-blue)', fontWeight: 'bold'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Outreach</label>
                                <input
                                    type="number"
                                    value={localTargets.outreach}
                                    onChange={(e) => handleTargetChange('outreach', e.target.value)}
                                    style={{
                                        width: '100%', padding: '8px', borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--neon-green)', color: 'var(--neon-green)', fontWeight: 'bold'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Cold Calls</label>
                                <input
                                    type="number"
                                    value={localTargets.coldCalls}
                                    onChange={(e) => handleTargetChange('coldCalls', e.target.value)}
                                    style={{
                                        width: '100%', padding: '8px', borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--neon-orange)', color: 'var(--neon-orange)', fontWeight: 'bold'
                                    }}
                                />
                            </div>

                            <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Save Targets
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
