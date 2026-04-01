import React, { useState } from 'react';
import CrudManager from './CrudManager';

const tabs = ['services', 'portfolio', 'blog', 'testimonials'];

const tabIcons = {
  services: '⚙️',
  portfolio: '🗂️',
  blog: '✍️',
  testimonials: '💬',
};

const tabColors = {
  services: { from: '#667eea', to: '#764ba2' },
  portfolio: { from: '#f9d423', to: '#e0a80d' },
  blog: { from: '#11998e', to: '#38ef7d' },
  testimonials: { from: '#fc466b', to: '#3f5efb' },
};

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('services');

  const activeColor = tabColors[activeTab];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: '#e2e8f0',
      }}
    >
      {/* ── Top Navigation Bar ── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          height: '68px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${activeColor.from}, ${activeColor.to})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'background 0.4s',
              boxShadow: `0 0 18px rgba(240,168,13,0.3)`,
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', lineHeight: 1.2 }}>
              Admin Portal
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Content Management System
            </div>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '6px 14px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 6px #2ecc71', display: 'inline-block' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Administrator</span>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: '8px 18px',
              background: 'rgba(231,76,60,0.15)',
              border: '1px solid rgba(231,76,60,0.35)',
              color: '#ff6b6b',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
              transition: 'all 0.2s',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(231,76,60,0.3)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(231,76,60,0.15)'; }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Main Body ── */}
      <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '1.75rem',
              fontWeight: '700',
              margin: '0 0 6px 0',
              letterSpacing: '-0.5px',
            }}
          >
            {tabIcons[activeTab]} Manage{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${activeColor.from}, ${activeColor.to})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'capitalize',
              }}
            >
              {activeTab}
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', margin: 0, fontSize: '0.9rem' }}>
            Create, edit, and manage your {activeTab} content from one place.
          </p>
        </div>

        {/* ── Tab Navigation ── */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '28px',
            flexWrap: 'wrap',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '8px',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const c = tabColors[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  letterSpacing: '0.3px',
                  transition: 'all 0.25s ease',
                  textTransform: 'capitalize',
                  background: isActive
                    ? `linear-gradient(135deg, ${c.from}, ${c.to})`
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                  boxShadow: isActive ? `0 4px 15px rgba(0,0,0,0.3)` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                }}
              >
                <span style={{ fontSize: '16px' }}>{tabIcons[tab]}</span>
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── Content Panel ── */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <CrudManager resource={activeTab} token={token} accentColor={activeColor} />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '0.75rem',
          padding: '24px 40px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          letterSpacing: '0.5px',
        }}
      >
        © {new Date().getFullYear()} Admin Portal &mdash; All rights reserved
      </footer>
    </div>
  );
};

export default AdminDashboard;
