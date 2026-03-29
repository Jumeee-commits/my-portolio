import React, { useState, useEffect } from 'react';

const schemas = {
  services: [
    { name: 'iconName', label: 'Icon (MUI name)', type: 'text', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'desc', label: 'Description', type: 'textarea', required: true }
  ],
  portfolio: [
    { name: 'cover', label: 'Cover Image URL', type: 'text', required: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true }
  ],
  blog: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'author', label: 'Author', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'text', required: true },
    { name: 'cover', label: 'Cover Image URL', type: 'text', required: true },
    { name: 'desc', label: 'Description', type: 'textarea', required: true }
  ],
  testimonials: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'post', label: 'Role/Position', type: 'text', required: true },
    { name: 'image', label: 'Image URL', type: 'text', required: true },
    { name: 'text', label: 'Testimonial Text', type: 'textarea', required: true }
  ]
};

const CrudManager = ({ resource, token }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const API_URL = process.env.REACT_APP_API_URL || 'https://my-portolio-ulg3.vercel.app';
  const schema = schemas[resource];

  useEffect(() => {
    fetchItems();
  }, [resource]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/${resource}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/${resource}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter(item => item._id !== id));
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      const initialData = {};
      schema.forEach(field => {
        initialData[field.name] = item[field.name] || '';
      });
      setFormData(initialData);
    } else {
      setEditingId(null);
      const initialData = {};
      schema.forEach(field => {
        initialData[field.name] = '';
      });
      setFormData(initialData);
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId 
      ? `${API_URL}/api/${resource}/${editingId}` 
      : `${API_URL}/api/${resource}`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (err) {
      alert('Save failed');
    }
  };

  if (loading) return <p>Loading {resource}...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ textTransform: 'capitalize', margin: 0 }}>{resource} List</h2>
        <button 
          onClick={() => handleOpenModal()} 
          style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Add New
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
            {schema.map(col => (
              <th key={col.name} style={{ padding: '12px' }}>{col.label}</th>
            ))}
            <th style={{ padding: '12px', width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
              {schema.map(col => (
                <td key={col.name} style={{ padding: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item[col.name]}
                </td>
              ))}
              <td style={{ padding: '12px' }}>
                <button onClick={() => handleOpenModal(item)} style={{ marginRight: '10px', padding: '5px 10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(item._id)} style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={schema.length + 1} style={{ textAlign: 'center', padding: '20px' }}>No items found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0 }}>{editingId ? 'Edit' : 'Add New'} Item</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {schema.map(field => (
                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontWeight: 'bold' }}>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px', fontFamily: 'inherit' }}
                    />
                  ) : (
                    <input 
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudManager;
