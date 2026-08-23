import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UZBEKISTAN_REGIONS, UZBEKISTAN_DISTRICTS_MAP } from '../../data/mockData';
import { UserProfile } from '../../types';
import {
  HeartPulse,
  User,
  Phone,
  Lock,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';

interface AuthGateModalProps {
  onSuccess: () => void;
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({ onSuccess }) => {
  const { registerUser, loginAsDemo } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<'register' | 'login'>('register');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('Toshkent shahri');
  const [district, setDistrict] = useState('Yunusobod tumani');
  const [avatarUrl, setAvatarUrl] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert("Iltimos, ismingiz va telefon raqamingizni kiriting.");
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: `${phone.replace(/\D/g, '')}@healthaccess.uz`,
      phone: phone.trim(),
      dob: '1995-01-01',
      gender: 'male',
      region: region,
      district: district,
      emergencyContact: {
        name: 'Taqdim etilmadi',
        phone: phone.trim(),
        relationship: 'Yaqin qarindoshi'
      },
      role: 'patient',
      avatarUrl: avatarUrl
    };

    registerUser(newUser);
    onSuccess();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      alert("Iltimos, telefon raqamingizni kiriting.");
      return;
    }

    const existingUser: UserProfile = {
      id: `usr-logged`,
      fullName: fullName.trim() || "Foydalanuvchi",
      email: `${phone.replace(/\D/g, '')}@healthaccess.uz`,
      phone: phone.trim(),
      dob: '1992-05-14',
      gender: 'male',
      region: region,
      district: district,
      emergencyContact: {
        name: 'Yaqin qarindoshi',
        phone: phone.trim(),
        relationship: 'Oila'
      },
      role: 'patient',
      avatarUrl: avatarUrl
    };

    registerUser(existingUser);
    onSuccess();
  };

  const availableDistricts = UZBEKISTAN_DISTRICTS_MAP[region] || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Logo */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#dc2626] mx-auto flex items-center justify-center text-white shadow-xl shadow-red-600/30 animate-bounce">
            <HeartPulse className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Health Access <span className="text-[#dc2626]">.UZ</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ilovaga kirishdan oldin profilingizni yarating
          </p>
        </div>

        {/* Register / Login Switcher Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-neutral-900 p-1 rounded-2xl border border-slate-200 dark:border-neutral-800 mb-6 text-xs font-bold">
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 rounded-xl transition ${
              mode === 'register'
                ? 'bg-[#dc2626] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ro'yxatdan o'tish
          </button>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-xl transition ${
              mode === 'login'
                ? 'bg-[#dc2626] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tizimga kirish
          </button>
        </div>

        {mode === 'register' ? (
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Optional Avatar Photo Upload */}
            <div className="flex flex-col items-center justify-center">
              <label className="relative cursor-pointer group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#dc2626]/30 group-hover:border-[#dc2626] transition shadow-lg bg-slate-100 dark:bg-neutral-900 flex items-center justify-center">
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
              <span className="text-[11px] font-bold text-[#dc2626] mt-1.5 flex items-center space-x-1 cursor-pointer">
                <Upload className="w-3 h-3 mr-1" />
                <span>Profil rasmini yuklash (Ixtiyoriy)</span>
              </span>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                F.I.SH (Ism-sharifingiz) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Masalan: Jasur Rahimov"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

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
                  className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-600"
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
              className="w-full py-3.5 bg-[#dc2626] hover:bg-red-700 text-white font-extrabold text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>Ro'yxatdan o'tish va ilovani ochish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telefon raqamingiz
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#dc2626] hover:bg-red-700 text-white font-extrabold text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>Kirish va Ilovani Ochish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

        {/* Demo Fast Login Option */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-neutral-900 text-center space-y-2">
          <button
            onClick={() => {
              loginAsDemo();
              onSuccess();
            }}
            className="w-full py-2.5 bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl border border-slate-200 dark:border-neutral-800 transition flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Demo Profil sifatida tezda kirish</span>
          </button>
        </div>

      </div>
    </div>
  );
};
