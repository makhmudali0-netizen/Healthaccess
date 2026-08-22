import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Smartphone, X, CheckCircle2 } from 'lucide-react';

export const SMSToast: React.FC = () => {
  const { activeToast, closeToast } = useNotifications();

  if (!activeToast) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white rounded-xl shadow-2xl border border-teal-500/40 p-4 animate-bounce-short">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 text-teal-400">
          <Smartphone className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            SMS Yuborildi (Uzmobile / Beeline)
          </span>
        </div>
        <button
          onClick={closeToast}
          className="text-slate-400 hover:text-white transition p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-xs text-slate-300">
          Qabul qiluvchi: <span className="font-mono text-teal-300">{activeToast.toPhone}</span>
        </p>
        <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 text-xs text-slate-100 font-sans leading-relaxed">
          {activeToast.body}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center text-teal-400">
          <CheckCircle2 className="w-3 h-3 mr-1" /> SMS provayder tomonidan yetkazildi
        </span>
        <span>{activeToast.timestamp}</span>
      </div>
    </div>
  );
};
