import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface SMSMessage {
  id: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'pending' | 'failed';
}

interface SMSNotificationProps {
  recipientPhone?: string;
  recipientName?: string;
}

const SMSNotification = ({ recipientPhone = '', recipientName = '' }: SMSNotificationProps) => {
  const [phone, setPhone] = useState(recipientPhone);
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<SMSMessage[]>([
    {
      id: '1',
      phone: '+7 (999) 123-45-67',
      message: 'Ваш товар готов к выдаче!',
      timestamp: '23.12.2025 14:30',
      status: 'sent',
    },
    {
      id: '2',
      phone: '+7 (999) 876-54-32',
      message: 'К сожалению, ваш товар утерян.',
      timestamp: '22.12.2025 10:15',
      status: 'sent',
    },
  ]);

  const sendSMS = () => {
    if (!phone || !message) {
      alert('Заполните телефон и сообщение');
      return;
    }

    const newMessage: SMSMessage = {
      id: Date.now().toString(),
      phone,
      message,
      timestamp: new Date().toLocaleString('ru-RU'),
      status: 'sent',
    };

    setMessageHistory([newMessage, ...messageHistory]);
    alert(`SMS отправлено на ${phone}`);
    
    const speech = new SpeechSynthesisUtterance(`SMS отправлено получателю ${recipientName || phone}`);
    speech.lang = 'ru-RU';
    window.speechSynthesis.speak(speech);

    setMessage('');
  };

  const quickMessages = [
    'Ваш товар готов к выдаче!',
    'Напоминаем о необходимости забрать товар',
    'К сожалению, ваш товар утерян',
    'Срок хранения истекает через 3 дня',
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Отправить SMS-уведомление</CardTitle>
          <CardDescription>
            {recipientName ? `Получатель: ${recipientName}` : 'Отправка SMS клиентам'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smsPhone">Номер телефона</Label>
            <Input
              id="smsPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="smsMessage">Сообщение</Label>
            <Textarea
              id="smsMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите текст сообщения..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Быстрые шаблоны</Label>
            <div className="grid grid-cols-2 gap-2">
              {quickMessages.map((msg, idx) => (
                <Button
                  key={idx}
                  onClick={() => setMessage(msg)}
                  variant="outline"
                  className="text-xs h-auto py-2"
                >
                  {msg}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={sendSMS} className="w-full bg-black hover:bg-gray-800">
            <Icon name="Send" className="mr-2" size={20} />
            Отправить SMS
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-black">История SMS</CardTitle>
          <CardDescription>Последние отправленные уведомления</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {messageHistory.map((msg) => (
              <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-black">{msg.phone}</p>
                    <p className="text-xs text-gray-600">{msg.timestamp}</p>
                  </div>
                  <Badge
                    variant={
                      msg.status === 'sent'
                        ? 'default'
                        : msg.status === 'failed'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {msg.status === 'sent' && 'Отправлено'}
                    {msg.status === 'pending' && 'В очереди'}
                    {msg.status === 'failed' && 'Ошибка'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">{msg.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SMSNotification;
