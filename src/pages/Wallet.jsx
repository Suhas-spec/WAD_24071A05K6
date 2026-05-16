import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Wallet() {
  const { currentUser, getBalance, getUserTransactions } = useWallet();
  const balance = getBalance();
  const txs = getUserTransactions();
  const sent = txs.filter(t => t.type === 'sent').reduce((s, t) => s + t.amount, 0);
  const received = txs.filter(t => t.type === 'received').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content">
        <div className="card card-wide">
          <h2>My Wallet</h2>
          <p className="subtitle">Your financial overview</p>

          <div className="balance-card">
            <div className="balance-label">Available Balance</div>
            <div className="balance-amount">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            <div className="balance-user">👤 {currentUser?.name}</div>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value" style={{ color: '#4ade80' }}>
                ₹{received.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="stat-label">Total Received</div>
            </div>
            <div className="stat-box">
              <div className="stat-value" style={{ color: '#f87171' }}>
                ₹{sent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="stat-label">Total Sent</div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/transfer" className="btn-action purple">💸 Send Money</Link>
            <Link to="/history" className="btn-action blue">📋 View History</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
