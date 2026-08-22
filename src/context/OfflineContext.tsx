import React, { createContext, useContext, useState, useEffect } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  toggleSimulatedOffline: () => void;
  isSimulatedOffline: boolean;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline(prev => !prev);
  };

  const isOnline = isBrowserOnline && !isSimulatedOffline;

  return (
    <OfflineContext.Provider value={{ isOnline, toggleSimulatedOffline, isSimulatedOffline }}>
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
