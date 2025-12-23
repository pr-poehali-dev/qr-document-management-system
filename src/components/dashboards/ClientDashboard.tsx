import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';
import { Badge } from '@/components/ui/badge';

interface ClientDashboardProps {
  user: User;
  onLogout: () => void;
}

interface Item {
  id: string;
  name: string;
  category: string;
  depositDate: string;
  returnDate: string;
  depositAmount: number;
  returnAmount: number;
  status: 'stored' | 'ready' | 'lost';
}

const ClientDashboard = ({ user, onLogout }: ClientDashboardProps) => {
  const [items] = useState<Item[]>([
    {
      id: 'QR-001',
      name: 'Паспорт',
      category: 'Документы',
      depositDate: '2025-12-20',
      returnDate: '2025-12-25',
      depositAmount: 100,
      returnAmount: 50,
      status: 'stored',
    },
    {
      id: 'QR-002',
      name: 'Фотографии семейные',
      category: 'Фото',
      depositDate: '2025-12-15',
      returnDate: '2025-12-30',
      depositAmount: 200,
      returnAmount: 100,
      status: 'ready',
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Мои документы</h1>
            <p className="text-blue-100">Клиент: {user.username}</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Icon name="LogOut" className="mr-2" size={20} />
            Выход
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className="bg-white hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-black">{item.name}</CardTitle>
                  <Badge
                    variant={
                      item.status === 'ready'
                        ? 'default'
                        : item.status === 'lost'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {item.status === 'stored' && 'На хранении'}
                    {item.status === 'ready' && 'Готов к выдаче'}
                    {item.status === 'lost' && 'Утерян'}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600">{item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-black">
                  <div className="flex justify-between">
                    <span className="text-gray-600">QR-код:</span>
                    <span className="font-mono font-bold">{item.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Дата сдачи:</span>
                    <span>{item.depositDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Забрать до:</span>
                    <span>{item.returnDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Оплачено:</span>
                    <span>{item.depositAmount} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">К оплате:</span>
                    <span className="font-bold text-blue-600">{item.returnAmount} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedItem(null)}
          >
            <Card
              className="w-full max-w-md bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-black">QR-код для получения</CardTitle>
                <CardDescription className="text-gray-600">{selectedItem.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-white border-4 border-black rounded-lg flex items-center justify-center mb-4">
                      <span className="text-6xl font-mono font-bold text-black">
                        {selectedItem.id.split('-')[1]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Покажите этот код кассиру</p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Закрыть
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
