import React, { useEffect, useState } from 'react';
import { HeartPulse, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { t } = useLanguage();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 600); // match transition duration
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-600 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Main Logo & Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 space-y-6">
        
        {/* Animated Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-teal-600 flex items-center justify-center shadow-2xl shadow-teal-500/40 animate-bounce">
          <HeartPulse className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white flex items-center justify-center">
            Health Access <span className="text-teal-400 ml-1.5 font-bold text-2xl sm:text-4xl">.UZ</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-medium max-w-sm">
            {t('appTagline')}
          </p>
        </div>

        {/* Subtitle Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-teal-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>O'zbekiston Milliy Tibbiyot Portali</span>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full animate-pulse w-full transition-all duration-1000" />
        </div>

      </div>
    </div>
  );
};
