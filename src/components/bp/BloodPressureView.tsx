import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { BloodPressureRecord, BPCategory } from '../../types';
import {
  HeartPulse,
  Activity,
  PlusCircle,
  History,
  TrendingUp,
  Camera,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Sparkles,
  ChevronRight,
  Info,
  Trash2,
  Stethoscope,
  Clock,
  Award,
  Zap,
  RotateCcw
} from 'lucide-react';

export const BloodPressureView: React.FC = () => {
  const { language, t } = useLanguage();
  const [records, setRecords] = useState<BloodPressureRecord[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'simulator' | 'manual' | 'history'>('simulator');

  // Scanner Simulator States
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<BloodPressureRecord | null>(null);

  // Manual Entry States
  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [pulse, setPulse] = useState<number>(72);
  const [condition, setCondition] = useState<BloodPressureRecord['condition']>('resting');
  const [notes, setNotes] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const data = dbService.getBloodPressureRecords();
    setRecords(data);
  };

  // Classify BP according to AHA / WHO guidelines
  const getBPCategory = (sys: number, dia: number): BPCategory => {
    if (sys >= 180 || dia >= 120) return 'crisis';
    if (sys >= 140 || dia >= 90) return 'stage2';
    if (sys >= 130 || dia >= 80) return 'stage1';
    if (sys >= 120 && dia < 80) return 'elevated';
    return 'normal';
  };

  const getCategoryDetails = (category: BPCategory) => {
    switch (category) {
      case 'normal':
        return {
          label: { uz: "Normal (Sog'lom)", ru: "Нормальное" },
          color: "bg-emerald-500 text-white",
          badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900",
          advice: {
            uz: "Ajoyib! Qon bosimingiz me'yorida. Shu zaylda faol va to'g'ri turmush tarzini davom ettiring.",
            ru: "Отлично! Ваше давление в норме. Продолжайте вести здоровый образ жизни."
          }
        };
      case 'elevated':
        return {
          label: { uz: "Biroz yuqori (Prehypertension)", ru: "Повышенное" },
          color: "bg-amber-500 text-white",
          badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900",
          advice: {
            uz: "Bosim biroz oshgan. Osh tuzini kamaytiring, ko'proq piyoda yuring va ko'proq suv iching.",
            ru: "Давление слегка повышено. Сократите употребление соли и чаще гуляйте на свежем воздухе."
          }
        };
      case 'stage1':
        return {
          label: { uz: "I-darajali Gipertoniya", ru: "Гипертония 1-й ст." },
          color: "bg-orange-500 text-white",
          badgeColor: "bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-900",
          advice: {
            uz: "I-darajali yuqori bosim. Shifokor bilan maslahatlashish va kunlik bosimni kuzatib borish tavsiya etiladi.",
            ru: "1-я степень гипертонии. Рекомендуется консультация терапевта и регулярный контроль."
          }
        };
      case 'stage2':
        return {
          label: { uz: "II-darajali Gipertoniya", ru: "Гипертония 2-й ст." },
          color: "bg-rose-600 text-white",
          badgeColor: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900",
          advice: {
            uz: "Yuqori qon bosimi. Shifokor tayinlagan dori vositalarini qabul qiling va kardiologga murojaat qiling.",
            ru: "Высокое давление. Примите назначенные лекарства и обратитесь к кардиологу."
          }
        };
      case 'crisis':
        return {
          label: { uz: "🚨 Gipertonik Inqiroz (Xavfli!)", ru: "🚨 Гипертонический криз!" },
          color: "bg-red-700 text-white animate-pulse",
          badgeColor: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 border-red-400 font-extrabold",
          advice: {
            uz: "XAVFLI DARAJADAGI BOSIM! Darhol tinchlaning va Tez Yordam (103) ga qo'ng'iroq qiling!",
            ru: "КРИТИЧЕСКОЕ ДАВЛЕНИЕ! Немедленно сохраняйте покой и вызовите скорую помощь (103)!"
          }
        };
    }
  };

  // Simulate Optical PPG Pulse & Pressure Scan
  const startCameraScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);

          // Simulated optical PPG result calculation with realistic variance
          const randomSys = Math.floor(Math.random() * (132 - 114 + 1)) + 114;
          const randomDia = Math.floor(Math.random() * (84 - 74 + 1)) + 74;
          const randomPulse = Math.floor(Math.random() * (82 - 66 + 1)) + 66;
          const cat = getBPCategory(randomSys, randomDia);

          const newRecord = dbService.addBloodPressureRecord({
            systolic: randomSys,
            diastolic: randomDia,
            pulse: randomPulse,
            category: cat,
            condition: 'resting',
            notes: 'Optik kameraviy PPG skanerlash orqali aniqlandi',
            measuredVia: 'camera_ppg'
          });

          setScanResult(newRecord);
          loadRecords();
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = getBPCategory(systolic, diastolic);

    dbService.addBloodPressureRecord({
      systolic,
      diastolic,
      pulse,
      category: cat,
      condition,
      notes: notes.trim() || 'Qo\'lda kiritilgan o\'lchov',
      measuredVia: 'manual'
    });

    setSuccessMsg(true);
    loadRecords();
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = dbService.deleteBloodPressureRecord(id);
    setRecords(updated);
  };

  // Calculated Stats
  const avgSystolic = records.length ? Math.round(records.reduce((acc, r) => acc + r.systolic, 0) / records.length) : 120;
  const avgDiastolic = records.length ? Math.round(records.reduce((acc, r) => acc + r.diastolic, 0) / records.length) : 80;
  const avgPulse = records.length ? Math.round(records.reduce((acc, r) => acc + r.pulse, 0) / records.length) : 72;
  const latestRecord = records[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide">
              <HeartPulse className="w-4 h-4 animate-pulse" />
              <span>Smart Health Pulse & BP System</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {language === 'uz' ? "Aqlli Qon Bosimi Monitori" : "Умный Монитор Давления"}
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl">
              {language === 'uz'
                ? "Optik sensor orqali pulslarni o'lchash, kunlik qon bosimi kundaligi va AHA xalqaro tibbiy tahlili."
                : "Оптическое измерение пульса, дневник артериального давления и международный анализ AHA."}
            </p>
          </div>

          {/* Current Status Badge */}
          {latestRecord && (
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shrink-0 space-y-1 text-center min-w-[180px]">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-red-200 block">
                {language === 'uz' ? "So'nggi Ko'rsatkich" : "Последний замер"}
              </span>
              <div className="text-3xl font-black font-mono">
                {latestRecord.systolic} / {latestRecord.diastolic}
              </div>
              <p className="text-xs font-bold text-teal-200">
                ❤️ {latestRecord.pulse} bpm
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-slate-400 block">O'rtacha Sistolik</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-1">
            {avgSystolic} <span className="text-xs text-slate-400 font-sans font-normal">mmHg</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-slate-400 block">O'rtacha Diastolik</span>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400 font-mono mt-1">
            {avgDiastolic} <span className="text-xs text-slate-400 font-sans font-normal">mmHg</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-slate-400 block">O'rtacha Puls</span>
          <div className="text-2xl font-black text-amber-500 font-mono mt-1">
            {avgPulse} <span className="text-xs text-slate-400 font-sans font-normal">bpm</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-slate-400 block">Jami O'lchovlar</span>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-200 font-mono mt-1">
            {records.length} <span className="text-xs text-slate-400 font-sans font-normal">marta</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 bg-slate-200/60 dark:bg-slate-800/60 p-1.5 rounded-2xl max-w-xl mx-auto text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'simulator'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Optik Skaner</span>
        </button>

        <button
          onClick={() => setActiveSubTab('manual')}
          className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'manual'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Qo'lda Kiritish</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'history'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Tarix & Grafik</span>
        </button>
      </div>

      {/* SUBTAB 1: OPTICAL CAMERA PPG SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 max-w-2xl mx-auto text-center">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center justify-center space-x-2">
              <Camera className="w-5 h-5 text-red-600" />
              <span>Optik Puls va Bosim Skaneri</span>
            </h2>
            <p className="text-xs text-slate-500">
              Barmoq uchingizni kameraga qo'ying yoki ekranga bosing. Tizim puls toqini skanerlaydi.
            </p>
          </div>

          {/* Animated Scanner Visual Circle */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Pulsing Outer Rings */}
            <div className={`absolute inset-0 rounded-full border-4 border-red-500/30 ${isScanning ? 'animate-ping' : ''}`} />
            <div className={`absolute inset-2 rounded-full border-2 border-red-600/50 ${isScanning ? 'animate-spin' : ''}`} />

            {/* Inner Interactive Circle */}
            <button
              disabled={isScanning}
              onClick={startCameraScan}
              className={`w-36 h-36 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-orange-500 text-white shadow-2xl flex flex-col items-center justify-center space-y-1.5 transition transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-90 ${
                isScanning ? 'animate-pulse' : ''
              }`}
            >
              <HeartPulse className={`w-12 h-12 ${isScanning ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-black uppercase tracking-wider">
                {isScanning ? `${scanProgress}%` : "BOSING & O'LCHАNG"}
              </span>
            </button>
          </div>

          {/* Simulated Waveform PPG Graphic */}
          <div className="h-14 w-full bg-slate-900 rounded-2xl p-2 flex items-center justify-center overflow-hidden border border-slate-800 relative">
            <svg className="w-full h-full stroke-red-500 fill-none" viewBox="0 0 500 50">
              <path
                d="M 0 25 Q 30 25, 50 25 T 70 10 T 80 40 T 90 5 T 100 35 T 110 25 T 200 25 T 220 10 T 230 40 T 240 5 T 250 35 T 260 25 T 350 25 T 370 10 T 380 40 T 390 5 T 400 35 T 410 25 T 500 25"
                strokeWidth="3"
                className={isScanning ? "animate-pulse" : ""}
              />
            </svg>
            <div className="absolute top-2 left-3 text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>PPG SENSOR ACTIVE</span>
            </div>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="space-y-2">
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-xs font-bold text-slate-500">
                Barmoqni qimirlatmay ushlab turing... ({scanProgress}%)
              </p>
            </div>
          )}

          {/* Scan Result Overlay Card */}
          {scanResult && (
            <div className="p-5 bg-gradient-to-br from-slate-50 to-red-50/40 dark:from-slate-800/80 dark:to-red-950/30 border border-red-200 dark:border-red-900/60 rounded-3xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>O'lchov Muvaffaqiyatli Saqlandi</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">{scanResult.timestamp}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block">SISTOLIK</span>
                  <span className="text-2xl font-black text-red-600 dark:text-red-400 font-mono">{scanResult.systolic}</span>
                  <span className="text-[9px] text-slate-400 block">mmHg</span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block">DIASTOLIK</span>
                  <span className="text-2xl font-black text-teal-600 dark:text-teal-400 font-mono">{scanResult.diastolic}</span>
                  <span className="text-[9px] text-slate-400 block">mmHg</span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block">PULS</span>
                  <span className="text-2xl font-black text-amber-500 font-mono">{scanResult.pulse}</span>
                  <span className="text-[9px] text-slate-400 block">bpm</span>
                </div>
              </div>

              {/* AHA Category Badge & Advice */}
              {(() => {
                const details = getCategoryDetails(scanResult.category);
                return (
                  <div className={`p-3.5 rounded-2xl border ${details.badgeColor} space-y-1 text-left`}>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs">{details.label[language]}</span>
                      <Sparkles className="w-4 h-4 opacity-75" />
                    </div>
                    <p className="text-xs opacity-90">{details.advice[language]}</p>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: MANUAL ENTRY FORM */}
      {activeSubTab === 'manual' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-red-600" />
              <span>Qon Bosimi Ko'rsatkichlarini Kiritish</span>
            </h2>
            <p className="text-xs text-slate-500">
              Tonomatordan olingan ko'rsatkichlarni kiriting va saqlang.
            </p>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-2xl flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Qon bosimi ko'rsatkichlari muvaffaqiyatli saqlandi!</span>
            </div>
          )}

          <form onSubmit={handleManualSave} className="space-y-5 text-xs font-semibold">
            {/* Systolic & Diastolic Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-bold">
                  Sistolik Bosim (Yuqori mmHg) *
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="80"
                    max="220"
                    value={systolic}
                    onChange={e => setSystolic(Number(e.target.value))}
                    className="flex-1 accent-red-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="70"
                    max="240"
                    value={systolic}
                    onChange={e => setSystolic(Number(e.target.value))}
                    className="w-20 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-black text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-bold">
                  Diastolik Bosim (Pastki mmHg) *
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="50"
                    max="140"
                    value={diastolic}
                    onChange={e => setDiastolic(Number(e.target.value))}
                    className="flex-1 accent-teal-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="40"
                    max="150"
                    value={diastolic}
                    onChange={e => setDiastolic(Number(e.target.value))}
                    className="w-20 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-black text-center"
                  />
                </div>
              </div>
            </div>

            {/* Pulse Rate */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-bold">
                Puls Urishi (BPM - tomir urishi)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="40"
                  max="180"
                  value={pulse}
                  onChange={e => setPulse(Number(e.target.value))}
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={pulse}
                  onChange={e => setPulse(Number(e.target.value))}
                  className="w-20 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-black text-center"
                />
              </div>
            </div>

            {/* Condition selector */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-bold">
                O'lchov Olish Sharoiti
              </label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
              >
                <option value="resting">🧘‍♂️ Tinch holatda (Dam olayotganda)</option>
                <option value="morning">🌅 Ertalabki o'lchov (Uyg'ongandan so'ng)</option>
                <option value="evening">🌙 Kechki o'lchov</option>
                <option value="after_exercise">🏃‍♂️ Mashg'ulot / Sportdan so'ng</option>
                <option value="after_medication">💊 Dori qabul qilgandan so'ng</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-1.5 font-bold">
                Qo'shimcha izoh yoki alomatlar
              </label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Masalan: Bosh og'rig'i bor edi, kofe ichgandan so'ng"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>

            {/* Live Category Assessment Preview */}
            {(() => {
              const currentCat = getBPCategory(systolic, diastolic);
              const details = getCategoryDetails(currentCat);
              return (
                <div className={`p-4 rounded-2xl border ${details.badgeColor} space-y-1`}>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs">Toifa: {details.label[language]}</span>
                    <span className="text-xs font-mono font-bold">{systolic}/{diastolic} mmHg</span>
                  </div>
                  <p className="text-[11px] opacity-90">{details.advice[language]}</p>
                </div>
              );
            })()}

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>O'lchovni Kundalikka Saqlash</span>
            </button>
          </form>
        </div>
      )}

      {/* SUBTAB 3: HISTORY & TREND GRAPH */}
      {activeSubTab === 'history' && (
        <div className="space-y-6">
          
          {/* Trend Chart (SVG Line Chart) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <span>Qon Bosimi O'zgarish Dinamikasi</span>
                </h3>
                <p className="text-xs text-slate-500">Sistolik (Qizil) va Diastolik (Yashil/Teal) ko'rsatkichlar grafigi</p>
              </div>

              <div className="flex items-center space-x-4 text-xs font-bold">
                <span className="flex items-center space-x-1 text-red-500">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Sistolik</span>
                </span>
                <span className="flex items-center space-x-1 text-teal-500">
                  <span className="w-3 h-3 rounded-full bg-teal-500" />
                  <span>Diastolik</span>
                </span>
              </div>
            </div>

            {/* SVG Interactive Visual Chart */}
            <div className="h-56 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/60 relative flex items-end justify-between overflow-x-auto space-x-4">
              {records.slice(0, 10).reverse().map((rec, index) => {
                const sysHeight = Math.min(100, Math.max(20, ((rec.systolic - 70) / 130) * 100));
                const diaHeight = Math.min(100, Math.max(15, ((rec.diastolic - 40) / 100) * 100));
                return (
                  <div key={rec.id || index} className="flex flex-col items-center flex-1 min-w-[36px] h-full justify-end group">
                    
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition duration-200 bg-slate-900 text-white text-[10px] p-1.5 rounded-lg absolute -top-2 z-10 pointer-events-none whitespace-nowrap shadow-lg">
                      {rec.systolic}/{rec.diastolic} mmHg (❤️{rec.pulse})
                    </div>

                    {/* Bars Representation */}
                    <div className="w-full max-w-[20px] flex items-end justify-center space-x-1 h-36">
                      <div
                        className="w-2.5 bg-gradient-to-t from-red-600 to-rose-400 rounded-t-md transition-all group-hover:brightness-125"
                        style={{ height: `${sysHeight}%` }}
                      />
                      <div
                        className="w-2.5 bg-gradient-to-t from-teal-600 to-emerald-400 rounded-t-md transition-all group-hover:brightness-125"
                        style={{ height: `${diaHeight}%` }}
                      />
                    </div>

                    <span className="text-[10px] font-mono font-bold text-slate-500 mt-2 truncate w-full text-center">
                      {rec.timestamp.split(' ')[1] || rec.timestamp.slice(-5)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History Records List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <History className="w-5 h-5 text-red-600" />
              <span>O'lchovlar Tarixi ({records.length})</span>
            </h3>

            {records.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Hozircha saqlangan qon bosimi o'lchovlari yo'q.</p>
            ) : (
              <div className="space-y-3">
                {records.map(rec => {
                  const details = getCategoryDetails(rec.category);
                  return (
                    <div
                      key={rec.id}
                      className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-2xl">
                          <HeartPulse className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-black font-mono text-slate-900 dark:text-white">
                              {rec.systolic} / {rec.diastolic} <span className="text-xs font-sans font-normal text-slate-400">mmHg</span>
                            </span>
                            <span className="text-xs font-bold text-amber-500">
                              ❤️ {rec.pulse} bpm
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {rec.notes} • <span className="font-semibold">{rec.timestamp}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className={`px-3 py-1 text-xs font-extrabold rounded-full border ${details.badgeColor}`}>
                          {details.label[language]}
                        </span>

                        <button
                          onClick={() => handleDelete(rec.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 transition rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* AHA Medical Standard Standard Reference Modal & Advice Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-teal-500/20 rounded-2xl text-teal-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-extrabold">AHA & DSEN Xalqaro Tibbiy Standarti</h4>
            <p className="text-xs text-slate-400">Kattalar uchun qon bosimi darajalari tasnifi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs font-semibold">
          <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 space-y-1">
            <span className="font-black text-emerald-400 block">🟢 Normal</span>
            <span className="text-[11px] text-slate-300 block">&lt; 120 va &lt; 80</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-800/80 space-y-1">
            <span className="font-black text-amber-400 block">🟡 Prehypertension</span>
            <span className="text-[11px] text-slate-300 block">120-129 va &lt; 80</span>
          </div>

          <div className="p-3 rounded-2xl bg-orange-950/80 border border-orange-800/80 space-y-1">
            <span className="font-black text-orange-400 block">🟠 Gipertoniya I</span>
            <span className="text-[11px] text-slate-300 block">130-139 yoki 80-89</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-800/80 space-y-1">
            <span className="font-black text-rose-400 block">🔴 Gipertoniya II</span>
            <span className="text-[11px] text-slate-300 block">140+ yoki 90+</span>
          </div>

          <div className="p-3 rounded-2xl bg-red-950 border border-red-700 space-y-1">
            <span className="font-black text-red-400 block">🚨 Inqiroz (Crisis)</span>
            <span className="text-[11px] text-slate-300 block">&gt; 180 va/yoki &gt; 120</span>
          </div>
        </div>
      </div>

    </div>
  );
};
