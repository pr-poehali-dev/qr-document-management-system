import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface QRScannerProps {
  onScan: (qrCode: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScan, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrCodeRegionId = 'qr-reader';

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      const html5QrCode = new Html5Qrcode(qrCodeRegionId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        () => {}
      );
      setIsScanning(true);
    } catch (err) {
      alert('Не удалось запустить камеру. Проверьте разрешения.');
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-black">Сканирование QR-кода</CardTitle>
          <CardDescription>Наведите камеру на QR-код</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            id={qrCodeRegionId}
            className="w-full rounded-lg overflow-hidden"
            style={{ minHeight: '300px' }}
          />
          
          <div className="flex gap-2">
            {!isScanning ? (
              <Button onClick={startScanning} className="flex-1 bg-black hover:bg-gray-800">
                <Icon name="Camera" className="mr-2" size={20} />
                Запустить камеру
              </Button>
            ) : (
              <Button onClick={stopScanning} className="flex-1 bg-red-500 hover:bg-red-600">
                <Icon name="StopCircle" className="mr-2" size={20} />
                Остановить
              </Button>
            )}
            <Button onClick={onClose} variant="outline" className="flex-1">
              Закрыть
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
