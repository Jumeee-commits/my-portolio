import React, { useState, useEffect } from 'react';

const schemas = {
  services: [
    { name: 'iconName', label: 'Icon (MUI name)', type: 'text', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'desc', label: 'Description', type: 'textarea', required: true },
  ],
  portfolio: [
    { name: 'cover', label: 'Cover Image URL', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
  ],
  blog: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'author', label: 'Author', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'text', required: true },
    { name: 'cover', label: 'Cover Image URL', type: 'text', required: true },
    { name: 'desc', label: 'Description', type: 'textarea', required: true },
  ],
  testimonials: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'post', label: 'Role / Position', type: 'text', required: true },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
    { name: 'text', label: 'Testimonial Text', type: 'textarea', required: true },
  ],
};

/* ─────────────────── style helpers ─────────────────── */
const base = {
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
};

/* ─────────────────── Component ─────────────────── */
const CrudManager = ({ resource, token, accentColor = { from: '#f9d423', to: '#e0a80d' } }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [saving, setSaving] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'https://my-portolio-ulg3.vercel.app';
  const schema = schemas[resource];

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/${resource}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to fetch data. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/${resource}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter((item) => item._id !== id));
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch {
      alert('Delete failed');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleOpenModal = (item = null) => {
    const initialData = {};
    schema.forEach((f) => {
      initialData[f.name] = item ? item[f.name] || '' : '';
    });
    setFormData(initialData);
    setEditingId(item ? item._id : null);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = editingId
      ? `${API_URL}/api/${resource}/${editingId}`
      : `${API_URL}/api/${resource}`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        alert(data.message || 'Save failed');
      }
    } catch {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={{ ...base, textAlign: 'center', padding: '60px 20px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: accentColor.from,
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          Loading {resource}…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div
        style={{
          ...base,
          background: 'rgba(231,76,60,0.1)',
          border: '1px solid rgba(231,76,60,0.3)',
          borderRadius: '12px',
          padding: '24px',
          color: '#ff6b6b',
          textAlign: 'center',
        }}
      >
        ⚠️ {error}
        <button
          onClick={fetchItems}
          style={{
            display: 'block',
            margin: '12px auto 0',
            padding: '8px 20px',
            background: 'rgba(231,76,60,0.2)',
            border: '1px solid rgba(231,76,60,0.4)',
            borderRadius: '8px',
            color: '#ff6b6b',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  /* ── Main Table View ── */
  return (
    <div style={{ ...base }}>
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <p style={{ color: 'rgba(255,255,255,0.35)', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {items.length} {items.length === 1 ? 'record' : 'records'} found
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            background: `linear-gradient(135deg, ${accentColor.from}, ${accentColor.to})`,
            color: '#1a1a2e',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '0.875rem',
            letterSpacing: '0.3px',
            boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
            transition: 'transform 0.15s, opacity 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1 }}>＋</span>
          Add New
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {schema.map((col) => (
                <th
                  key={col.name}
                  style={{
                    padding: '14px 16px',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.label}
                </th>
              ))}
              <th
                style={{
                  padding: '14px 16px',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  width: '140px',
                  textAlign: 'right',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={schema.length + 1}
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: 'rgba(255,255,255,0.25)',
                    fontSize: '0.95rem',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📭</div>
                  No records yet. Click <strong style={{ color: accentColor.from }}>Add New</strong> to get started.
                </td>
              </tr>
            )}
            {items.map((item, idx) => (
              <tr
                key={item._id}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'; }}
              >
                {schema.map((col) => (
                  <td
                    key={col.name}
                    style={{
                      padding: '14px 16px',
                      color: '#e2e8f0',
                      fontSize: '0.875rem',
                      maxWidth: '220px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.type === 'textarea'
                      ? (item[col.name] || '').substring(0, 60) + ((item[col.name] || '').length > 60 ? '…' : '')
                      : item[col.name]}
                  </td>
                ))}
                <td style={{ padding: '14px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {deleteConfirmId === item._id ? (
                    <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>Confirm?</span>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          padding: '5px 12px',
                          background: 'rgba(231,76,60,0.3)',
                          border: '1px solid rgba(231,76,60,0.5)',
                          color: '#ff6b6b',
                          borderRadius: '7px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        style={{
                          padding: '5px 12px',
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.6)',
                          borderRadius: '7px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                        }}
                      >
                        No
                      </button>
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenModal(item)}
                        style={{
                          padding: '6px 14px',
                          background: 'rgba(102,126,234,0.15)',
                          border: '1px solid rgba(102,126,234,0.35)',
                          color: '#a5b4fc',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(102,126,234,0.3)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(102,126,234,0.15)'; }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item._id)}
                        style={{
                          padding: '6px 14px',
                          background: 'rgba(231,76,60,0.12)',
                          border: '1px solid rgba(231,76,60,0.3)',
                          color: '#ff6b6b',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(231,76,60,0.25)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(231,76,60,0.12)'; }}
                      >
                        🗑 Delete
                      </button>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div
            style={{
              background: 'linear-gradient(160deg, #1a1a3e, #1e1e4a)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '520px',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '28px 32px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: '#ffffff',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                  }}
                >
                  {editingId ? '✏️ Edit Record' : '➕ Add New Record'}
                </h2>
                <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', textTransform: 'capitalize' }}>
                  {resource} · {editingId ? 'Update existing entry' : 'Create a new entry'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit}>
              <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {schema.map((field) => (
                  <div key={field.name}>
                    <label
                      style={{
                        display: 'block',
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '8px',
                      }}
                    >
                      {field.label}
                      {field.required && (
                        <span style={{ color: accentColor.from, marginLeft: '4px' }}>*</span>
                      )}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          color: '#e2e8f0',
                          fontSize: '0.9rem',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          boxSizing: 'border-box',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${accentColor.from}60`;
                          e.target.style.boxShadow = `0 0 0 3px ${accentColor.from}18`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          color: '#e2e8f0',
                          fontSize: '0.9rem',
                          fontFamily: 'inherit',
                          outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          boxSizing: 'border-box',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${accentColor.from}60`;
                          e.target.style.boxShadow = `0 0 0 3px ${accentColor.from}18`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  padding: '20px 32px 28px',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '11px 24px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '11px 28px',
                    background: `linear-gradient(135deg, ${accentColor.from}, ${accentColor.to})`,
                    color: '#1a1a2e',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    opacity: saving ? 0.7 : 1,
                    transition: 'all 0.2s',
                    letterSpacing: '0.3px',
                  }}
                  onMouseEnter={(e) => { if (!saving) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {saving ? 'Saving…' : editingId ? '✓ Save Changes' : '✓ Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudManager;
