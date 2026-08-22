import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { UZBEKISTAN_REGIONS } from '../../data/mockData';
import { Facility, FacilityType } from '../../types';
import {
  Building2,
  Pill,
  Search,
  MapPin,
  Clock,
  Phone,
  ShieldAlert,
  Calendar,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';

interface FacilityDirectoryProps {
  onSelectFacilityForAppointment?: (facility: Facility) => void;
}

export const FacilityDirectory: React.FC<FacilityDirectoryProps> = ({
  onSelectFacilityForAppointment
}) => {
  const { t, language } = useLanguage();
  const [facilities, setFacilities] = useState<Facility[]>(() => dbService.getFacilities());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState<FacilityType | 'all'>('all');
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [activeDetailFacility, setActiveDetailFacility] = useState<Facility | null>(null);

  const lowerQuery = searchQuery.toLowerCase().trim();

  const filteredFacilities = facilities.filter(fac => {
    if (selectedRegion !== 'all' && fac.region !== selectedRegion) return false;
    if (selectedType !== 'all' && fac.type !== selectedType) return false;
    if (onlyEmergency && !fac.emergency24_7) return false;
    if (lowerQuery) {
      const name = fac.name[language].toLowerCase();
      const addr = fac.address[language].toLowerCase();
      const depts = fac.departments.join(' ').toLowerCase();
      return name.includes(lowerQuery) || addr.includes(lowerQuery) || depts.includes(lowerQuery);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
          <Building2 className="w-8 h-8 mr-3 text-teal-600 dark:text-teal-400" />
          {t('facilities.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          O'zbekistondagi barcha hududiy shifoxonalar, klinikalar va dorixonalar ma'lumotlar bazasi
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('facilities.searchPlaceholder')}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Region filter */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-500">{t('facilities.filterByRegion')}:</span>
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="all">Barcha viloyatlar</option>
              {UZBEKISTAN_REGIONS.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          {/* Type filter buttons */}
          <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedType === 'all' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              {t('facilities.allTypes')}
            </button>
            <button
              onClick={() => setSelectedType('hospital')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedType === 'hospital' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              🏥 {t('facilities.hospitals')}
            </button>
            <button
              onClick={() => setSelectedType('pharmacy')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedType === 'pharmacy' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              💊 {t('facilities.pharmacies')}
            </button>
            <button
              onClick={() => setSelectedType('clinic')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${selectedType === 'clinic' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              🏨 {t('facilities.clinics')}
            </button>
          </div>

          {/* Emergency 24/7 check */}
          <button
            onClick={() => setOnlyEmergency(!onlyEmergency)}
            className={`px-3 py-2 rounded-xl font-bold transition border ${
              onlyEmergency
                ? 'bg-rose-600 text-white border-rose-500 shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            🚨 24/7 Tez Yordam
          </button>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map(fac => (
          <div
            key={fac.id}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48">
                <img
                  src={fac.imageUrl}
                  alt={fac.name[language]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {fac.type}
                  </span>
                  {fac.emergency24_7 && (
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center">
                      <ShieldAlert className="w-3 h-3 mr-1" /> 24/7 Shoshilinch
                    </span>
                  )}
                </div>
                {fac.isDemo && (
                  <span className="absolute bottom-2 right-2 bg-slate-900/60 text-slate-300 text-[9px] font-mono px-2 py-0.5 rounded">
                    Demo ma'lumot
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {fac.name[language]}
                </h3>
                <p className="text-xs font-medium text-teal-600 dark:text-teal-400 mt-0.5">
                  {fac.region}, {fac.district}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-start">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0 mt-0.5" />
                  <span>{fac.address[language]}</span>
                </p>

                {/* Departments chips */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {fac.departments.slice(0, 3).map(dept => (
                    <span
                      key={dept}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium"
                    >
                      {dept}
                    </span>
                  ))}
                  {fac.departments.length > 3 && (
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md">
                      +{fac.departments.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="p-5 pt-0 flex items-center space-x-2">
              <button
                onClick={() => setActiveDetailFacility(fac)}
                className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition text-center"
              >
                Batafsil
              </button>

              {onSelectFacilityForAppointment && fac.type !== 'pharmacy' && (
                <button
                  onClick={() => onSelectFacilityForAppointment(fac)}
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition text-center flex items-center justify-center space-x-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('facilities.bookNow')}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Facility Detail Modal */}
      {activeDetailFacility && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveDetailFacility(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeDetailFacility.imageUrl}
              alt={activeDetailFacility.name[language]}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {activeDetailFacility.name[language]}
            </h2>
            <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-1">
              {activeDetailFacility.region}, {activeDetailFacility.district}
            </p>

            <div className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300 border-t border-b border-slate-100 dark:border-slate-800 py-4">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 text-teal-600 mr-2 shrink-0 mt-0.5" />
                <span>{activeDetailFacility.address[language]}</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                <a href={`tel:${activeDetailFacility.phone}`} className="font-semibold text-teal-600 hover:underline">
                  {activeDetailFacility.phone}
                </a>
              </p>
              <p className="flex items-center">
                <Clock className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                <span>Ish vaqti: {activeDetailFacility.workingHours.is24_7 ? '24/7 Ochiq' : activeDetailFacility.workingHours.weekdays}</span>
              </p>
            </div>

            {/* Services List */}
            <div className="mt-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                Xizmatlar va imkoniyatlar
              </h4>
              <ul className="space-y-1.5">
                {activeDetailFacility.services[language].map(srv => (
                  <li key={srv} className="text-xs text-slate-700 dark:text-slate-300 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {onSelectFacilityForAppointment && activeDetailFacility.type !== 'pharmacy' && (
              <button
                onClick={() => {
                  const target = activeDetailFacility;
                  setActiveDetailFacility(null);
                  onSelectFacilityForAppointment(target);
                }}
                className="mt-6 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Ushbu shifoxonaga qabulga yozilish</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
