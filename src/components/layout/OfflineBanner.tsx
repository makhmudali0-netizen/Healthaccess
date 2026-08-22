import React from 'react';
import { useOffline } from '../../context/OfflineContext';
import { useLanguage } from '../../context/LanguageContext';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline, isSimulatedOffline, toggleSimulatedOffline } = useOffline();
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {!isOnline && (
        <div className="bg-amber-600 dark:bg-amber-700 text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto w-full">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
            <span className="font-medium">
              🟠 {t('offline.offlineStatus')} — {t('offline.offlineDescription')}
            </span>
          </div>
          <button
            onClick={toggleSimulatedOffline}
            className="text-xs bg-amber-800 hover:bg-amber-900 text-amber-100 px-2.5 py-1 rounded transition shrink-0 ml-2"
          >
            {isSimulatedOffline ? "Simulyatsiyani o'chirish" : "Onlaynga qaytish"}
          </button>
        </div>
      )}
    </div>
  );
};
