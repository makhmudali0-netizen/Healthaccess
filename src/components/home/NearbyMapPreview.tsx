import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { MapPin, Building2, Phone, Clock, ArrowRight, ShieldAlert } from 'lucide-react';

interface NearbyMapPreviewProps {
  setActiveTab: (tab: string) => void;
}

export const NearbyMapPreview: React.FC<NearbyMapPreviewProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const facilities = dbService.getFacilities().slice(0, 3);

  return (
    <section className="py-12 bg-slate-50 dark:bg-black border-b border-slate-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-teal-600 dark:text-teal-400" />
              {t('nearbyHealthcare.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('nearbyHealthcare.subtitle')}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('map')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition shrink-0"
          >
            <span>{t('nearbyHealthcare.viewOnMap')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map(facility => (
            <div
              key={facility.id}
              onClick={() => setActiveTab('map')}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={facility.imageUrl}
                  alt={facility.name[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    {facility.type}
                  </span>
                  {facility.emergency24_7 && (
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center">
                      <ShieldAlert className="w-3 h-3 mr-1" /> 24/7 Tez Yordam
                    </span>
                  )}
                </div>
                {facility.isDemo && (
                  <span className="absolute bottom-2 right-2 bg-slate-900/60 text-slate-300 text-[9px] font-mono px-2 py-0.5 rounded">
                    Demo ma'lumot
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition line-clamp-1">
                    {facility.name[language]}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-start">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0 mt-0.5" />
                    <span>{facility.address[language]}</span>
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {facility.workingHours.is24_7 ? '24/7 Ochiq' : facility.workingHours.weekdays}
                    </span>
                    <span className="flex items-center text-slate-500">
                      <Phone className="w-3.5 h-3.5 mr-1" />
                      {facility.phone}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    ★ {facility.rating} / 5.0
                  </span>
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold group-hover:underline flex items-center">
                    {t('nearbyHealthcare.getDirections')} <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
