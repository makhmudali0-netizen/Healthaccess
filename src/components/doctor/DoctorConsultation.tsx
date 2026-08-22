import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { dbService } from '../../services/dbService';
import { Doctor } from '../../types';
import {
  Stethoscope,
  Video,
  MessageSquare,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Star,
  Clock,
  Send,
  X,
  UserCheck
} from 'lucide-react';

export const DoctorConsultation: React.FC = () => {
  const { t, language } = useLanguage();
  const doctors = dbService.getDoctors();

  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);
  const [activeMode, setActiveMode] = useState<'chat' | 'video' | null>(null);

  // Video call controls
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'doctor'; text: string; time: string }>>([
    {
      sender: 'doctor',
      text: language === 'uz'
        ? "Assalomu alaykum! Men shifokor Alisher Toshmatov man. Qanday shikoyatlaringiz bor?"
        : "Здравствуйте! Я врач Алишер Ташматов. На что жалуетесь?",
      time: '10:00'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: now }]);
    setChatInput('');

    // Doctor auto reply simulation
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'doctor',
          text: language === 'uz'
            ? "Tushundim. Ushbu holatda qon bosimini o'lchash va 2 kun davomida ko'rik qilishingizni maslahat beraman."
            : "Понял вас. В данном случае рекомендую измерять давление и вести дневник наблюдений 2 дня.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
          <Stethoscope className="w-8 h-8 mr-3 text-indigo-600 dark:text-indigo-400" />
          {t('doctorChat.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('doctorChat.subtitle')}
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doc => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start space-x-4">
                <img
                  src={doc.photoUrl}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shrink-0"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {doc.specialty}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {doc.experienceYears} {t('doctorChat.experience')} • ★ {doc.rating} ({doc.reviewsCount})
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-4 line-clamp-2">
                {doc.about[language]}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                <span>{t('doctorChat.consultationFee')}:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                  {doc.consultationFee.toLocaleString('uz-UZ')} UZS
                </span>
              </div>
            </div>

            {/* Consultation Action Buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
              <button
                onClick={() => {
                  setActiveDoctor(doc);
                  setActiveMode('chat');
                }}
                className="flex-1 py-2.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>

              <button
                onClick={() => {
                  setActiveDoctor(doc);
                  setActiveMode('video');
                }}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1"
              >
                <Video className="w-4 h-4" />
                <span>Video</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Active Consultation Modal (Chat / Video UI) */}
      {activeDoctor && activeMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full h-[600px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={activeDoctor.photoUrl} alt={activeDoctor.name} className="w-10 h-10 rounded-full object-cover border border-indigo-400" />
                <div>
                  <h3 className="font-bold text-sm">{activeDoctor.name}</h3>
                  <p className="text-xs text-indigo-300">{activeDoctor.specialty} • {activeMode === 'video' ? 'Video muloqot' : 'Onlayn Chat'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveDoctor(null);
                  setActiveMode(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* VIDEO CONSULTATION UI MODE */}
            {activeMode === 'video' && (
              <div className="flex-1 bg-slate-950 relative flex flex-col justify-between p-6 text-white">
                
                {/* Doctor Video Feed Simulation */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <img
                    src={activeDoctor.photoUrl}
                    alt={activeDoctor.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-800 text-xs flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>04:12 • Video Ulanish Aloqa Shifrlangan</span>
                  </div>

                  {/* Patient Self Camera Preview Overlay */}
                  <div className="absolute bottom-4 right-4 w-32 h-44 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-2xl bg-slate-950">
                    {isCamOn ? (
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                        alt="Patient"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                        Kamera o'chiq
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-3 rounded-full transition ${isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'}`}
                  >
                    {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setIsCamOn(!isCamOn)}
                    className={`p-3 rounded-full transition ${isCamOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'}`}
                  >
                    {isCamOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => {
                      setActiveDoctor(null);
                      setActiveMode(null);
                    }}
                    className="p-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>
                </div>

              </div>
            )}

            {/* CHAT CONSULTATION UI MODE */}
            {activeMode === 'chat' && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`p-3 rounded-2xl text-xs max-w-md ${
                          m.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1">{m.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChatMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Shifokorga xabar yozing..."
                    className="flex-1 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                  <button type="submit" className="p-3 bg-indigo-600 text-white rounded-xl">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
