import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { Calendar, Syringe, FileText, Activity, ArrowRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface MyHealthWidgetProps {
  setActiveTab: (tab: string) => void;
}

export const MyHealthWidget: React.FC<MyHealthWidgetProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const appointments = dbService.getAppointments();
  const records = dbService.getMedicalRecords();

  const nextAppointment = appointments.find(a => a.status === 'upcoming');
  const recentRecord = records[0];

  return (
    <section className="py-10 bg-white dark:bg-black border-b border-slate-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
              <Activity className="w-6 h-6 mr-2 text-teal-600 dark:text-teal-400" />
              {t('myHealth.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Shaxsiy qabullar va tibbiy ko'rsatkichlar monitoringi
            </p>
          </div>
          <button
            onClick={() => setActiveTab('emr')}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center space-x-1"
          >
            <span>{t('myHealth.viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Next Appointment */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-teal-600" /> {t('myHealth.nextAppointment')}
                </span>
                <span className="text-[10px] font-semibold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 px-2 py-0.5 rounded-full">
                  Rejalashtirilgan
                </span>
              </div>

              {nextAppointment ? (
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {nextAppointment.doctorName}
                  </h4>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                    {nextAppointment.doctorSpecialty}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {nextAppointment.date} | {nextAppointment.timeSlot}
                    </p>
                    <p className="flex items-center truncate">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate">{nextAppointment.facilityName}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4">
                  {t('myHealth.noAppointment')}
                </p>
              )}
            </div>

            <button
              onClick={() => setActiveTab('appointments')}
              className="mt-4 w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-xl transition text-center"
            >
              Qabullarni boshqarish
            </button>
          </div>

          {/* Card 2: Vaccination Reminder */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider flex items-center">
                  <Syringe className="w-4 h-4 mr-1 text-blue-600" /> {t('myHealth.vaccinationReminder')}
                </span>
                <span className="text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                  Emlash
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Penta-1 (DTP-HepB-Hib)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Amir Rahimov (Farzandiz) uchun rejalashtirilgan
                </p>
                <p className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Tavsiya etilgan: 2 oylikda
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('vaccinations')}
              className="mt-4 w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-xl transition text-center"
            >
              Emlash jadvali
            </button>
          </div>

          {/* Card 3: Recent Medical Record */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center">
                  <FileText className="w-4 h-4 mr-1 text-purple-600" /> {t('myHealth.recentRecord')}
                </span>
                <span className="text-[10px] font-semibold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">
                  EMR
                </span>
              </div>

              {recentRecord ? (
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {recentRecord.title[language]}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {recentRecord.date} • {recentRecord.doctorName}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {recentRecord.summary[language]}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4">Tibbiy yozuvlar yo'q</p>
              )}
            </div>

            <button
              onClick={() => setActiveTab('emr')}
              className="mt-4 w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-xl transition text-center"
            >
              Medkartani ko'rish
            </button>
          </div>

          {/* Card 4: Blood Pressure Monitor */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wider flex items-center">
                  <Activity className="w-4 h-4 mr-1 text-red-600" /> Qon Bosimi Monitori
                </span>
                <span className="text-[10px] font-semibold bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full animate-pulse">
                  Smart PPG
                </span>
              </div>

              {(() => {
                const bpRecords = dbService.getBloodPressureRecords();
                const latestBP = bpRecords[0];
                return latestBP ? (
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      So'nggi O'lchov
                    </h4>
                    <div className="mt-1 flex items-baseline space-x-2">
                      <span className="text-xl font-black text-red-600 dark:text-red-400 font-mono">
                        {latestBP.systolic} / {latestBP.diastolic}
                      </span>
                      <span className="text-xs font-bold text-amber-500">
                        ❤️ {latestBP.pulse} bpm
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {latestBP.timestamp}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-4">Qon bosimi ma'lumotlari yo'q</p>
                );
              })()}
            </div>

            <button
              onClick={() => setActiveTab('bp')}
              className="mt-4 w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-xl transition text-center"
            >
              Bosimni o'lchash
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
