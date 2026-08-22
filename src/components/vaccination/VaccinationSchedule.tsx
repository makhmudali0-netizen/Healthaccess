import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotifications } from '../../context/NotificationContext';
import { MOCK_VACCINES } from '../../data/mockData';
import { Syringe, CheckCircle2, Clock, AlertCircle, Smartphone, Bell } from 'lucide-react';

export const VaccinationSchedule: React.FC = () => {
  const { t, language } = useLanguage();
  const { sendSMSNotification } = useNotifications();

  const [vaccineStatuses, setVaccineStatuses] = useState<Record<string, 'completed' | 'scheduled' | 'overdue'>>({
    'vac-1': 'completed',
    'vac-2': 'completed',
    'vac-3': 'scheduled',
    'vac-4': 'scheduled'
  });

  const toggleStatus = (id: string) => {
    setVaccineStatuses(prev => ({
      ...prev,
      [id]: prev[id] === 'completed' ? 'scheduled' : 'completed'
    }));
  };

  const handleEnableSMSReminder = async (vaccineName: string) => {
    await sendSMSNotification({
      toPhone: '+998 90 123 45 67',
      body: `[Health Access Emlash] ${vaccineName} emlash eslatmasi muvaffaqiyatli faollashtirildi! Emlash kuni 2 kun oldin SMS yuboriladi.`,
      type: 'vaccine_reminder'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
          <Syringe className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
          {t('vaccinations.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('vaccinations.subtitle')}
        </p>
      </div>

      {/* Vaccine Table / Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Vaksina nomi / KODI</th>
                <th className="p-4">{t('vaccinations.dueAge')}</th>
                <th className="p-4">Tavsifi</th>
                <th className="p-4">Holati</th>
                <th className="p-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_VACCINES.map(vac => {
                const status = vaccineStatuses[vac.id] || 'scheduled';
                return (
                  <tr key={vac.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-extrabold text-xs flex items-center justify-center">
                          {vac.code}
                        </span>
                        <div>
                          <p>{vac.name[language]}</p>
                          {vac.isMandatory && (
                            <span className="text-[9px] text-rose-500 font-bold">Majburiy emlash</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                      {vac.recommendedAgeText[language]}
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                      {vac.description[language]}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        status === 'completed'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                      }`}>
                        {status === 'completed' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        <span>{status === 'completed' ? t('vaccinations.statusCompleted') : t('vaccinations.statusScheduled')}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => toggleStatus(vac.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold transition"
                      >
                        {status === 'completed' ? "Bajarilmadi deb belgilash" : t('vaccinations.markCompleted')}
                      </button>

                      <button
                        onClick={() => handleEnableSMSReminder(vac.name[language])}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition inline-flex items-center space-x-1"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>SMS Eslatama</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
