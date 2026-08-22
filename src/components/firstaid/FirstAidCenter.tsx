import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { FirstAidArticle } from '../../types';
import {
  HeartPulse,
  Search,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  PhoneCall,
  Activity,
  Flame,
  Droplet
} from 'lucide-react';

export const FirstAidCenter: React.FC = () => {
  const { t, language } = useLanguage();
  const articles = dbService.getFirstAidArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<FirstAidArticle>(articles[0]);

  const lowerQuery = searchQuery.toLowerCase().trim();

  const categories = [
    { id: 'all', label: { uz: "Barchasi", ru: "Все" } },
    { id: 'Shoshilinch holatlar', label: { uz: "🚨 Shoshilinch", ru: "🚨 Экстренные" } },
    { id: 'Yurak va qon tomir', label: { uz: "❤️ Yurak va Qon", ru: "❤️ Сердце и кровь" } },
    { id: 'Zaharlanish', label: { uz: "🧪 Zaharlanish", ru: "🧪 Отравления" } },
    { id: 'Travma va jarohatlar', label: { uz: "🩹 Jarohatlar", ru: "🩹 Травмы" } }
  ];

  const filteredArticles = articles.filter(a => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = !lowerQuery || (
      a.title[language].toLowerCase().includes(lowerQuery) ||
      a.symptoms[language].some(s => s.toLowerCase().includes(lowerQuery))
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
          <HeartPulse className="w-8 h-8 mr-3 text-rose-600 dark:text-rose-500 shrink-0" />
          <span>{t('firstAid.title')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          O'tkir alomatlar, kasalliklar va maishiy shoshilinch holatlarda birinchi tibbiy yordam yo'riqnomasi
        </p>
      </div>

      {/* Mandatory Safety & Non-Diagnosis Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider">
            {t('firstAid.disclaimerTitle')}
          </h3>
        </div>
        <p className="text-xs text-amber-900 dark:text-amber-100 leading-relaxed font-medium">
          {t('firstAid.disclaimerText')}
        </p>
        <div className="pt-1 flex items-center space-x-3">
          <a
            href="tel:103"
            className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>Tez Yordam Chaqirish — 103</span>
          </a>
        </div>
      </div>

      {/* Category Pills Filter Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
              selectedCategory === cat.id
                ? 'bg-rose-600 text-white border-rose-600 shadow'
                : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-neutral-800 hover:bg-slate-50'
            }`}
          >
            {cat.label[language]}
          </button>
        ))}
      </div>

      {/* Main Grid: Search & Articles Sidebar + Detailed Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Search & Articles List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('firstAid.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {filteredArticles.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Ma'lumot topilmadi</p>
            ) : (
              filteredArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    selectedArticle?.id === article.id
                      ? 'border-rose-500 bg-rose-50/80 dark:bg-neutral-900 font-bold text-rose-700 dark:text-rose-400 shadow-sm'
                      : 'border-slate-200 dark:border-neutral-800 bg-white dark:bg-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  <div className="pr-2">
                    <h4 className="text-xs sm:text-sm font-bold line-clamp-1">
                      {article.title[language]}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {article.category}
                    </p>
                  </div>
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    article.severity === 'high'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                  }`}>
                    {article.severity === 'high' ? 'Shoshilinch' : "O'rtacha"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Detailed Guide */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2.5 py-1 rounded-md">
              {selectedArticle.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
              {selectedArticle.title[language]}
            </h2>
          </div>

          {/* Section 1: What to DO */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('firstAid.whatToDo')}
            </h3>
            <ul className="space-y-2 pl-2">
              {selectedArticle.whatToDo[language].map((step, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-200 flex items-start">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex items-center justify-center mr-2 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: What NOT to do */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center">
              <XCircle className="w-4 h-4 mr-2" />
              {t('firstAid.whatNotToDo')}
            </h3>
            <ul className="space-y-2 pl-2">
              {selectedArticle.whatNotToDo[language].map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-200 flex items-start bg-rose-50/50 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900">
                  <span className="text-rose-500 font-bold mr-2">✕</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Emergency Warning Signs */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t('firstAid.emergencyWarning')}
            </h3>
            <ul className="space-y-1.5 pl-2">
              {selectedArticle.emergencyWarningSigns[language].map((sign, idx) => (
                <li key={idx} className="text-xs font-semibold text-amber-800 dark:text-amber-200 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
