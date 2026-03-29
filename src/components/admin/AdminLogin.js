import React, { useState } from 'react';

const AdminLogin = ({ setToken }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL || 'https://my-portolio-ulg3.vercel.app'}/api/auth/login`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', minHeight: '50vh' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Admin Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', margin: 0 }}>{error}</p>}
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '12px', background: '#e0a80d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
