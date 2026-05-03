import React, { useState, useEffect } from 'react';
import { customerApi } from '../Services/Api';
import { Plus, Search, MoreVertical, Edit2, Trash2, Mail, Phone } from 'lucide-react';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await customerApi.getAll();
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await customerApi.delete(id);
        fetchCustomers();
      } catch (err) {
        alert("Error deleting customer");
      }
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '0 20px 40px' }}>
      <header className="page-header">
        <div>
          <h1 className="page-title">Gym Members</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your gym members and their subscriptions.</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Add New Member
        </button>
      </header>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search by name or email..." 
              style={{ paddingLeft: '48px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Member</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Contact</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Details</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Loading members...</td></tr>
              ) : filteredCustomers.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No members found.</td></tr>
              ) : filteredCustomers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: '1px solid var(--border)' }} className="hover-scale">
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '10px', 
                        background: 'var(--surface-light)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: 'var(--primary)'
                      }}>
                        {customer.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600 }}>{customer.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: #{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={14} color="var(--text-muted)" /> {customer.email}
                      </span>
                      <span style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={14} color="var(--text-muted)" /> {customer.phone}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <p style={{ fontSize: '0.9rem' }}>{customer.gender}, {customer.age} yrs</p>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn-outline" style={{ padding: '8px', borderRadius: '8px' }}>
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)}
                        className="btn-outline" 
                        style={{ padding: '8px', borderRadius: '8px', color: 'var(--error)', borderColor: 'rgba(255,51,51,0.2)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
