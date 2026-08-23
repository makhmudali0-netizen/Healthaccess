import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { MedicalRecord } from '../../types';
import {
  FileText,
  Plus,
  Lock,
  Eye,
  ShieldCheck,
  Stethoscope,
  Pill,
  Activity,
  Upload,
  Calendar,
  CheckCircle2,
  X
} from 'lucide-react';

export const MedicalRecordsView: React.FC = () => {
  const { t, language } = useLanguage();
  const [records, setRecords] = useState<MedicalRecord[]>(() => dbService.getMedicalRecords());
  const [activeFilter, setActiveFilter] = useState<'all' | 'visit' | 'prescription' | 'lab_result'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New record form state
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newDoctor, setNewDoctor] = useState('Dr. Alisher Toshmatov');
  const [newPrivacy, setNewPrivacy] = useState<'private' | 'doctor_shared' | 'family_access'>('private');

  const filteredRecords = activeFilter === 'all'
    ? records
    : records.filter(r => r.type === activeFilter);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRec = dbService.addMedicalRecord({
      patientId: 'usr-001',
      patientName: 'Jasur Rahimov',
      date: new Date().toISOString().split('T')[0],
      doctorName: newDoctor,
      specialty: 'Terapevt',
      facilityName: "Toshkent Shahar 1-Sonli Klinik Shifoxonasi",
      type: 'visit',
      title: { uz: newTitle, ru: newTitle },
      summary: { uz: newSummary, ru: newSummary },
      privacy: newPrivacy
    });

    setRecords([newRec, ...records]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewSummary('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
            <FileText className="w-8 h-8 mr-3 text-purple-600 dark:text-purple-400" />
            {t('emr.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('emr.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('emr.addRecord')}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition ${activeFilter === 'all' ? 'bg-white dark:bg-slate-800 text-purple-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Barchasi ({records.length})
        </button>
        <button
          onClick={() => setActiveFilter('visit')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition ${activeFilter === 'visit' ? 'bg-white dark:bg-slate-800 text-purple-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Ko'riklar
        </button>
        <button
          onClick={() => setActiveFilter('prescription')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition ${activeFilter === 'prescription' ? 'bg-white dark:bg-slate-800 text-purple-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Retseptlar
        </button>
        <button
          onClick={() => setActiveFilter('lab_result')}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition ${activeFilter === 'lab_result' ? 'bg-white dark:bg-slate-800 text-purple-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Tahlillar
        </button>
      </div>

      {/* Timeline View */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-6">
        {filteredRecords.map(rec => (
          <div key={rec.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-white dark:border-slate-950 shadow" />

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {rec.type}
                </span>
                
                {/* Privacy Badge */}
                <span className="text-[10px] flex items-center space-x-1 font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>
                    {rec.privacy === 'private' ? t('emr.privacyPrivate') : rec.privacy === 'doctor_shared' ? t('emr.privacyDoctor') : t('emr.privacyFamily')}
                  </span>
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {rec.title[language]}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {rec.date} • {rec.doctorName} ({rec.facilityName})
              </p>

              <p className="text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {rec.summary[language]}
              </p>

              {/* Prescriptions detail preview */}
              {rec.details?.prescriptions && (
                <div className="space-y-1 pt-1">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase">Dori retsepti:</h4>
                  {rec.details.prescriptions.map((p, idx) => (
                    <div key={idx} className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center">
                      <Pill className="w-3.5 h-3.5 mr-1" />
                      <span>{p.medicine} — {p.dosage} ({p.duration})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">
              Yangi tibbiy yozuv qo'shish
            </h2>

            <form onSubmit={handleAddRecord} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Yozuv sarlavhasi:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Hujjat nomini kiriting"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Xulosa / Tashxis:</label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={e => setNewSummary(e.target.value)}
                  placeholder="Shifokor ko'rigi bo'yicha qisqacha ma'lumot..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Maxfiylik darajasi:</label>
                <select
                  value={newPrivacy}
                  onChange={e => setNewPrivacy(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="private">{t('emr.privacyPrivate')}</option>
                  <option value="doctor_shared">{t('emr.privacyDoctor')}</option>
                  <option value="family_access">{t('emr.privacyFamily')}</option>
                </select>
              </div>

              {/* File Dropzone Simulation */}
              <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center text-slate-400">
                <Upload className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                <p className="text-[11px]">PDF, Scan yoki Rentgen rasmini yuklash (Simulyatsiya)</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow transition"
              >
                Yozuvni saqlash
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
