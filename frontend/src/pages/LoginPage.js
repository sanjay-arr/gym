import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../Services/Api';
import { LogIn, UserPlus, Mail, Lock, Dumbbell } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const response = await authApi.login({ email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        await authApi.register({ email, password });
        setIsLogin(true);
        setError('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            background: 'var(--primary)', 
            width: '64px', 
            height: '64px', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 10px 30px rgba(198, 255, 0, 0.2)'
          }}>
            <Dumbbell size={32} color="#000" />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
            {isLogin ? 'Welcome Back' : 'Join the Elite'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Enter your credentials to access your dashboard' : 'Create an account to start managing your gym'}
          </p>
        </div>

        <div className="glass-card">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="name@example.com"
                  style={{ paddingLeft: '48px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="••••••••"
                  style={{ paddingLeft: '48px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div style={{ 
                padding: '12px', 
                background: 'rgba(255, 51, 51, 0.1)', 
                color: 'var(--error)', 
                borderRadius: '8px', 
                marginBottom: '20px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255, 51, 51, 0.2)'
              }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', marginBottom: '20px' }}
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && (isLogin ? <LogIn size={20} /> : <UserPlus size={20} />)}
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--primary)', 
                    marginLeft: '8px', 
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
