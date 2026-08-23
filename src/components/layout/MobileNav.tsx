import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HeartPulse, Search, MapPin, FileText, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'home', label: t('nav.home'), icon: HeartPulse },
    { id: 'bp', label: t('nav.bp'), icon: HeartPulse },
    { id: 'facilities', label: t('nav.search'), icon: Search },
    { id: 'emr', label: 'Health', icon: FileText },
    { id: 'profile', label: t('nav.profile'), icon: User }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur border-t border-slate-200 dark:border-neutral-800 py-1.5 px-2">
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
