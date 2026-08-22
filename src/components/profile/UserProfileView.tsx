import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { UZBEKISTAN_REGIONS } from '../../data/mockData';
import { User, Phone, MapPin, ShieldAlert, LogOut, CheckCircle2 } from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateProfile, logout } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [region, setRegion] = useState(user?.region || 'Toshkent shahri');
  const [district, setDistrict] = useState(user?.district || 'Yunusobod tumani');
  const [emergencyName, setEmergencyName] = useState(user?.emergencyContact.name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContact.phone || '');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      phone,
      region,
      district,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relationship: user?.emergencyContact.relationship || "Qarindosh"
      }
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
            alt={user?.fullName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500 shadow"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {user?.fullName}
            </h1>
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
              {user?.phone} • {user?.email}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {user?.region}, {user?.district}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-xl transition flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('auth.logout')}</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-2xl flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profil ma'lumotlari muvaffaqiyatli saqlandi!</span>
        </div>
      )}

      {/* Edit Profile Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">
          Profil ma'lumotlarini tahrirlash
        </h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">F.I.SH:</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Telefon raqam:</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Viloyat:</label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
              >
                {UZBEKISTAN_REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Tuman:</label>
              <input
                type="text"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-500" />
              Shoshilinch aloqa shaxsi (Emergency Contact)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Ism-sharifi:</label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={e => setEmergencyName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Telefon raqami:</label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={e => setEmergencyPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-lg transition"
          >
            Ma'lumotlarni saqlash
          </button>
        </form>
      </div>

    </div>
  );
};
