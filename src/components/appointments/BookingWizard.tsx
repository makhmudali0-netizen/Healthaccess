import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotifications } from '../../context/NotificationContext';
import { dbService } from '../../services/dbService';
import { Doctor, Facility } from '../../types';
import { Calendar, Clock, CheckCircle2, User, Building2, Stethoscope, Smartphone, X } from 'lucide-react';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialFacility?: Facility | null;
  onBookingComplete?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  initialFacility,
  onBookingComplete
}) => {
  const { t, language } = useLanguage();
  const { sendSMSNotification } = useNotifications();

  const facilities = dbService.getFacilities();
  const doctors = dbService.getDoctors();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(initialFacility || facilities[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(doctors[0]);
  const [selectedDate, setSelectedDate] = useState<string>("2026-08-28");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("10:30");
  const [smsReminder, setSmsReminder] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmBooking = async () => {
    if (!selectedFacility || !selectedDoctor) return;

    setIsSubmitting(true);

    // Add appointment to local DB
    dbService.addAppointment({
      patientId: 'usr-001',
      patientName: 'Jasur Rahimov',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      facilityId: selectedFacility.id,
      facilityName: selectedFacility.name[language],
      facilityAddress: selectedFacility.address[language],
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'upcoming',
      type: 'in_person',
      smsReminder
    });

    // If SMS reminder enabled, dispatch simulated SMS notification
    if (smsReminder) {
      await sendSMSNotification({
        toPhone: '+998 90 123 45 67',
        body: `[Health Access] Qabul tasdiqlandi! ${selectedDate} kuni ${selectedTimeSlot} da ${selectedDoctor.name} (${selectedFacility.name[language]}) qabulingiz bor. Murojaat: ${selectedFacility.phone}`,
        type: 'appointment_reminder'
      });
    }

    setIsSubmitting(false);
    if (onBookingComplete) onBookingComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
              {t('appointments.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <span className={step >= 1 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
            1. Shifoxona
          </span>
          <span>→</span>
          <span className={step >= 2 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
            2. Shifokor
          </span>
          <span>→</span>
          <span className={step >= 3 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
            3. Vaqt
          </span>
          <span>→</span>
          <span className={step >= 4 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
            4. Tasdiqlash
          </span>
        </div>

        {/* Wizard Step Body */}
        <div className="p-6">
          
          {/* STEP 1: Select Facility */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Tibbiyot muassasasini tanlang:
              </h3>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {facilities.map(fac => (
                  <div
                    key={fac.id}
                    onClick={() => setSelectedFacility(fac)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedFacility?.id === fac.id
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-teal-600 shrink-0" />
                      <div>
                        <h4 className="text-xs text-slate-900 dark:text-white">{fac.name[language]}</h4>
                        <p className="text-[10px] text-slate-500">{fac.region}, {fac.district}</p>
                      </div>
                    </div>
                    {selectedFacility?.id === fac.id && <CheckCircle2 className="w-5 h-5 text-teal-600" />}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Keyingi qadam: Shifokorni tanlash →
              </button>
            </div>
          )}

          {/* STEP 2: Select Doctor */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Mutaxassis shifokorni tanlang:
              </h3>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {doctors.map(doc => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedDoctor?.id === doc.id
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/60 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={doc.photoUrl} alt={doc.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs text-slate-900 dark:text-white">{doc.name}</h4>
                        <p className="text-[11px] text-teal-600 font-medium">{doc.specialty} • {doc.experienceYears} yil tajriba</p>
                        <p className="text-[10px] text-slate-500">{doc.consultationFee.toLocaleString('uz-UZ')} UZS</p>
                      </div>
                    </div>
                    {selectedDoctor?.id === doc.id && <CheckCircle2 className="w-5 h-5 text-teal-600" />}
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
                >
                  ← Orqaga
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Keyingi qadam: Sana va vaqt →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Select Date & Time */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Qabul sanasi va bo'sh vaqtni tanlang:
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Sana:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Mavjud vaqt oralig'i (Slots):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["09:00", "10:30", "14:00", "16:00"].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          selectedTimeSlot === slot
                            ? 'bg-teal-600 text-white border-teal-600 shadow'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
                >
                  ← Orqaga
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="w-2/3 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Tasdiqlash sahifasi →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirm Booking */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-teal-50 dark:bg-teal-950/60 rounded-2xl border border-teal-200 dark:border-teal-900 space-y-2 text-xs">
                <h4 className="font-extrabold text-sm text-teal-900 dark:text-teal-200">
                  Qabul ma'lumotlarini tasdiqlang
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold">Shifokor:</span> {selectedDoctor?.name} ({selectedDoctor?.specialty})
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold">Muassasa:</span> {selectedFacility?.name[language]}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold">Sana va vaqt:</span> {selectedDate} soat {selectedTimeSlot}
                </p>
              </div>

              {/* SMS Checkbox */}
              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsReminder}
                  onChange={e => setSmsReminder(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-1 text-teal-600" />
                  SMS Eslatmani bepul faollashtirish (+998 90 123 45 67)
                </span>
              </label>

              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Rasmiylashtirilmoqda...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('appointments.confirmBooking')}</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
