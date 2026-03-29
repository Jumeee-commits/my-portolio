import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export const AdminApp = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  // The Header and Footer are rendered outside this in Pages.js, 
  // but if we want a clean admin area, we can style it to take full screen or sit within the body.
  
  if (!token) {
    return <AdminLogin setToken={setToken} />;
  }

  return <AdminDashboard token={token} onLogout={handleLogout} />;
};
