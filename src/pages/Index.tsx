import { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import DashboardRouter from '@/components/DashboardRouter';

export type UserRole = 'cashier' | 'head-cashier' | 'admin' | 'creator' | 'nikitovsky' | 'client';

export interface User {
  role: UserRole;
  username: string;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardRouter user={currentUser} onLogout={handleLogout} />;
};

export default Index;
