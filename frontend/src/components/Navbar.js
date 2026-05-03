import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, Menu, Dumbbell } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="glass-card" style={{ 
      margin: '20px', 
      borderRadius: '20px',
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '12px 32px',
      position: 'sticky',
      top: '20px',
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--primary)' }}>
        <Dumbbell size={32} />
        <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '1px' }}>GYM<span style={{ color: '#fff' }}>FLOW</span></span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/customers" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Members</Link>
        <Link to="/trainers" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Trainers</Link>
        <Link to="/subscriptions" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Plans</Link>
        
        <div style={{ height: '24px', width: '1px', background: 'var(--border)' }}></div>
        
        <button 
          onClick={handleLogout}
          className="btn-outline" 
          style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
