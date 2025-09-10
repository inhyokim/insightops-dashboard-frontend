import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { api } from '../api/axios';
import { cn } from '../utils/cn';

export const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      await api.get('/api/dashboard/overview?period=daily');
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    // 30초마다 연결 상태 확인
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return (
      <div className="flex items-center text-gray-500 text-sm">
        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        연결 상태 확인 중...
      </div>
    );
  }

  return (
    <div className="flex items-center text-sm">
      <button
        onClick={checkConnection}
        disabled={isChecking}
        className={cn(
          "flex items-center px-3 py-1 rounded-full transition-colors",
          isConnected
            ? "text-green-700 bg-green-100 hover:bg-green-200"
            : "text-red-700 bg-red-100 hover:bg-red-200",
          isChecking && "opacity-50 cursor-not-allowed"
        )}
      >
        {isChecking ? (
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        ) : isConnected ? (
          <Wifi className="h-4 w-4 mr-2" />
        ) : (
          <WifiOff className="h-4 w-4 mr-2" />
        )}
        {isConnected ? '백엔드 연결됨' : '백엔드 연결 실패'}
      </button>
    </div>
  );
};
