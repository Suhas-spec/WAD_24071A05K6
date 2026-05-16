import { createContext, useContext, useState } from 'react';

const WalletContext = createContext(null);

const INITIAL_USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', password: 'alice123', balance: 5000 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', password: 'bob123', balance: 3200 },
];

const INITIAL_TXS = [
  { id: 1, userId: 1, type: 'received', desc: 'Received from Bob Smith', amount: 500, date: '2025-06-01T10:30:00' },
  { id: 2, userId: 1, type: 'sent', desc: 'Sent to Bob Smith', amount: 200, date: '2025-06-03T14:15:00' },
  { id: 3, userId: 2, type: 'sent', desc: 'Sent to Alice Johnson', amount: 500, date: '2025-06-01T10:30:00' },
  { id: 4, userId: 2, type: 'received', desc: 'Received from Alice Johnson', amount: 200, date: '2025-06-03T14:15:00' },
];

export function WalletProvider({ children }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [transactions, setTransactions] = useState(INITIAL_TXS);
  const [currentUser, setCurrentUser] = useState(null);

  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) return { error: 'Email already registered' };
    const newUser = { id: Date.now(), name, email, password, balance: 1000 };
    setUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid email or password' };
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  const transfer = (recipientEmail, amount) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return { error: 'Enter a valid amount' };
    const sender = users.find(u => u.id === currentUser.id);
    const recipient = users.find(u => u.email === recipientEmail);
    if (!recipient) return { error: 'Recipient not found' };
    if (recipient.id === currentUser.id) return { error: 'Cannot transfer to yourself' };
    if (sender.balance < amt) return { error: 'Insufficient balance' };

    setUsers(prev => prev.map(u => {
      if (u.id === sender.id) return { ...u, balance: u.balance - amt };
      if (u.id === recipient.id) return { ...u, balance: u.balance + amt };
      return u;
    }));

    const now = new Date().toISOString();
    setTransactions(prev => [...prev,
      { id: Date.now(), userId: sender.id, type: 'sent', desc: `Sent to ${recipient.name}`, amount: amt, date: now },
      { id: Date.now() + 1, userId: recipient.id, type: 'received', desc: `Received from ${sender.name}`, amount: amt, date: now },
    ]);

    setCurrentUser(prev => ({ ...prev, balance: sender.balance - amt }));
    return { success: true };
  };

  const getBalance = () => {
    const u = users.find(u => u.id === currentUser?.id);
    return u ? u.balance : 0;
  };

  const getUserTransactions = () =>
    transactions
      .filter(t => t.userId === currentUser?.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <WalletContext.Provider value={{ currentUser, users, register, login, logout, transfer, getBalance, getUserTransactions }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
