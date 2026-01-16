"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const FunnelChart = ({ data }) => {
    // Data expected: [{ name: 'Leads', value: 100 }, { name: 'Outreach', value: 60 }, ...]

    const colors = ['var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-orange)', 'var(--neon-green)'];

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        stroke="var(--text-secondary)"
                        tick={{ fill: 'var(--text-primary)', fontSize: 14, fontWeight: 500 }}
                        tickLine={false}
                        axisLine={false}
                        width={100}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: '#121212', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FunnelChart;
