import { NavLink, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

export default function Navbar() {
  const { currentUser, logout } = useWallet();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <NavLink to="/wallet" className="logo">💳 SwiftWallet</NavLink>
      {currentUser && (
        <nav>
          <NavLink to="/wallet">Balance</NavLink>
          <NavLink to="/transfer">Transfer</NavLink>
          <NavLink to="/history">History</NavLink>
        </nav>
      )}
      {currentUser && (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
}
