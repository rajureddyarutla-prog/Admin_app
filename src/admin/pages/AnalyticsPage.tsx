import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

interface AnalyticsData {
  dailyStats: Array<{
    date: string;
    visitors: number;
    pageViews: number;
  }>;
  topPages: Array<{
    path: string;
    title: string;
    visitors: number;
    avgDuration: number;
    views: number;
  }>;
  totalActiveUsers: string;
}

export const AnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const result = await response.json();
        console.log('Analytics data received in browser:', result);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '24px' }}>
        <div>Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <div style={{ color: '#d32f2f' }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
      <div style={{ padding: '32px', backgroundColor: '#ffffff', borderBottom: '1px solid #e1e1e1' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600, color: '#32325d' }}>Google Analytics Dashboard</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
          <div style={{
            padding: '20px 24px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
            border: '1px solid #e3e8ee'
          }}>
            <p style={{ margin: 0, color: '#6b7c93', fontSize: '14px', fontWeight: 500 }}>Real-time Active Users</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#32325d' }}>{data?.totalActiveUsers || '0'}</span>
              <span style={{
                padding: '4px 10px',
                backgroundColor: '#e6fffa',
                color: '#008b8b',
                fontSize: '11px',
                borderRadius: '6px',
                fontWeight: 700,
                textTransform: 'uppercase',
                border: '1px solid #b2f5ea',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: '6px', height: '6px', backgroundColor: '#38b2ac', borderRadius: '50%' }}></span>
                Live
              </span>
            </div>
          </div>

          <div style={{
            flex: 1,
            padding: '20px 24px',
            backgroundColor: '#fffbeb',
            borderRadius: '12px',
            border: '1px solid #fef3c7',
            fontSize: '14px',
            color: '#92400e',
            lineHeight: '1.5'
          }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>📈 Analyzing Your Visit</h4>
            If you just added your Analytics ID, it may take 24-48 hours for the graphs below to show data.
            However, the <strong>Real-time</strong> counter above should catch your visit within minutes if you've restarted your frontend server!
          </div>
        </div>
      </div>

      <div style={{ padding: '32px', display: 'grid', gap: '32px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e3e8ee', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#4f566b' }}>Daily Visitors & Page Views (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data?.dailyStats || []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7c93' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7c93' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" dataKey="visitors" name="Visitors" stroke="#556cd6" strokeWidth={3} dot={{ r: 4, fill: '#556cd6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="pageViews" name="Page Views" stroke="#24b47e" strokeWidth={3} dot={{ r: 4, fill: '#24b47e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e3e8ee', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#4f566b' }}>Top Pages</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data?.topPages || []} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7c93' }} />
              <YAxis type="category" dataKey="title" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7c93' }} width={150} />
              <Tooltip cursor={{ fill: '#f7fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar dataKey="visitors" name="Visitors" fill="#556cd6" radius={[0, 4, 4, 0]} barSize={20} />
              <Bar dataKey="views" name="Views" fill="#24b47e" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};