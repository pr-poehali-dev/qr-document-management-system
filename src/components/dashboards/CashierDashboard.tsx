import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CashierDashboardProps {
  user: User;
  onLogout: () => void;
}

const CashierDashboard = ({ user, onLogout }: CashierDashboardProps) => {
  const [qrNumber, setQrNumber] = useState('');
  const [itemData, setItemData] = useState({
    name: '',
    clientName: '',
    clientSurname: '',
    clientPhone: '',
    clientEmail: '',
    category: 'documents',
    returnDate: '',
    depositAmount: '',
    returnAmount: '',
  });

  const generateQR = () => {
    const newQR = `QR-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    setQrNumber(newQR);
    alert(`QR-код сгенерирован: ${newQR}`);
  };

  const handleAccept = () => {
    if (!itemData.name || !itemData.clientName || !itemData.clientPhone) {
      alert('Заполните обязательные поля: Название, ФИО, Телефон');
      return;
    }
    alert(`Документ принят! QR: ${qrNumber}`);
    const speech = new SpeechSynthesisUtterance(`Принят документ номер ${qrNumber.split('-')[1]}`);
    speech.lang = 'ru-RU';
    window.speechSynthesis.speak(speech);
  };

  const handleReturn = () => {
    if (!qrNumber) {
      alert('Введите QR-код');
      return;
    }
    alert(`Документ ${qrNumber} выдан`);
    const speech = new SpeechSynthesisUtterance(`Выдан документ номер ${qrNumber.split('-')[1]}`);
    speech.lang = 'ru-RU';
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-black">Панель кассира</h1>
            <p className="text-gray-600">
              {user.role === 'head-cashier' ? 'Главный кассир' : 'Кассир'}: {user.username}
            </p>
          </div>
          <Button onClick={onLogout} variant="outline">
            <Icon name="LogOut" className="mr-2" size={20} />
            Выход
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="accept" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="accept">Приём документов</TabsTrigger>
            <TabsTrigger value="return">Выдача документов</TabsTrigger>
          </TabsList>

          <TabsContent value="accept">
            <Card>
              <CardHeader>
                <CardTitle>Приём нового документа</CardTitle>
                <CardDescription>Заполните анкету для приёма документа на хранение</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qr">QR-код</Label>
                    <div className="flex gap-2">
                      <Input
                        id="qr"
                        value={qrNumber}
                        onChange={(e) => setQrNumber(e.target.value)}
                        placeholder="QR-001"
                      />
                      <Button onClick={generateQR} variant="outline">
                        <Icon name="Shuffle" size={20} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select
                      value={itemData.category}
                      onValueChange={(value) => setItemData({ ...itemData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="documents">Документы (100 шт)</SelectItem>
                        <SelectItem value="photos">Фото (100 шт)</SelectItem>
                        <SelectItem value="cards">Карты (100 шт)</SelectItem>
                        <SelectItem value="other">Другое (∞)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemName">Название предмета *</Label>
                    <Input
                      id="itemName"
                      value={itemData.name}
                      onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
                      placeholder="Паспорт РФ"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientName">Имя клиента *</Label>
                    <Input
                      id="clientName"
                      value={itemData.clientName}
                      onChange={(e) => setItemData({ ...itemData, clientName: e.target.value })}
                      placeholder="Иван"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientSurname">Фамилия клиента *</Label>
                    <Input
                      id="clientSurname"
                      value={itemData.clientSurname}
                      onChange={(e) => setItemData({ ...itemData, clientSurname: e.target.value })}
                      placeholder="Иванов"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Телефон *</Label>
                    <Input
                      id="clientPhone"
                      value={itemData.clientPhone}
                      onChange={(e) => setItemData({ ...itemData, clientPhone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={itemData.clientEmail}
                      onChange={(e) => setItemData({ ...itemData, clientEmail: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="returnDate">Дата возврата</Label>
                    <Input
                      id="returnDate"
                      type="date"
                      value={itemData.returnDate}
                      onChange={(e) => setItemData({ ...itemData, returnDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Оплата при сдаче (₽)</Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      value={itemData.depositAmount}
                      onChange={(e) => setItemData({ ...itemData, depositAmount: e.target.value })}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="returnAmount">Оплата при получении (₽)</Label>
                    <Input
                      id="returnAmount"
                      type="number"
                      value={itemData.returnAmount}
                      onChange={(e) => setItemData({ ...itemData, returnAmount: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAccept} className="flex-1 bg-black hover:bg-gray-800">
                    <Icon name="Check" className="mr-2" size={20} />
                    Принять документ
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Icon name="Printer" className="mr-2" size={20} />
                    Печать анкеты
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="return">
            <Card>
              <CardHeader>
                <CardTitle>Выдача документа</CardTitle>
                <CardDescription>Сканируйте QR-код клиента для выдачи</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="returnQr">QR-код получателя</Label>
                  <Input
                    id="returnQr"
                    value={qrNumber}
                    onChange={(e) => setQrNumber(e.target.value)}
                    placeholder="Введите или сканируйте QR"
                    className="text-lg"
                  />
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2 text-black">Информация о документе</h3>
                  <p className="text-gray-600 text-sm">
                    Введите QR-код для отображения информации
                  </p>
                </div>

                <Button onClick={handleReturn} className="w-full bg-black hover:bg-gray-800">
                  <Icon name="Package" className="mr-2" size={20} />
                  Выдать документ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CashierDashboard;
