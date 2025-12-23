import { User } from '@/pages/Index';
import CashierDashboard from './dashboards/CashierDashboard';
import ClientDashboard from './dashboards/ClientDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

interface DashboardRouterProps {
  user: User;
  onLogout: () => void;
}

const DashboardRouter = ({ user, onLogout }: DashboardRouterProps) => {
  switch (user.role) {
    case 'client':
      return <ClientDashboard user={user} onLogout={onLogout} />;
    case 'cashier':
    case 'head-cashier':
      return <CashierDashboard user={user} onLogout={onLogout} />;
    case 'admin':
    case 'creator':
    case 'nikitovsky':
      return <AdminDashboard user={user} onLogout={onLogout} />;
    default:
      return <div>Неизвестная роль</div>;
  }
};

export default DashboardRouter;
