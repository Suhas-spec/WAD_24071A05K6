import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Footer from '../components/Footer';

export default function Login() {
  const { login } = useWallet();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('All fields are required');
    const result = login(form.email, form.password);
    if (result.error) return setError(result.error);
    navigate('/wallet');
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to access your wallet</p>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary">Sign In</button>
          </form>
          <p className="link-text" style={{ marginTop: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
            Demo: alice@example.com / alice123
          </p>
          <p className="link-text">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
