import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { User, UserRole } from '@/pages/Index';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const PASSWORDS: Record<UserRole, string> = {
  cashier: '25',
  'head-cashier': '202520',
  admin: '2025',
  creator: '202505',
  nikitovsky: '20252025',
  client: '',
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [nikitovskiyLockout, setNikitovskiyLockout] = useState<number | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setUsername('');
    setPassword('');
    setAttempts(0);
  };

  const handleLogin = () => {
    if (lockoutTime && Date.now() < lockoutTime) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      alert(`Вход заблокирован. Осталось ${remaining} секунд`);
      return;
    }

    if (!selectedRole) return;

    if (selectedRole === 'client') {
      if (username.trim()) {
        onLogin({ role: 'client', username });
      } else {
        alert('Введите номер телефона');
      }
      return;
    }

    if (selectedRole === 'nikitovsky') {
      if (password === PASSWORDS.nikitovsky) {
        onLogin({ role: 'nikitovsky', username: 'Никитовский' });
      } else {
        alert('Неверный пароль');
        setAttempts(0);
        setPassword('');
        setSelectedRole(null);
      }
      return;
    }

    if (password === PASSWORDS[selectedRole] && username.trim()) {
      onLogin({ role: selectedRole, username });
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLockoutTime(Date.now() + 90000);
        alert('Превышено количество попыток. Вход заблокирован на 90 секунд');
        setAttempts(0);
        setPassword('');
        setSelectedRole(null);
      } else {
        alert(`Неверные данные. Попытка ${newAttempts} из 3`);
        setPassword('');
        setSelectedRole(null);
      }
    }
  };

  const handleNikitovskiyBlock = () => {
    setNikitovskiyLockout(Date.now() + 7200000);
    alert('Вход в Никитовский заблокирован на 2 часа');
  };

  const unlockNikitovskiy = () => {
    const unlockPassword = prompt('Введите пароль разблокировки:');
    if (unlockPassword === '2025') {
      setNikitovskiyLockout(null);
      alert('Блокировка снята');
    } else {
      alert('Неверный пароль');
    }
  };

  const isNikitovskiyBlocked = nikitovskiyLockout && Date.now() < nikitovskiyLockout;

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white border-2 border-gray-300">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-black mb-2">
              Система управления QR-документами
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Выберите тип входа
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => handleRoleSelect('cashier')}
              variant="outline"
              className="w-full h-16 text-lg border-2 border-black hover:bg-gray-100 text-black"
            >
              <Icon name="Calculator" className="mr-2" size={24} />
              Кассир
            </Button>
            <Button
              onClick={() => handleRoleSelect('head-cashier')}
              variant="outline"
              className="w-full h-16 text-lg border-2 border-black hover:bg-gray-100 text-black"
            >
              <Icon name="BadgeCheck" className="mr-2" size={24} />
              Главный кассир
            </Button>
            <Button
              onClick={() => handleRoleSelect('admin')}
              variant="outline"
              className="w-full h-16 text-lg border-2 border-black hover:bg-gray-100 text-black"
            >
              <Icon name="Shield" className="mr-2" size={24} />
              Администратор
            </Button>
            <Button
              onClick={() => handleRoleSelect('creator')}
              variant="outline"
              className="w-full h-16 text-lg border-2 border-black hover:bg-gray-100 text-black"
            >
              <Icon name="Crown" className="mr-2" size={24} />
              Создатель
            </Button>
            <Button
              onClick={() => {
                if (isNikitovskiyBlocked) {
                  const remaining = Math.ceil((nikitovskiyLockout! - Date.now()) / 60000);
                  alert(`Вход заблокирован. Осталось ${remaining} минут`);
                } else {
                  handleRoleSelect('nikitovsky');
                }
              }}
              variant="outline"
              className="w-full h-16 text-lg border-2 border-black hover:bg-gray-100 text-black"
            >
              <Icon name="Sparkles" className="mr-2" size={24} />
              Никитовский
            </Button>
            <Button
              onClick={handleNikitovskiyBlock}
              variant="ghost"
              className="w-full h-12 text-sm text-gray-500 hover:bg-gray-100"
            >
              Вход в Никитовский без пароля
            </Button>
            {isNikitovskiyBlocked && (
              <Button
                onClick={unlockNikitovskiy}
                variant="ghost"
                className="w-full h-10 text-xs text-gray-400 hover:bg-gray-100"
              >
                Разблокировать (введите пароль)
              </Button>
            )}
            <Button
              onClick={() => handleRoleSelect('client')}
              variant="default"
              className="w-full h-16 text-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Icon name="User" className="mr-2" size={24} />
              Вход для клиента
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      selectedRole === 'client' ? 'bg-blue-500' : 'bg-black'
    }`}>
      <Card className={`w-full max-w-md ${
        selectedRole === 'client' ? 'bg-white' : 'bg-white border-2 border-gray-300'
      }`}>
        <CardHeader>
          <Button
            onClick={() => setSelectedRole(null)}
            variant="ghost"
            className="mb-4 text-gray-600"
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад
          </Button>
          <CardTitle className="text-2xl text-black">
            {selectedRole === 'client' ? 'Вход для клиента' : 'Вход в систему'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {selectedRole === 'client' 
              ? 'Введите номер телефона' 
              : selectedRole === 'nikitovsky'
              ? 'Введите пароль'
              : 'Введите имя и пароль'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedRole !== 'nikitovsky' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">
                {selectedRole === 'client' ? 'Номер телефона' : 'Имя пользователя'}
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={selectedRole === 'client' ? '+7 (___) ___-__-__' : 'Введите имя'}
                className="border-2 border-gray-300"
              />
            </div>
          )}
          {selectedRole !== 'client' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-2 border-gray-300"
              />
            </div>
          )}
          <Button
            onClick={handleLogin}
            className={`w-full h-12 text-lg ${
              selectedRole === 'client' 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-black hover:bg-gray-800 text-white'
            }`}
          >
            Войти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
