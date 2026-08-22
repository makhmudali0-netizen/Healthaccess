import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('healthaccess_lang') as Language;
    return saved || 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('healthaccess_lang', lang);
  };

  const t = (keyPath: string): string => {
    const localeObj = getTranslation(language);
    const keys = keyPath.split('.');
    let current: any = localeObj;

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return keyPath; // fallback
      }
    }
    return typeof current === 'string' ? current : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
