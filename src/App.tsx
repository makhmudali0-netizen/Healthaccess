import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { OfflineProvider, useOffline } from './context/OfflineContext';

import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { OfflineBanner } from './components/layout/OfflineBanner';
import { SMSToast } from './components/layout/SMSToast';

import { Hero } from './components/home/Hero';
import { MyHealthWidget } from './components/home/MyHealthWidget';
import { NearbyMapPreview } from './components/home/NearbyMapPreview';

import { FacilityDirectory } from './components/facilities/FacilityDirectory';
import { InteractiveMap } from './components/map/InteractiveMap';
import { AppointmentsList } from './components/appointments/AppointmentsList';
import { FirstAidCenter } from './components/firstaid/FirstAidCenter';
import { HealthAIChat } from './components/ai/HealthAIChat';
import { DoctorConsultation } from './components/doctor/DoctorConsultation';
import { MedicalRecordsView } from './components/emr/MedicalRecordsView';
import { FamilyHealthView } from './components/family/FamilyHealthView';
import { VaccinationSchedule } from './components/vaccination/VaccinationSchedule';
import { UserProfileView } from './components/profile/UserProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Facility } from './types';
import { HeartPulse, ShieldCheck, Wifi, WifiOff } from 'lucide-react';

import { useAuth } from './context/AuthContext';
import { AuthGateModal } from './components/auth/AuthGateModal';

const MainAppContent: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { isSimulatedOffline, toggleSimulatedOffline } = useOffline();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBookingFacility, setSelectedBookingFacility] = useState<Facility | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(false);

  // Mobile & Browser Back Button Navigation Handler
  const changeTab = (tab: string) => {
    if (tab !== activeTab) {
      window.history.pushState({ tab }, '', `#${tab}`);
      setActiveTab(tab);
    }
  };

  React.useEffect(() => {
    // Set initial state
    window.history.replaceState({ tab: 'home' }, '', '#home');

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab);
      } else {
        if (activeTab !== 'home') {
          setActiveTab('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 transition-colors pb-16 lg:pb-0">

      {/* Mandatory Registration / Login Gatekeeper Modal before accessing app */}
      {!isAuthenticated && (
        <AuthGateModal onSuccess={() => setActiveTab('home')} />
      )}

      {/* Offline Alert Banner */}
      <OfflineBanner />

      {/* Simulated SMS Notification Alert Toast Overlay */}
      <SMSToast />

      {/* Header Navigation */}
      <Header activeTab={activeTab} setActiveTab={changeTab} />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <Hero
              setActiveTab={changeTab}
              onSearchSubmit={q => {
                changeTab('facilities');
              }}
            />
            <MyHealthWidget setActiveTab={changeTab} />
            <NearbyMapPreview setActiveTab={changeTab} />
          </div>
        )}

        {activeTab === 'facilities' && (
          <FacilityDirectory
            onSelectFacilityForAppointment={fac => {
              setSelectedBookingFacility(fac);
              changeTab('appointments');
            }}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMap
            onBookAppointment={facId => {
              changeTab('appointments');
            }}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsList />
        )}

        {activeTab === 'firstAid' && (
          <FirstAidCenter />
        )}

        {activeTab === 'ai' && (
          <HealthAIChat onNavigateToTab={tab => changeTab(tab)} />
        )}

        {activeTab === 'doctorChat' && (
          <DoctorConsultation />
        )}

        {activeTab === 'emr' && (
          <MedicalRecordsView />
        )}

        {activeTab === 'family' && (
          <FamilyHealthView />
        )}

        {activeTab === 'vaccinations' && (
          <VaccinationSchedule />
        )}

        {activeTab === 'profile' && (
          <UserProfileView />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-slate-400 border-t border-neutral-800/80 py-10 px-4 sm:px-6 lg:px-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <HeartPulse className="w-5 h-5 text-rose-500 animate-pulse" />
              <span>Health Access .UZ</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              O'zbekiston Milliy Tibbiyot Portali. Shifoxona va dorixonalar, birinchi yordam va elektron medkarta tizimi.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>SSL Shifrlangan & Maxfiy</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Tezkor Havolalar</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('facilities')} className="hover:text-teal-400">Shifoxonalar katalogi</button></li>
              <li><button onClick={() => setActiveTab('map')} className="hover:text-teal-400">Interaktiv Xarita</button></li>
              <li><button onClick={() => setActiveTab('firstAid')} className="hover:text-teal-400">Birinchi yordam</button></li>
              <li><button onClick={() => setActiveTab('ai')} className="hover:text-teal-400">Health AI Yordamchi</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Shoshilinch Xizmatlar</h4>
            <ul className="space-y-2">
              <li className="font-bold text-rose-400">🚑 103 — Tez Tibbiy Yordam</li>
              <li className="font-bold text-amber-400">🚒 101 — Yong'in Xavfsizligi</li>
              <li className="font-bold text-blue-400">🚔 102 — Ichki Ishlar</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">PWA & Oflayn Rejim</h4>
            <p className="text-slate-400 leading-relaxed mb-3">
              Ilovani telefoningizga o'rnatib, birinchi yordam ma'lumotlaridan oflayn foydalanishingiz mumkin.
            </p>
            <button
              onClick={toggleSimulatedOffline}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                isSimulatedOffline
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-slate-200 border-neutral-800'
              }`}
            >
              {isSimulatedOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
              <span>{isSimulatedOffline ? "Oflayn rejim faol (Test)" : "Oflayn rejimni sinash"}</span>
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <p>© 2026 Health Access Uzbekistan. Barcha huquqlar himoyalangan.</p>
          <p>Toshkent sh., Yunusobod tumani</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={changeTab} />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <OfflineProvider>
              <MainAppContent />
            </OfflineProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
