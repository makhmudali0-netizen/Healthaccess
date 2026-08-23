import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UZBEKISTAN_REGIONS, UZBEKISTAN_DISTRICTS_MAP } from '../../data/mockData';
import { dbService } from '../../services/dbService';
import { UserProfile, Doctor } from '../../types';
import { QRCodeModal } from '../qr/QRCodeModal';
import {
  HeartPulse,
  User,
  Phone,
  Lock,
  Camera,
  Upload,
  ArrowRight,
  Sparkles,
  Stethoscope,
  Building2,
  Award,
  QrCode,
  AlertCircle
} from 'lucide-react';

interface AuthGateModalProps {
  onSuccess: (targetTab?: string) => void;
}

const DOCTOR_SPECIALTIES = [
  "Kardiolog",
  "Jarroh (Xirurg)",
  "Terapevt",
  "Pediatr",
  "Nevrolog",
  "Oftalmolog",
  "Stomatolog",
  "Ginekolog",
  "Urolog",
  "Farmatsevt",
  "Dermatolog",
  "LOR (Otorinolaringolog)",
  "Endokrinolog"
];

export const AuthGateModal: React.FC<AuthGateModalProps> = ({ onSuccess }) => {
  const { registerUser, loginAsDemo } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [showQrModal, setShowQrModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('Toshkent shahri');
  const [district, setDistrict] = useState('Yunusobod tumani');
  const [avatarUrl, setAvatarUrl] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Doctor-specific fields
  const [specialty, setSpecialty] = useState('Terapevt');
  const [experienceYears, setExperienceYears] = useState(5);
  const [selectedFacilityId, setSelectedFacilityId] = useState('');

  const facilities = dbService.getFacilities() || [];
  const availableDistricts = UZBEKISTAN_DISTRICTS_MAP[region] || [];

  // Filter facilities by selected region & district
  const regionFacilities = facilities.filter(f => f.region === region);

  // Handle custom profile photo upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        setAvatarUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setErrorMessage("Iltimos, F.I.SH (ism-sharifingiz)ni kiriting.");
      return;
    }

    if (!trimmedPhone) {
      setErrorMessage("Iltimos, telefon raqamingizni kiriting.");
      return;
    }

    // MANDATORY PHOTO UPLOAD FOR DOCTORS
    if (role === 'doctor' && !previewImage) {
      setErrorMessage("Shifokorlar uchun profil rasmini yuklash MAJBURIIY! Iltimos, rasmingizni yuklang.");
      return;
    }

    setIsSubmitting(true);

    try {
      const targetFacility = facilities.find(f => f.id === selectedFacilityId) || regionFacilities[0] || facilities[0];

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: trimmedName,
        email: `${trimmedPhone.replace(/\D/g, '') || Date.now()}@healthaccess.uz`,
        phone: trimmedPhone,
        dob: '1990-01-01',
        gender: 'male',
        region: region,
        district: district,
        emergencyContact: {
          name: 'Aloqa shaxsi',
          phone: trimmedPhone,
          relationship: 'Oila'
        },
        role: role,
        avatarUrl: previewImage || avatarUrl
      };

      // If registering as a doctor, save Doctor record to database
      if (role === 'doctor') {
        const facId = targetFacility?.id || 'fac-1';
        const facNameUz = targetFacility?.name?.uz || 'Markaziy Klinik Shifoxona';
        const facNameRu = targetFacility?.name?.ru || 'Центральная Клиническая Больница';
        const facNameDisplay = targetFacility?.name?.[language] || facNameUz;

        const newDoctor: Doctor = {
          id: `doc-${Date.now()}`,
          name: trimmedName,
          specialty: specialty,
          experienceYears: Number(experienceYears) || 1,
          rating: 5.0,
          reviewsCount: 1,
          languages: ["O'zbekcha", "Русский"],
          facilityId: facId,
          facilityName: facNameDisplay,
          photoUrl: previewImage || avatarUrl,
          availableDays: ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"],
          timeSlots: ["09:00", "11:00", "14:00", "16:00"],
          consultationFee: 150000,
          consultationTypes: ["in_person", "chat", "video"],
          about: {
            uz: `${facNameUz}da ${specialty} mutaxassisi.`,
            ru: `Специалист ${specialty} в ${facNameRu}.`
          }
        };

        try {
          const currentDoctors = dbService.getDoctors() || [];
          localStorage.setItem('healthaccess_doctors', JSON.stringify([newDoctor, ...currentDoctors]));
        } catch (err) {
          console.warn('Could not update doctors in local storage', err);
        }
      }

      registerUser(newUser);
      onSuccess();
    } catch (err) {
      console.error('Register error:', err);
      setErrorMessage("Ro'yxatdan o'tishda kutilmagan xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setErrorMessage("Iltimos, telefon raqamingizni kiriting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const existingUser: UserProfile = {
        id: `usr-logged`,
        fullName: fullName.trim() || (role === 'doctor' ? "Dr. Shifokor" : "Foydalanuvchi"),
        email: `${trimmedPhone.replace(/\D/g, '') || Date.now()}@healthaccess.uz`,
        phone: trimmedPhone,
        dob: '1992-05-14',
        gender: 'male',
        region: region,
        district: district,
        emergencyContact: {
          name: 'Oila',
          phone: trimmedPhone,
          relationship: 'Oila'
        },
        role: role,
        avatarUrl: avatarUrl
      };

      registerUser(existingUser);
      onSuccess();
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage("Tizimga kirishda xatolik yuz berdi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md overflow-y-auto p-3 sm:p-4 flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Logo */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#dc2626] mx-auto flex items-center justify-center text-white shadow-xl shadow-red-600/30 animate-bounce">
            <HeartPulse className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Health Access <span className="text-[#dc2626]">.UZ</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tizimdan foydalanish uchun profilingizni tanlang va kiring
          </p>
        </div>

        {/* Mode Switcher: Register / Login */}
        <div className="flex items-center bg-slate-100 dark:bg-neutral-900 p-1 rounded-2xl border border-slate-200 dark:border-neutral-800 mb-4 text-xs font-bold">
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl transition ${
              mode === 'register' ? 'bg-[#dc2626] text-white shadow' : 'text-slate-500 hover:text-white'
            }`}
          >
            Ro'yxatdan o'tish
          </button>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl transition ${
              mode === 'login' ? 'bg-[#dc2626] text-white shadow' : 'text-slate-500 hover:text-white'
            }`}
          >
            Tizimga kirish
          </button>
        </div>

        {/* Role Selector: Patient vs Doctor */}
        <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('patient')}
            className={`p-3 rounded-2xl border flex items-center justify-center space-x-2 transition ${
              role === 'patient'
                ? 'border-[#dc2626] bg-red-50 dark:bg-red-950/40 text-[#dc2626]'
                : 'border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Bemor sifatida</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('doctor')}
            className={`p-3 rounded-2xl border flex items-center justify-center space-x-2 transition ${
              role === 'doctor'
                ? 'border-[#dc2626] bg-red-50 dark:bg-red-950/40 text-[#dc2626]'
                : 'border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Shifokor / Farmatsevt</span>
          </button>
        </div>

        {/* Inline Error Message Alert Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {mode === 'register' ? (
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Avatar Photo Upload (Mandatory for Doctors) */}
            <div className="flex flex-col items-center justify-center">
              <label className="relative cursor-pointer group">
                <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${
                  role === 'doctor' && !previewImage ? 'border-amber-500 animate-pulse' : 'border-[#dc2626]'
                } transition shadow-lg bg-slate-100 dark:bg-neutral-900 flex items-center justify-center`}>
                  {previewImage ? (
                    <img src={previewImage} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <img src={avatarUrl} alt="Avatar Default" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                    <Camera className="w-6 h-6" />
                  </div>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <span className={`text-[11px] font-bold mt-1.5 flex items-center ${
                role === 'doctor' ? 'text-amber-500' : 'text-[#dc2626]'
              }`}>
                <Upload className="w-3.5 h-3.5 mr-1" />
                <span>{role === 'doctor' ? 'Shifokor rasmini yuklash (MAJBURIIY *)' : 'Profil rasmini yuklash (Ixtiyoriy)'}</span>
              </span>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                F.I.SH (Ism-sharif) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => {
                    setFullName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Ism-sharifingizni kiriting"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telefon raqami *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            {/* Doctor-Specific Fields: Specialty & Work Facility */}
            {role === 'doctor' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mutaxassislik
                    </label>
                    <select
                      value={specialty}
                      onChange={e => setSpecialty(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none"
                    >
                      {DOCTOR_SPECIALTIES.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Ish tajribasi (yil)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={experienceYears}
                      onChange={e => setExperienceYears(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Associated Facility Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ishlaydigan Shifoxona, Dorixona yoki Klinika *
                  </label>
                  <select
                    value={selectedFacilityId}
                    onChange={e => setSelectedFacilityId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">-- Muassasangizni tanlang --</option>
                    {regionFacilities.map(fac => (
                      <option key={fac.id} value={fac.id}>
                        {fac.type === 'pharmacy' ? '💊' : '🏥'} {fac.name[language]} ({fac.district})
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Region & District */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Viloyat
                </label>
                <select
                  value={region}
                  onChange={e => {
                    setRegion(e.target.value);
                    const dists = UZBEKISTAN_DISTRICTS_MAP[e.target.value] || [];
                    if (dists.length > 0) setDistrict(dists[0]);
                  }}
                  className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none"
                >
                  {UZBEKISTAN_REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tuman
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none"
                >
                  {availableDistricts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleRegister}
              className="w-full py-3.5 bg-[#dc2626] hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer touch-manipulation disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Ro'yxatga olinmoqda...</span>
              ) : (
                <>
                  <span>{role === 'doctor' ? "Shifokor profilini tasdiqlash va kirish" : "Ro'yxatdan o'tish va kirish"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telefon raqami
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Parol
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleLogin}
              className="w-full py-3.5 bg-[#dc2626] hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer touch-manipulation disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Kirilmoqda...</span>
              ) : (
                <>
                  <span>Tizimga Kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

        {/* Demo Fast Login Option */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-neutral-900 text-center space-y-2">
          <button
            type="button"
            onClick={() => {
              loginAsDemo();
              onSuccess();
            }}
            className="w-full py-2.5 bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-neutral-800 transition flex items-center justify-center space-x-1.5 cursor-pointer touch-manipulation"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Demo Profil sifatida tezda kirish</span>
          </button>

          <button
            type="button"
            onClick={() => {
              loginAsDemo();
              onSuccess('bp');
            }}
            className="w-full py-3 bg-[#dc2626] hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer touch-manipulation"
          >
            <HeartPulse className="w-4 h-4 animate-pulse" />
            <span>🩸 Qon Bosimi Monitorini Ochish (Tezkor)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
