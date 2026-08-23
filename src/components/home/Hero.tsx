import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  PhoneCall,
  Activity,
  Building2,
  Pill,
  Calendar,
  Stethoscope,
  Bot,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, onSearchSubmit }) => {
  const { t, language } = useLanguage();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  const quickActions = [
    {
      id: 'firstAid',
      title: t('actions.firstAid'),
      icon: Activity,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900',
      badge: 'Shoshilinch'
    },
    {
      id: 'facilities',
      title: t('actions.findHospital'),
      icon: Building2,
      color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900',
      badge: '24/7'
    },
    {
      id: 'facilities',
      title: t('actions.findPharmacy'),
      icon: Pill,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900',
      badge: 'Dorilar'
    },
    {
      id: 'appointments',
      title: t('actions.bookAppointment'),
      icon: Calendar,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
      badge: 'Onlayn'
    },
    {
      id: 'doctorChat',
      title: t('actions.talkToDoctor'),
      icon: Stethoscope,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900',
      badge: 'Video/Chat'
    },
    {
      id: 'ai',
      title: t('actions.healthAi'),
      icon: Bot,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900',
      badge: 'AI Chat'
    }
  ];

  const exampleQueries = language === 'uz'
    ? ["Qorin og‘riganda nima qilish kerak?", "Toshkent shahridagi 24/7 shifoxonalar", "Bolalarda emlash jadvali", "Burun qonashi birinchi yordam"]
    : ["Что делать при боли в животе?", "Круглосуточные больницы в Ташкенте", "Календарь прививок для детей", "Первая помощь при носовом кровотечении"];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/80 via-white to-slate-50 dark:from-black dark:via-black dark:to-black pt-8 pb-12 border-b border-slate-200/80 dark:border-neutral-800">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-teal-400/10 dark:bg-teal-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Top Emergency Hotline Banner */}
        <div className="flex items-center justify-between bg-rose-600 text-white rounded-2xl p-3 sm:p-4 shadow-lg shadow-rose-600/20 mb-8 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Shoshilinch Tibbiy Yordam — 103
              </h3>
              <p className="text-xs text-rose-100 hidden sm:block">
                Hayot uchun xavfli alomatlar bo'lsa darhol bepul 103 raqamiga qo'ng'iroq qiling!
              </p>
            </div>
          </div>
          <a
            href="tel:103"
            className="bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow shrink-0 flex items-center space-x-1"
          >
            <span>Qo'ng'iroq (103)</span>
          </a>
        </div>

        {/* Hero Main Content */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-4 border border-rose-200 dark:border-rose-800">
            <ShieldCheck className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>O'zbekiston bo'yicha yagona sog'liqni saqlash ekotizimi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {t('hero.headline')}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-8 relative max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <Search className="w-6 h-6 text-teal-600 dark:text-teal-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                className="w-full py-4 pl-3 pr-28 text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none text-sm sm:text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm px-5 rounded-xl transition flex items-center space-x-1"
              >
                <span>Qidirish</span>
              </button>
            </div>

            {/* Example Queries */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              {exampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSearchInput(query);
                    onSearchSubmit(query);
                  }}
                  className="bg-white/80 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 transition text-[11px]"
                >
                  {query}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Quick Actions Grid */}
        <div className="mt-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-4 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 mr-1 text-teal-500" /> {t('hero.quickActions')}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <div
                  key={action.title}
                  onClick={() => setActiveTab(action.id)}
                  className={`p-4 rounded-2xl border bg-white dark:bg-slate-800/90 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col items-center text-center relative ${action.color}`}
                >
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                    {action.badge}
                  </span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6 stroke-[2.2px]" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                    {action.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
