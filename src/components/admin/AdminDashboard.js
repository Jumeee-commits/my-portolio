import React, { useState } from 'react';
import CrudManager from './CrudManager';

const tabs = ['services', 'portfolio', 'blog', 'testimonials'];

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '70vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Admin Dashboard</h1>
        <button onClick={onLogout} style={{ padding: '8px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '12px 24px', 
              textTransform: 'capitalize',
              background: activeTab === tab ? '#e0a80d' : '#f1f1f1',
              color: activeTab === tab ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            Manage {tab}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <CrudManager resource={activeTab} token={token} />
      </div>
    </div>
  );
};

export default AdminDashboard;
