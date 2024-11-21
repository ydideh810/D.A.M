'use client';

import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@getalby/bitcoin-connect-react';

interface BitcoinConnectProps {
  onConnect: () => void;
}

export function BitcoinConnect({ onConnect }: BitcoinConnectProps) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.webln) {
        try {
          await window.webln.enable();
          setIsConnected(true);
          onConnect();
        } catch (error) {
          console.warn('Wallet connection failed:', error);
        }
      }
    };

    checkConnection();
  }, [onConnect]);

  const handleConnect = () => {
    setIsConnected(true);
    onConnect();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {!isConnected ? (
        <Button 
          onConnect={handleConnect}
          className="w-full py-2 border border-[#ff0000] text-[#ff0000] font-mono hover:bg-[#ff0000]/10 flex items-center justify-center gap-2"
        >
          <Wallet size={16} />
          Connect Wallet
        </Button>
      ) : (
        <div className="text-[#ff0000] flex items-center gap-2">
          <Wallet size={16} />
          Connected
        </div>
      )}
      <div className="text-[#ff0000]/70 text-xs">
        573 sats per command
      </div>
    </div>
  );
}