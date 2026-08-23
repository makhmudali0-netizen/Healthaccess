import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { FamilyMember } from '../../types';
import { Users, Plus, ShieldCheck, Heart, Lock, Calendar, Syringe, UserCheck, X } from 'lucide-react';

export const FamilyHealthView: React.FC = () => {
  const { t, language } = useLanguage();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => dbService.getFamilyMembers());
  const [activeMember, setActiveMember] = useState<FamilyMember | null>(familyMembers[0] || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New family member form state
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<'father' | 'mother' | 'spouse' | 'child' | 'dependent'>('child');
  const [dob, setDob] = useState('2022-01-01');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bloodType, setBloodType] = useState('O(I)+');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember = dbService.addFamilyMember({
      mainUserId: 'usr-001',
      name,
      relation,
      dob,
      gender,
      bloodType,
      avatarUrl: gender === 'male'
        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    });

    setFamilyMembers([...familyMembers, newMember]);
    setActiveMember(newMember);
    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
            {t('family.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('family.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('family.addMember')}</span>
        </button>
      </div>

      {/* Adult Privacy Consent Notice Banner */}
      <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl text-xs text-blue-800 dark:text-blue-200 flex items-center space-x-2">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        <span>{t('family.privacyNotice')}</span>
      </div>

      {/* Member Selection Chips */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {familyMembers.map(mem => (
          <button
            key={mem.id}
            onClick={() => setActiveMember(mem)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 shrink-0 border ${
              activeMember?.id === mem.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <img src={mem.avatarUrl} alt={mem.name} className="w-6 h-6 rounded-full object-cover" />
            <span>{mem.name} ({mem.relation})</span>
          </button>
        ))}
      </div>

      {/* Selected Member Profile Card & Dashboard */}
      {activeMember && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fade-in">
          <div className="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <img src={activeMember.avatarUrl} alt={activeMember.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500" />
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{activeMember.name}</h2>
              <p className="text-xs text-blue-600 font-semibold uppercase">{activeMember.relation} • DOB: {activeMember.dob}</p>
              <p className="text-xs text-slate-500 mt-0.5">Qon guruhi: {activeMember.bloodType || "Noma'lum"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Upcoming Vaccines Widget */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center">
                <Syringe className="w-4 h-4 mr-1.5 text-blue-600" />
                Rejalashtirilgan Emlashlar
              </h4>
              {activeMember.relation === 'child' ? (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-blue-600">Penta-1 Vaksina</p>
                  <p className="text-[11px] text-slate-500">Tavsiya etilgan muddat: 2 oylikda</p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-2">Emlash eslatmalari mavjud emas</p>
              )}
            </div>

            {/* Medical Access Control Widget */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-1.5 text-amber-500" />
                Ruxsatlar va Maxfiylik
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {activeMember.relation === 'child'
                  ? "Ota-ona vakilligi ostida to'liq tibbiy kartani boshqarish huquqiga egasiz."
                  : "Katta yoshli oila a'zosi ruxsati bilan faqat ulashilgan tibbiy yozuvlar ko'rinadi."}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Add Family Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">
              Oila a'zosini qo'shish
            </h2>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">F.I.SH:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ism-sharifini kiriting"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Qarindoshlik darajasi:</label>
                <select
                  value={relation}
                  onChange={e => setRelation(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="father">Otam</option>
                  <option value="mother">Onam</option>
                  <option value="spouse">Turmush o'rtog'im</option>
                  <option value="child">Farzandim</option>
                  <option value="dependent">Qaramog'imdagi shaxs</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Tug'ilgan sana:</label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition"
              >
                Qo'shish
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
