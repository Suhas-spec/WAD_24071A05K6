import { Navigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useWallet();
  return currentUser ? children : <Navigate to="/login" replace />;
}
