import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { processAIMessage, SUGGESTED_PROMPTS } from '../../services/aiService';
import { AIChatMessage } from '../../types';
import {
  Bot,
  Send,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  User,
  Trash2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface HealthAIChatProps {
  onNavigateToTab?: (tab: string) => void;
}

export const HealthAIChat: React.FC<HealthAIChatProps> = ({ onNavigateToTab }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: language === 'uz'
        ? "Assalomu alaykum! Men Health AI yordamchisiman. Sog'lig'ingiz bo'yicha alomatlar, birinchi yordam va ko'rsatmalarni so'rashingiz mumkin. Qanday yordam bera olaman?"
        : "Здравствуйте! Я ассистент Health AI. Вы можете спросить о симптомах, первой помощи и рекомендациях. Чем могу помочь?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    const aiResponse = await processAIMessage(query, language);
    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: language === 'uz'
          ? "Suhbat tarixi tozalandi. Yangi savolingizni berishingiz mumkin."
          : "История диалога очищена. Можете задать новый вопрос.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-gradient-to-r from-teal-700 to-teal-900 text-white p-5 rounded-3xl shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Bot className="w-7 h-7 text-teal-200 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold flex items-center">
              {t('healthAi.title')} <Sparkles className="w-4 h-4 ml-1 text-amber-300" />
            </h1>
            <p className="text-xs text-teal-100 mt-0.5">
              {t('healthAi.subtitle')}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          title={t('healthAi.clearHistory')}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 p-3 rounded-2xl text-xs text-amber-800 dark:text-amber-200 flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>{t('healthAi.disclaimer')}</span>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[520px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    : 'bg-teal-600 text-white shadow-md'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div className={`max-w-xl space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.isEmergencyWarning
                      ? 'bg-rose-600 text-white font-semibold'
                      : msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Emergency Trigger Action Button */}
                {msg.suggestedAction?.type === 'call_103' && (
                  <a
                    href="tel:103"
                    className="inline-flex items-center space-x-2 bg-white text-rose-700 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg hover:bg-rose-50 transition"
                  >
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    <span>{t('healthAi.emergencyAlertBtn')}</span>
                  </a>
                )}

                {/* Suggested Action to navigate */}
                {msg.suggestedAction?.type === 'view_first_aid' && onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('firstAid')}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline pt-1"
                  >
                    <span>Birinchi yordam maqolasini o'qish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {msg.suggestedAction?.type === 'book_appointment' && onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('appointments')}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline pt-1"
                  >
                    <span>Shifokor qabuliga yozilish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <span className="text-[10px] text-slate-400 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
              <Bot className="w-4 h-4 text-teal-600 animate-spin" />
              <span>Health AI yozmoqda...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {t('healthAi.suggestedTitle')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_PROMPTS[language].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={t('healthAi.inputPlaceholder')}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-2xl shadow transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};
