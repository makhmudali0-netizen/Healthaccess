import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { Search, X, Building2, Stethoscope, HeartPulse, FileText, Pill } from 'lucide-react';
import { Facility, Doctor, FirstAidArticle } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: string, id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [firstAid, setFirstAid] = useState<FirstAidArticle[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFacilities(dbService.getFacilities());
      setDoctors(dbService.getDoctors());
      setFirstAid(dbService.getFirstAidArticles());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const lowerQuery = query.toLowerCase().trim();

  const filteredFacilities = lowerQuery
    ? facilities.filter(
        f =>
          f.name[language].toLowerCase().includes(lowerQuery) ||
          f.region.toLowerCase().includes(lowerQuery) ||
          f.district.toLowerCase().includes(lowerQuery)
      )
    : [];

  const filteredDoctors = lowerQuery
    ? doctors.filter(
        d =>
          d.name.toLowerCase().includes(lowerQuery) ||
          d.specialty.toLowerCase().includes(lowerQuery)
      )
    : [];

  const filteredFirstAid = lowerQuery
    ? firstAid.filter(
        fa =>
          fa.title[language].toLowerCase().includes(lowerQuery) ||
          fa.symptoms[language].some(s => s.toLowerCase().includes(lowerQuery))
      )
    : [];

  const hasResults =
    filteredFacilities.length > 0 || filteredDoctors.length > 0 || filteredFirstAid.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('search.globalPlaceholder')}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-slate-400 text-sm">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30 text-teal-500" />
              <p>Nima qidirayotganingizni yozing (Shifoxona, Shifokor, Birinchi yordam)...</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["1-Shifoxona", "Kardiolog", "Burun qonashi", "OXYmed"].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-8 text-slate-400 text-sm">
              <p>{t('search.noResults')} "{query}"</p>
            </div>
          )}

          {/* Hospitals & Pharmacies */}
          {filteredFacilities.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1.5 text-teal-500" /> {t('facilities.title')}
              </h4>
              <div className="space-y-1.5">
                {filteredFacilities.map(fac => (
                  <div
                    key={fac.id}
                    onClick={() => {
                      onSelectResult('facility', fac.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition border border-transparent hover:border-teal-200 dark:hover:border-teal-900"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                        {fac.type === 'hospital' ? '🏥' : fac.type === 'pharmacy' ? '💊' : '🏨'}
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {fac.name[language]}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {fac.region}, {fac.district}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                      {fac.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctors */}
          {filteredDoctors.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-teal-500" /> {t('nav.appointments')}
              </h4>
              <div className="space-y-1.5">
                {filteredDoctors.map(doc => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectResult('doctor', doc.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-teal-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition border border-transparent hover:border-teal-200 dark:hover:border-teal-900"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {doc.name}
                        </h5>
                        <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                          {doc.specialty} • {doc.facilityName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      ★ {doc.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* First Aid Articles */}
          {filteredFirstAid.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center">
                <HeartPulse className="w-3.5 h-3.5 mr-1.5 text-rose-500" /> {t('firstAid.title')}
              </h4>
              <div className="space-y-1.5">
                {filteredFirstAid.map(fa => (
                  <div
                    key={fa.id}
                    onClick={() => {
                      onSelectResult('firstAid', fa.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition border border-transparent hover:border-rose-200 dark:hover:border-rose-950"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {fa.title[language]}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {fa.category}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      Birinchi yordam
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Keyboard shortcut footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Yopish uchun <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd> bosing</span>
          <span>Health Access Quick Index</span>
        </div>
      </div>
    </div>
  );
};
