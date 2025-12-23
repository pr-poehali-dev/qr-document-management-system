import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';
import { Badge } from '@/components/ui/badge';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [newClient, setNewClient] = useState({ name: '', phone: '', password: '' });
  const [smsData, setSmsData] = useState({ phone: '', message: '' });
  const [archivePassword, setArchivePassword] = useState('');
  const [showArchive, setShowArchive] = useState(false);

  const handleCreateClient = () => {
    if (!newClient.name || !newClient.phone) {
      alert('Заполните имя и телефон клиента');
      return;
    }
    alert(`Клиент ${newClient.name} создан!`);
    setNewClient({ name: '', phone: '', password: '' });
  };

  const handleSendSMS = () => {
    if (!smsData.phone || !smsData.message) {
      alert('Заполните телефон и сообщение');
      return;
    }
    alert(`SMS отправлено на ${smsData.phone}`);
    setSmsData({ phone: '', message: '' });
  };

  const handleArchiveAccess = () => {
    if (archivePassword === '202505') {
      setShowArchive(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const getRoleBadge = () => {
    switch (user.role) {
      case 'cashier':
        return <Badge variant="secondary">Кассир</Badge>;
      case 'head-cashier':
        return <Badge variant="default">Главный кассир</Badge>;
      case 'admin':
        return <Badge variant="default">Администратор</Badge>;
      case 'creator':
        return <Badge className="bg-yellow-500">Создатель</Badge>;
      case 'nikitovsky':
        return <Badge className="bg-purple-500">Никитовский</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-black">Панель управления</h1>
              <p className="text-gray-600">{user.username}</p>
            </div>
            {getRoleBadge()}
          </div>
          <Button onClick={onLogout} variant="outline">
            <Icon name="LogOut" className="mr-2" size={20} />
            Выход
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="main" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-4">
            <TabsTrigger value="main">Главная</TabsTrigger>
            <TabsTrigger value="cashier">Касса</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="archive">Архив</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="cashier">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Приём документов</CardTitle>
                  <CardDescription>Быстрый доступ к приёму и выдаче документов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="h-24 text-lg bg-black hover:bg-gray-800">
                      <Icon name="PackagePlus" className="mr-2" size={32} />
                      Принять документ
                    </Button>
                    <Button className="h-24 text-lg bg-black hover:bg-gray-800">
                      <Icon name="PackageMinus" className="mr-2" size={32} />
                      Выдать документ
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>QR-код</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Введите или сканируйте QR" className="text-lg" />
                      <Button variant="outline">
                        <Icon name="Shuffle" size={20} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Последние операции</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-black">QR-045 - Паспорт</p>
                        <p className="text-sm text-gray-600">Клиент: Иванов И.И.</p>
                      </div>
                      <Badge className="bg-green-500">Принят</Badge>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-black">QR-042 - Фото</p>
                        <p className="text-sm text-gray-600">Клиент: Петров П.П.</p>
                      </div>
                      <Badge className="bg-blue-500">Выдан</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="main">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Всего документов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-black">247</p>
                  <p className="text-sm text-gray-600">На хранении</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Клиенты</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-black">89</p>
                  <p className="text-sm text-gray-600">Зарегистрировано</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Готовы к выдаче</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-green-600">12</p>
                  <p className="text-sm text-gray-600">Документов</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-black">Категории хранения</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-black">📄 Документы</span>
                    <Badge>45 / 100</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-black">📸 Фото</span>
                    <Badge>32 / 100</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-black">💳 Карты</span>
                    <Badge>28 / 100</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium text-black">📦 Другое</span>
                    <Badge variant="secondary">142</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Создание нового клиента</CardTitle>
                <CardDescription>Зарегистрируйте клиента в системе</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Имя и фамилия</Label>
                  <Input
                    id="clientName"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Номер телефона</Label>
                  <Input
                    id="clientPhone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientPassword">Пароль (опционально)</Label>
                  <Input
                    id="clientPassword"
                    value={newClient.password}
                    onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                    placeholder="Оставьте пустым для входа только по номеру"
                  />
                </div>

                <Button onClick={handleCreateClient} className="w-full bg-black hover:bg-gray-800">
                  <Icon name="UserPlus" className="mr-2" size={20} />
                  Создать клиента
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Отправка SMS-уведомлений</CardTitle>
                <CardDescription>Доступно только для администратора и создателя</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smsPhone">Номер телефона клиента</Label>
                  <Input
                    id="smsPhone"
                    value={smsData.phone}
                    onChange={(e) => setSmsData({ ...smsData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smsMessage">Сообщение</Label>
                  <Input
                    id="smsMessage"
                    value={smsData.message}
                    onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                    placeholder="Ваш документ готов к выдаче"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setSmsData({ ...smsData, message: 'Ваш товар готов к выдаче!' })}
                    variant="outline"
                    className="flex-1"
                  >
                    Готов к выдаче
                  </Button>
                  <Button
                    onClick={() => setSmsData({ ...smsData, message: 'К сожалению, ваш товар утерян.' })}
                    variant="outline"
                    className="flex-1"
                  >
                    Утерян
                  </Button>
                </div>

                <Button onClick={handleSendSMS} className="w-full bg-black hover:bg-gray-800">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить SMS
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archive">
            {!showArchive ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Доступ к архиву</CardTitle>
                  <CardDescription>Введите пароль для просмотра архива</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="archivePassword">Пароль архива</Label>
                    <Input
                      id="archivePassword"
                      type="password"
                      value={archivePassword}
                      onChange={(e) => setArchivePassword(e.target.value)}
                      placeholder="202505"
                    />
                  </div>
                  <Button onClick={handleArchiveAccess} className="w-full bg-black hover:bg-gray-800">
                    <Icon name="Lock" className="mr-2" size={20} />
                    Открыть архив
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Архив документов</CardTitle>
                  <CardDescription>Все документы хранятся бессрочно</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-4 border rounded hover:bg-gray-50">
                      <div className="flex justify-between">
                        <span className="font-medium text-black">QR-001 - Паспорт</span>
                        <span className="text-sm text-gray-600">20.12.2025</span>
                      </div>
                      <p className="text-sm text-gray-600">Клиент: Иван Иванов</p>
                    </div>
                    <div className="p-4 border rounded hover:bg-gray-50">
                      <div className="flex justify-between">
                        <span className="font-medium text-black">QR-002 - Фото</span>
                        <span className="text-sm text-gray-600">15.12.2025</span>
                      </div>
                      <p className="text-sm text-gray-600">Клиент: Петр Петров</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Настройки системы</CardTitle>
                <CardDescription>
                  {user.role === 'nikitovsky' 
                    ? 'Полный доступ ко всем настройкам' 
                    : 'Доступные настройки для вашей роли'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Users" className="mr-2" size={20} />
                  Управление ролями
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="CreditCard" className="mr-2" size={20} />
                  Скидочные карты
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Ban" className="mr-2" size={20} />
                  Блокировка пользователей
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Settings" className="mr-2" size={20} />
                  Настройки сайта
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;