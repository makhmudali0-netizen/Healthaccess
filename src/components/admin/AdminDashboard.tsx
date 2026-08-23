import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { Shield, Building2, Stethoscope, Users, Calendar, Plus, CheckCircle2, X } from 'lucide-react';
import { Facility } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const [facilities, setFacilities] = useState<Facility[]>(() => dbService.getFacilities());
  const doctors = dbService.getDoctors();
  const appointments = dbService.getAppointments();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRegion, setNewRegion] = useState('Toshkent shahri');
  const [newDistrict, setNewDistrict] = useState('Yunusobod tumani');
  const [newType, setNewType] = useState<'hospital' | 'pharmacy' | 'clinic' | 'laboratory'>('hospital');

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newFac: Facility = {
      id: `fac-${Date.now()}`,
      name: { uz: newName, ru: newName },
      type: newType,
      region: newRegion,
      district: newDistrict,
      address: { uz: `${newDistrict}, ${newName}`, ru: `${newDistrict}, ${newName}` },
      phone: "+998 71 200 00 00",
      workingHours: { weekdays: "08:00 - 20:00", saturday: "09:00 - 15:00", sunday: "Yopiq", is24_7: false },
      coordinates: { lat: 41.3111, lng: 69.2797 },
      emergency24_7: false,
      departments: ["Umumiy terapiya"],
      services: { uz: ["Konsultatsiya"], ru: ["Консультация"] },
      isDemo: true,
      rating: 5.0,
      imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=400&q=80"
    };

    const updated = dbService.saveFacility(newFac);
    setFacilities(updated);
    setIsAddModalOpen(false);
    setNewName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Admin Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
            <Shield className="w-8 h-8 mr-3 text-amber-500" />
            {t('admin.title')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Health Access ekotizimi ko'rsatkichlari va tibbiyot maskanlari boshqaruvi
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t('admin.addFacilityBtn')}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">{t('admin.totalUsers')}</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">12,480</p>
          <span className="text-[10px] text-emerald-600 font-bold">+14% o'sish</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">{t('admin.totalHospitals')}</span>
          <p className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">{facilities.length}</p>
          <span className="text-[10px] text-slate-400">12 viloyat bo'yicha</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">{t('admin.appointmentsToday')}</span>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{appointments.length}</p>
          <span className="text-[10px] font-semibold text-indigo-500">Faol qabullar</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">{t('admin.activeConsultations')}</span>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">34</p>
          <span className="text-[10px] text-rose-500 font-bold">Onlayn muloqotda</span>
        </div>
      </div>

      {/* Facilities Manager Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
          <span>{t('admin.manageFacilities')}</span>
          <span className="text-xs text-slate-400 font-normal">Ro'yxatdagi maskanlar: {facilities.length} ta</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">Muassasa nomi</th>
                <th className="p-4">Turi</th>
                <th className="p-4">Viloyat / Tuman</th>
                <th className="p-4">Aloqa</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {facilities.map(fac => (
                <tr key={fac.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{fac.name[language]}</td>
                  <td className="p-4 uppercase font-semibold text-teal-600">{fac.type}</td>
                  <td className="p-4 text-slate-500">{fac.region}, {fac.district}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{fac.phone}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Faol
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Facility Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">
              Yangi muassasa qo'shish
            </h2>

            <form onSubmit={handleAddFacility} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Muassasa nomi:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Muassasa nomini kiriting"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Muassasa turi:</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="hospital">Shifoxona</option>
                  <option value="pharmacy">Dorixona</option>
                  <option value="clinic">Klinika</option>
                  <option value="laboratory">Laboratoriya</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Tuman:</label>
                <input
                  type="text"
                  value={newDistrict}
                  onChange={e => setNewDistrict(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl shadow transition"
              >
                Muassasani saqlash
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
