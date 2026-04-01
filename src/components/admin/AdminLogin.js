import React, { useState } from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: '20px',
  },
  label: {
    display: 'block',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  inputWrap: {
    marginBottom: '22px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #f9d423, #e0a80d)',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    transition: 'opacity 0.2s, transform 0.15s',
    marginTop: '4px',
  },
  error: {
    background: 'rgba(231,76,60,0.15)',
    border: '1px solid rgba(231,76,60,0.4)',
    color: '#ff6b6b',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '0.875rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  footer: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: '0.75rem',
    textAlign: 'center',
    marginTop: '28px',
    letterSpacing: '0.5px',
  },
};

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = `${process.env.REACT_APP_API_URL || 'https://my-portolio-ulg3.vercel.app'}/api/auth/login`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logoCircle}>⚡</div>
        </div>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Portfolio Admin Portal</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.inputWrap}>
            <label style={styles.label}>Admin Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(224,168,13,0.6)';
                e.target.style.boxShadow = '0 0 0 3px rgba(224,168,13,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            onMouseEnter={(e) => { e.target.style.opacity = '0.9'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footer}>🔒 Secured Admin Access &mdash; Authorised Personnel Only</p>
      </div>
    </div>
  );
};

export default AdminLogin;
