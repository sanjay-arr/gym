import React, { useState, useEffect } from 'react';
import { customerApi, trainerApi, subscriptionApi } from '../Services/Api';
import { Users, UserCheck, CreditCard, TrendingUp, Activity, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    subscriptions: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [custRes, trainerRes, subRes] = await Promise.all([
          customerApi.getAll(),
          trainerApi.getAll(),
          subscriptionApi.getAll()
        ]);
        
        setStats({
          members: custRes.data.length,
          trainers: trainerRes.data.length,
          subscriptions: subRes.data.length,
          revenue: subRes.data.reduce((acc, sub) => acc + (sub.price || 0), 0)
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Members', value: stats.members, icon: Users, color: '#c6ff00' },
    { title: 'Active Trainers', value: stats.trainers, icon: UserCheck, color: '#00e676' },
    { title: 'Subscription Plans', value: stats.subscriptions, icon: CreditCard, color: '#2979ff' },
    { title: 'Total Revenue', value: `$${stats.revenue}`, icon: TrendingUp, color: '#ff9100' },
  ];

  return (
    <div style={{ padding: '0 20px 40px' }}>
      <header className="page-header">
        <div>
          <h1 className="page-title">Gym Analytics</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Calendar size={20} color="var(--primary)" />
          <span style={{ fontWeight: 600 }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </header>

      <div className="dashboard-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="glass-card hover-scale" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ 
              background: `${stat.color}15`, 
              padding: '16px', 
              borderRadius: '12px',
              border: `1px solid ${stat.color}30`
            }}>
              <stat.icon size={28} color={stat.color} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Recent Activity</h3>
            <button className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                  <Activity size={20} color="#000" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600 }}>New member joined</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2 hours ago</p>
                </div>
                <div className="badge badge-success">Active</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(198, 255, 0, 0.1), transparent)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>Add New Member</button>
            <button className="btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>Create Plan</button>
            <button className="btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>Assign Trainer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
