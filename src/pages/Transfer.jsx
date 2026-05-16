import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Transfer() {
  const { transfer, getBalance, users, currentUser } = useWallet();
  const [form, setForm] = useState({ email: '', amount: '', note: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    setTimeout(() => {
      const result = transfer(form.email, form.amount);
      setLoading(false);
      if (result.error) return setError(result.error);
      setSuccess(`₹${parseFloat(form.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} sent successfully!`);
      setForm({ email: '', amount: '', note: '' });
    }, 600);
  };

  const recipients = users.filter(u => u.id !== currentUser?.id);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content">
        <div className="card">
          <h2>Send Money</h2>
          <p className="subtitle">Transfer funds instantly</p>

          <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Available Balance</span>
            <span style={{ fontWeight: 700, color: '#a78bfa' }}>
              ₹{getBalance().toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">✅ {success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Recipient</label>
              <select value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}>
                <option value="">Select recipient</option>
                {recipients.map(u => (
                  <option key={u.id} value={u.email}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Amount (₹)</label>
              <input type="number" placeholder="0.00" min="1" step="0.01" value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Note (optional)</label>
              <input type="text" placeholder="What's this for?" value={form.note}
                onChange={e => setForm({ ...form, note: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Processing...' : '💸 Send Money'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
