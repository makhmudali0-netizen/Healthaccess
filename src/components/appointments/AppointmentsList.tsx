import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { Appointment } from '../../types';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, Plus } from 'lucide-react';
import { BookingWizard } from './BookingWizard';

export const AppointmentsList: React.FC = () => {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>(() => dbService.getAppointments());
  const [activeStatusTab, setActiveStatusTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const filteredAppointments = appointments.filter(a => a.status === activeStatusTab);

  const handleCancelAppointment = (id: string) => {
    const updated = dbService.updateAppointmentStatus(id, 'cancelled');
    setAppointments(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-teal-600 dark:text-teal-400" />
            {t('appointments.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Barcha rejalashtirilgan va yakunlangan shifokor qabullari boshqaruvi
          </p>
        </div>

        <button
          onClick={() => setIsWizardOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi qabulga yozilish</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs w-fit">
        <button
          onClick={() => setActiveStatusTab('upcoming')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeStatusTab === 'upcoming'
              ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('appointments.upcoming')} ({appointments.filter(a => a.status === 'upcoming').length})
        </button>
        <button
          onClick={() => setActiveStatusTab('completed')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeStatusTab === 'completed'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('appointments.completed')} ({appointments.filter(a => a.status === 'completed').length})
        </button>
        <button
          onClick={() => setActiveStatusTab('cancelled')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeStatusTab === 'cancelled'
              ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('appointments.cancelled')} ({appointments.filter(a => a.status === 'cancelled').length})
        </button>
      </div>

      {/* Appointments Grid */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
            <Calendar className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
              Ushbu bo'limda qabullar mavjud emas
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Shifokor ko'rigiga yozilish uchun yuqoridagi tugmani bosing.
            </p>
          </div>
        ) : (
          filteredAppointments.map(app => (
            <div
              key={app.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    app.status === 'upcoming'
                      ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200'
                      : app.status === 'completed'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200'
                  }`}>
                    {app.status}
                  </span>
                  {app.smsReminder && (
                    <span className="text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded">
                      📱 SMS Eslatma faol
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {app.doctorName}
                </h3>
                <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                  {app.doctorSpecialty}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {app.date} soat {app.timeSlot}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {app.facilityName}
                  </span>
                </div>
              </div>

              {app.status === 'upcoming' && (
                <button
                  onClick={() => handleCancelAppointment(app.id)}
                  className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-xl border border-rose-200 dark:border-rose-900 transition shrink-0"
                >
                  {t('appointments.cancelAppointment')}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Booking Wizard Modal */}
      <BookingWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onBookingComplete={() => setAppointments(dbService.getAppointments())}
      />
    </div>
  );
};
