import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function History() {
  const { getUserTransactions } = useWallet();
  const [filter, setFilter] = useState('all');
  const txs = getUserTransactions();

  const filtered = filter === 'all' ? txs : txs.filter(t => t.type === filter);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content">
        <div className="card card-wide">
          <h2>Transaction History</h2>
          <p className="subtitle">{txs.length} total transactions</p>

          <div className="filter-bar">
            {['all', 'sent', 'received'].map(f => (
              <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}>
                {f === 'all' ? '🔄 All' : f === 'sent' ? '📤 Sent' : '📥 Received'}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No transactions found</p>
            </div>
          ) : (
            <div className="tx-list">
              {filtered.map(tx => (
                <div key={tx.id} className="tx-item">
                  <div className="tx-left">
                    <div className={`tx-icon ${tx.type}`}>
                      {tx.type === 'sent' ? '📤' : '📥'}
                    </div>
                    <div className="tx-info">
                      <div className="tx-desc">{tx.desc}</div>
                      <div className="tx-date">{formatDate(tx.date)}</div>
                    </div>
                  </div>
                  <div className={`tx-amount ${tx.type}`}>
                    {tx.type === 'sent' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
