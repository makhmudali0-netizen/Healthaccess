import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { UZBEKISTAN_REGIONS } from '../../data/mockData';
import { Facility, FacilityType } from '../../types';
import {
  MapPin,
  Building2,
  Pill,
  Clock,
  Phone,
  Navigation,
  Filter,
  Check,
  Search,
  ShieldAlert,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface InteractiveMapProps {
  onBookAppointment?: (facilityId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onBookAppointment }) => {
  const { t, language } = useLanguage();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("Toshkent shahri");
  const [selectedType, setSelectedType] = useState<FacilityType | 'all'>('all');
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [routeSimulation, setRouteSimulation] = useState<string | null>(null);

  useEffect(() => {
    setFacilities(dbService.getFacilities());
  }, []);

  const filteredFacilities = facilities.filter(f => {
    if (selectedRegion && f.region !== selectedRegion) return false;
    if (selectedType !== 'all' && f.type !== selectedType) return false;
    if (onlyEmergency && !f.emergency24_7) return false;
    return true;
  });

  const getMarkerIcon = (type: FacilityType) => {
    switch (type) {
      case 'hospital': return '🏥';
      case 'pharmacy': return '💊';
      case 'clinic': return '🏨';
      case 'laboratory': return '🧪';
      default: return '📍';
    }
  };

  const getMarkerColor = (type: FacilityType) => {
    switch (type) {
      case 'hospital': return 'bg-rose-500 text-white shadow-rose-500/30';
      case 'pharmacy': return 'bg-emerald-500 text-white shadow-emerald-500/30';
      case 'clinic': return 'bg-blue-500 text-white shadow-blue-500/30';
      case 'laboratory': return 'bg-purple-500 text-white shadow-purple-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-teal-600 dark:text-teal-400" />
            {t('map.title')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            O'zbekiston viloyatlari bo'yicha shifoxonalar, dorixonalar va klinikalar joylashuvi
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
          >
            {UZBEKISTAN_REGIONS.map(reg => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>

          {/* Type Filters */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${selectedType === 'all' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setSelectedType('hospital')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${selectedType === 'hospital' ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              🏥 Shifoxona
            </button>
            <button
              onClick={() => setSelectedType('pharmacy')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${selectedType === 'pharmacy' ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              💊 Dorixona
            </button>
          </div>
        </div>
      </div>

      {/* Map + List Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
        
        {/* Interactive Vector Map Canvas Box */}
        <div className="lg:col-span-2 relative bg-slate-900 text-white overflow-hidden flex flex-col justify-between p-6">
          
          {/* Grid pattern background simulating vector map */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
          
          {/* Map Top Overlay Controls */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800 text-xs flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-300">GPS: {selectedRegion}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setOnlyEmergency(!onlyEmergency)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  onlyEmergency
                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg'
                    : 'bg-slate-950/80 backdrop-blur text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                🚨 24/7 Tez Yordam
              </button>
            </div>
          </div>

          {/* Interactive Simulated Marker Plotting */}
          <div className="relative z-10 my-auto h-80 border border-slate-800/80 rounded-2xl bg-slate-950/40 backdrop-blur p-4 overflow-hidden flex items-center justify-center">
            {/* Roads SVG Background simulation */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-800/60 stroke-[1.5] fill-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 100 Q 200 150 400 80 T 800 200" />
              <path d="M 150 0 Q 180 200 250 400" />
              <path d="M 500 0 Q 450 180 600 400" />
            </svg>

            {/* Render Facility Markers */}
            <div className="relative w-full h-full">
              {filteredFacilities.map((fac, idx) => {
                const posX = (idx * 28 + 15) % 80 + 10;
                const posY = (idx * 35 + 20) % 70 + 15;
                const isSelected = selectedFacility?.id === fac.id;

                return (
                  <div
                    key={fac.id}
                    onClick={() => setSelectedFacility(fac)}
                    style={{ left: `${posX}%`, top: `${posY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className={`px-2.5 py-1.5 rounded-2xl shadow-xl font-extrabold text-xs flex items-center space-x-1 border border-white/20 ${getMarkerColor(fac.type)}`}>
                      <span>{getMarkerIcon(fac.type)}</span>
                      <span className="hidden sm:inline text-[11px] font-medium max-w-[100px] truncate">
                        {fac.name[language]}
                      </span>
                    </div>

                    {/* Tooltip on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded-lg whitespace-nowrap shadow-2xl border border-slate-700">
                      <p className="font-bold">{fac.name[language]}</p>
                      <p className="text-slate-400">{fac.address[language]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Footer Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between text-xs text-slate-400 bg-slate-950/80 backdrop-blur p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-rose-500 mr-1.5" /> Shifoxona</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5" /> Dorixona</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-1.5" /> Klinika</span>
            </div>
            <span>Jami: {filteredFacilities.length} ta maskan</span>
          </div>
        </div>

        {/* Side Info & Facility List */}
        <div className="bg-white dark:bg-slate-900 p-4 overflow-y-auto flex flex-col justify-between space-y-4">
          {selectedFacility ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                    {selectedFacility.type}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">
                    {selectedFacility.name[language]}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={selectedFacility.imageUrl}
                alt={selectedFacility.name[language]}
                className="w-full h-36 object-cover rounded-xl border border-slate-200 dark:border-slate-800"
              />

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 text-teal-600 mr-2 shrink-0 mt-0.5" />
                  <span>{selectedFacility.address[language]}</span>
                </p>
                <p className="flex items-center">
                  <Clock className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                  <span>{selectedFacility.workingHours.is24_7 ? '24/7 Ochiq' : selectedFacility.workingHours.weekdays}</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                  <a href={`tel:${selectedFacility.phone}`} className="font-semibold text-teal-600 hover:underline">
                    {selectedFacility.phone}
                  </a>
                </p>
              </div>

              {/* Direction Route Button */}
              <button
                onClick={() => setRouteSimulation(`Masofa: ~2.4 km | Vaqt: 8 daqiqa (Avtomobilda)`)}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('nearbyHealthcare.getDirections')}</span>
              </button>

              {routeSimulation && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 font-medium animate-fade-in">
                  🚗 {routeSimulation}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b pb-2 dark:border-slate-800">
                Ro'yxatdagi maskanlar ({filteredFacilities.length})
              </h3>

              <div className="space-y-2 max-h-[480px] overflow-y-auto">
                {filteredFacilities.map(fac => (
                  <div
                    key={fac.id}
                    onClick={() => setSelectedFacility(fac)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700/80 cursor-pointer transition border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {fac.name[language]}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {fac.district}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
