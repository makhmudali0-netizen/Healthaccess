import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { Facility, Appointment } from '../../types';
import {
  Stethoscope,
  Calendar,
  MessageSquare,
  FileText,
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  Pill,
  Send,
  User,
  Building2,
  DollarSign,
  ShieldCheck,
  Award,
  Sparkles,
  Check
} from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  facilityName: string;
  date: string;
  medicines: Array<{
    name: string;
    dosage: string;
    duration: string;
    note: string;
  }>;
  doctorStamp: string;
}

export const DoctorDashboardView: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'chat' | 'schedule' | 'pharmacy'>('appointments');

  // Doctor Settings State
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [consultationFee, setConsultationFee] = useState(150000);
  const [workingDays, setWorkingDays] = useState(["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"]);
  const [workingHours, setWorkingHours] = useState("09:00 - 17:00");

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(() => dbService.getAppointments());

  // Prescriptions State
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "rx-101",
      patientName: "Jasur Rahimov",
      doctorName: user?.fullName || "Dr. Toshmatov",
      facilityName: "Toshkent Klinik Shifoxonasi",
      date: new Date().toISOString().split('T')[0],
      medicines: [
        { name: "Amoksitsillin 500mg", dosage: "1 tabletka 3 mahal", duration: "7 kun", note: "Ovqatdan keyin ichilsin" },
        { name: "Paratsetamol 500mg", dosage: "Harorati ko'tarilganda", duration: "3 kun", note: "Zarurat bo'lganda" }
      ],
      doctorStamp: "DS-99812-APPROVED"
    }
  ]);

  // E-Prescription Modal State
  const [showRxModal, setShowRxModal] = useState(false);
  const [rxPatientName, setRxPatientName] = useState('');
  const [rxMedicines, setRxMedicines] = useState<Array<{ name: string; dosage: string; duration: string; note: string }>>([
    { name: '', dosage: '', duration: '', note: '' }
  ]);

  // Consultation Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'patient' | 'doctor'; text: string; time: string }>>([
    { sender: 'patient', text: "Assalomu alaykum doctor. Tomog'im og'rib isitmalayapman, nima tavsiya qilasiz?", time: "10:15" },
    { sender: 'doctor', text: "Va alaykum assalom. Iltimos, ko'proq suyuqlik iching va iliq tuzli suvi bilan tomog'ingizni g'ar-g me'yorda chayib turing.", time: "10:18" }
  ]);
  const [replyText, setReplyText] = useState('');

  // Pharmacy Inventory State
  const [medicinesStock, setMedicinesStock] = useState<Array<{ id: string; name: string; price: number; inStock: boolean; requiresRx: boolean }>>([
    { id: 'm-1', name: "Amoksitsillin 500mg", price: 28000, inStock: true, requiresRx: true },
    { id: 'm-2', name: "Paratsetamol 500mg", price: 12000, inStock: true, requiresRx: false },
    { id: 'm-3', name: "Nurofen Express 200mg", price: 35000, inStock: true, requiresRx: false },
    { id: 'm-4', name: "Ketanov 10mg", price: 24000, inStock: false, requiresRx: true },
    { id: 'm-5', name: "Suprastin 25mg", price: 18000, inStock: true, requiresRx: false }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedPrice, setNewMedPrice] = useState(25000);

  // Status Change Handlers
  const handleAppointStatus = (id: string, status: 'completed' | 'cancelled') => {
    const updated = appointments.map(app => app.id === id ? { ...app, status } : app);
    setAppointments(updated);
  };

  // Add E-Prescription
  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxPatientName.trim() || rxMedicines.length === 0 || !rxMedicines[0].name.trim()) {
      alert("Iltimos, bemor ismi va dori nomini kiriting.");
      return;
    }

    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      patientName: rxPatientName.trim(),
      doctorName: user?.fullName || "Shifokor",
      facilityName: "Respublika Klinikasi",
      date: new Date().toISOString().split('T')[0],
      medicines: rxMedicines.filter(m => m.name.trim() !== ''),
      doctorStamp: `DS-${Math.floor(10000 + Math.random() * 90000)}-APPROVED`
    };

    setPrescriptions([newRx, ...prescriptions]);
    setShowRxModal(false);
    setRxPatientName('');
    setRxMedicines([{ name: '', dosage: '', duration: '', note: '' }]);
    alert("Elektron retsept muvaffaqiyatli yaratildi va saqlandi!");
  };

  // Send Doctor Chat Reply
  const handleSendChatReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setChatMessages([
      ...chatMessages,
      { sender: 'doctor', text: replyText.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setReplyText('');
  };

  // Add New Medicine Stock (Pharmacy)
  const handleAddMedicineStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    setMedicinesStock([
      ...medicinesStock,
      { id: `m-${Date.now()}`, name: newMedName.trim(), price: Number(newMedPrice), inStock: true, requiresRx: false }
    ]);
    setNewMedName('');
    setNewMedPrice(25000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner: Doctor Info & Duty Status */}
      <div className="bg-gradient-to-r from-[#dc2626] to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl shrink-0 bg-white/10">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"}
              alt="Doctor Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold text-white mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Rasmiy Tasdiqlangan Shifokor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{user?.fullName || "Dr. Shifokor"}</h1>
            <p className="text-sm text-red-100 mt-1 flex items-center">
              <Building2 className="w-4 h-4 mr-1 shrink-0" />
              <span>{user?.region} • {user?.district} Markaziy Shifoxonasi</span>
            </p>
          </div>
        </div>

        {/* Duty Status & Price Toggle */}
        <div className="bg-black/30 backdrop-blur p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-4 text-xs font-bold w-full md:w-auto">
          <div className="flex items-center space-x-3">
            <span className="text-slate-200">Qabul holati:</span>
            <button
              onClick={() => setIsOnDuty(!isOnDuty)}
              className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                isOnDuty ? 'bg-emerald-500 text-white shadow' : 'bg-slate-700 text-slate-300'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isOnDuty ? 'bg-white animate-ping' : 'bg-slate-400'}`} />
              <span>{isOnDuty ? "🟢 QABULDA" : "🔴 TANAFFUSDA"}</span>
            </button>
          </div>

          <div className="text-right border-t sm:border-t-0 sm:border-l border-white/20 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-slate-200 block text-[10px]">Ko'rik narxi:</span>
            <span className="text-base font-extrabold text-amber-300">{consultationFee.toLocaleString()} UZS</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-neutral-800 pb-2 overflow-x-auto text-xs font-extrabold">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-3 rounded-2xl transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'appointments'
              ? 'bg-[#dc2626] text-white shadow-md'
              : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Bemorlar Qabuli ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-3 rounded-2xl transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'prescriptions'
              ? 'bg-[#dc2626] text-white shadow-md'
              : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Elektron Retseptlar ({prescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-3 rounded-2xl transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'chat'
              ? 'bg-[#dc2626] text-white shadow-md'
              : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Online Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-3 rounded-2xl transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'schedule'
              ? 'bg-[#dc2626] text-white shadow-md'
              : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Ish Grafigi va Narxlar</span>
        </button>

        <button
          onClick={() => setActiveTab('pharmacy')}
          className={`px-4 py-3 rounded-2xl transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'pharmacy'
              ? 'bg-[#dc2626] text-white shadow-md'
              : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Dorixona Inventari</span>
        </button>
      </div>

      {/* TAB 1: Appointments Management */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Bemorlardan tushgan qabullar ro'yxati
            </h3>
            <button
              onClick={() => setShowRxModal(true)}
              className="px-4 py-2.5 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Retsept Yozish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map(app => (
              <div
                key={app.id}
                className="bg-white dark:bg-black p-5 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-[#dc2626] flex items-center justify-center font-black text-lg">
                      {app.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{app.patientName}</h4>
                      <p className="text-xs text-slate-500">{app.notes || "Qabulga yozilish"}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                    app.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                      : app.status === 'cancelled'
                      ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                  }`}>
                    {app.status === 'completed' ? "Yakunlangan" : app.status === 'cancelled' ? "Bekor qilingan" : "Kutilmoqda"}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-neutral-900 p-3 rounded-2xl border border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Qabul vaqti:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{app.date} • {app.timeSlot}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-neutral-900">
                  <button
                    onClick={() => handleAppointStatus(app.id, 'completed')}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tasdiqlash</span>
                  </button>

                  <button
                    onClick={() => {
                      setRxPatientName(app.patientName);
                      setShowRxModal(true);
                    }}
                    className="flex-1 py-2 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Retsept berish</span>
                  </button>

                  <button
                    onClick={() => handleAppointStatus(app.id, 'cancelled')}
                    className="py-2 px-3 bg-slate-200 dark:bg-neutral-800 hover:bg-red-100 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition"
                  >
                    <XCircle className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: E-Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Yozib berilgan elektron retseptlar
            </h3>
            <button
              onClick={() => setShowRxModal(true)}
              className="px-4 py-2.5 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Retsept Yozish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map(rx => (
              <div key={rx.id} className="bg-white dark:bg-black p-6 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-red-600">Elektron Retsept №{rx.id}</span>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{rx.patientName}</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{rx.date}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Tayinlangan dorilar:</span>
                  {rx.medicines.map((med, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-neutral-900 p-3 rounded-2xl border border-slate-100 dark:border-neutral-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 dark:text-white">{med.name}</span>
                        <span className="text-red-600 font-bold">{med.dosage}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Muddati: {med.duration} • Izoh: {med.note}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span className="flex items-center text-emerald-600">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    <span>Raqamli muhr: {rx.doctorStamp}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Online Consultation Chat */}
      {activeTab === 'chat' && (
        <div className="bg-white dark:bg-black rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-[#dc2626]" />
            <span>Bemor bilan jonli maslahatxonasi</span>
          </h3>

          <div className="bg-slate-50 dark:bg-neutral-900 rounded-2xl p-4 h-80 overflow-y-auto space-y-3 border border-slate-100 dark:border-neutral-800">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'doctor' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-md p-3.5 rounded-2xl text-xs ${
                  msg.sender === 'doctor'
                    ? 'bg-[#dc2626] text-white rounded-br-none'
                    : 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white border border-slate-200 dark:border-neutral-700 rounded-bl-none shadow-sm'
                }`}>
                  <p className="font-medium">{msg.text}</p>
                  <span className={`text-[10px] block mt-1 ${msg.sender === 'doctor' ? 'text-red-100 text-right' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChatReply} className="flex items-center space-x-2">
            <input
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Shifokor javobini yozing..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1"
            >
              <Send className="w-4 h-4" />
              <span>Yuborish</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: Schedule & Price Settings */}
      {activeTab === 'schedule' && (
        <div className="bg-white dark:bg-black p-6 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-[#dc2626]" />
            <span>Shifokor ish grafigi va ko'rik narxini belgilash</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Ko'rik narxi (UZS)
              </label>
              <input
                type="number"
                value={consultationFee}
                onChange={e => setConsultationFee(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Qabul soatlari
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={e => setWorkingHours(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Qabul kunlari
            </label>
            <div className="flex flex-wrap gap-2">
              {["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"].map(day => {
                const isSelected = workingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setWorkingDays(workingDays.filter(d => d !== day));
                      } else {
                        setWorkingDays([...workingDays, day]);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      isSelected
                        ? 'bg-[#dc2626] text-white shadow'
                        : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => alert("Ish grafigi va narxlar muvaffaqiyatli saqlandi!")}
            className="px-6 py-3 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Sozlamalarni Saqlash
          </button>
        </div>
      )}

      {/* TAB 5: Pharmacy Inventory Management */}
      {activeTab === 'pharmacy' && (
        <div className="bg-white dark:bg-black p-6 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center justify-between">
            <span className="flex items-center">
              <Pill className="w-5 h-5 mr-2 text-[#dc2626]" />
              <span>Dorixona Dorilari va Narxlari Boshqaruvi</span>
            </span>
          </h3>

          {/* Add New Stock Form */}
          <form onSubmit={handleAddMedicineStock} className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-800">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Dori nomi</label>
              <input
                type="text"
                required
                value={newMedName}
                onChange={e => setNewMedName(e.target.value)}
                placeholder="Dori nomini yozing"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black text-slate-900 dark:text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Narxi (UZS)</label>
              <input
                type="number"
                required
                value={newMedPrice}
                onChange={e => setNewMedPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black text-slate-900 dark:text-white text-xs font-bold"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-[#dc2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Qo'shish</span>
              </button>
            </div>
          </form>

          {/* Medicine List */}
          <div className="space-y-2">
            {medicinesStock.map(med => (
              <div key={med.id} className="bg-slate-50 dark:bg-neutral-900 p-3.5 rounded-2xl border border-slate-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">{med.name}</h4>
                  <span className="text-slate-500 font-medium">{med.requiresRx ? "Retsept talab qilinadi" : "Retseptsiz"}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-extrabold text-[#dc2626]">{med.price.toLocaleString()} UZS</span>
                  <button
                    onClick={() => {
                      const updated = medicinesStock.map(m => m.id === med.id ? { ...m, inStock: !m.inStock } : m);
                      setMedicinesStock(updated);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition ${
                      med.inStock
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
                    }`}
                  >
                    {med.inStock ? "Mavjud" : "Tugagan"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* E-Prescription Creator Modal */}
      {showRxModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-black p-6 rounded-3xl max-w-md w-full border border-slate-200 dark:border-neutral-800 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#dc2626]" />
              <span>Elektron Retsept Yozish</span>
            </h3>

            <form onSubmit={handleCreatePrescription} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Bemor ismi *</label>
                <input
                  type="text"
                  required
                  value={rxPatientName}
                  onChange={e => setRxPatientName(e.target.value)}
                  placeholder="Bemor F.I.SH"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white font-bold"
                />
              </div>

              {rxMedicines.map((med, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2">
                  <span className="font-bold text-slate-500 text-[10px]">Dori №{idx + 1}</span>
                  <input
                    type="text"
                    required
                    placeholder="Dori nomi va dozasi"
                    value={med.name}
                    onChange={e => {
                      const copy = [...rxMedicines];
                      copy[idx].name = e.target.value;
                      setRxMedicines(copy);
                    }}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black font-bold"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Doza (1 tab 3 mahal)"
                      value={med.dosage}
                      onChange={e => {
                        const copy = [...rxMedicines];
                        copy[idx].dosage = e.target.value;
                        setRxMedicines(copy);
                      }}
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black"
                    />
                    <input
                      type="text"
                      placeholder="Qabul muddati (7 kun)"
                      value={med.duration}
                      onChange={e => {
                        const copy = [...rxMedicines];
                        copy[idx].duration = e.target.value;
                        setRxMedicines(copy);
                      }}
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black"
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#dc2626] hover:bg-red-700 text-white font-bold rounded-xl shadow transition"
                >
                  Tasdiqlash va Muhrlash
                </button>
                <button
                  type="button"
                  onClick={() => setShowRxModal(false)}
                  className="py-3 px-4 bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl"
                >
                  Yopish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
