import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { QRCodeModal } from '../qr/QRCodeModal';
import {
  HeartPulse,
  Search,
  Globe,
  Sun,
  Moon,
  Bell,
  User,
  Shield,
  MapPin,
  Calendar,
  FileText,
  Users,
  Bot,
  Stethoscope,
  Activity,
  Syringe,
  Menu,
  X,
  QrCode
} from 'lucide-react';
import { GlobalSearchModal } from '../search/GlobalSearchModal';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, loginAsDemo, logout } = useAuth();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Keyboard shortcut Ctrl+K or Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: HeartPulse },
    { id: 'doctorDashboard', label: 'Shifokor Kabineti', icon: Stethoscope },
    { id: 'facilities', label: t('nav.hospitals'), icon: Activity },
    { id: 'bp', label: t('nav.bp'), icon: HeartPulse },
    { id: 'map', label: t('nav.map'), icon: MapPin },
    { id: 'appointments', label: t('nav.appointments'), icon: Calendar },
    { id: 'doctorChat', label: t('nav.doctorChat'), icon: Stethoscope },
    { id: 'firstAid', label: t('nav.firstAid'), icon: Activity },
    { id: 'emr', label: t('nav.medicalRecords'), icon: FileText },
    { id: 'family', label: t('nav.family'), icon: Users },
    { id: 'vaccinations', label: t('nav.vaccinations'), icon: Syringe },
    { id: 'ai', label: t('nav.healthAi'), icon: Bot }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur border-b border-slate-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#dc2626] flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition">
                <HeartPulse className="w-6 h-6 animate-pulse-slow" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
                  Health Access <span className="text-[#dc2626] ml-1">.UZ</span>
                </span>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none">
                  O'zbekiston Milliy Tibbiyot Portali
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.slice(0, 7).map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Quick Controls */}
            <div className="flex items-center space-x-2">
              
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center space-x-2 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition"
              >
                <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Qidiruv...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
                  Ctrl K
                </kbd>
              </button>

              {/* Language Switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setLanguage('uz')}
                  className={`px-2 py-1 text-xs font-bold rounded-md transition ${
                    language === 'uz'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🇺🇿 O'z
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-2 py-1 text-xs font-bold rounded-md transition ${
                    language === 'ru'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🇷🇺 Ру
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? "Yorug' rejim" : "Tungi rejim"}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Notification Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                  )}
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {t('notifications.title')} ({notifications.length})
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                        >
                          {t('notifications.markAllRead')}
                        </button>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">{t('notifications.empty')}</p>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            className={`p-2.5 rounded-xl border text-xs transition ${
                              n.read
                                ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-500'
                                : 'bg-teal-50/60 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <h6 className="font-semibold text-slate-900 dark:text-white">
                              {n.title[language]}
                            </h6>
                            <p className="mt-0.5 text-slate-600 dark:text-slate-300">
                              {n.message[language]}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <img
                      src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt={user?.fullName}
                      className="w-8 h-8 rounded-full object-cover border border-teal-500"
                    />
                  </button>
                ) : (
                  <button
                    onClick={loginAsDemo}
                    className="text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition"
                  >
                    {t('auth.loginAsDemo')}
                  </button>
                )}

                {isProfileMenuOpen && isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.fullName}</p>
                      <p className="text-[10px] text-slate-400">{user?.phone}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-2 mt-1"
                    >
                      <User className="w-3.5 h-3.5 text-teal-600" />
                      <span>{t('nav.profile')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-2"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t('nav.admin')}</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg flex items-center space-x-2 mt-1 border-t border-slate-100 dark:border-slate-800"
                    >
                      <span>{t('auth.logout')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu for extra pages */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    activeTab === item.id
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(type, id) => {
          if (type === 'facility') setActiveTab('facilities');
          if (type === 'doctor') setActiveTab('appointments');
        }}
      />
    </>
  );
};
