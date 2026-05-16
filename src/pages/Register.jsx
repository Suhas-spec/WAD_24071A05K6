import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Footer from '../components/Footer';

export default function Register() {
  const { register } = useWallet();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) return setError('All fields are required');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    const result = register(form.name, form.email, form.password);
    if (result.error) return setError(result.error);
    setSuccess('Account created! Redirecting to login...');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <h2>Create Account</h2>
          <p className="subtitle">Join SwiftWallet and manage your money</p>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Min. 6 characters" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Re-enter password" value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary">Create Account</button>
          </form>
          <p className="link-text">Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
