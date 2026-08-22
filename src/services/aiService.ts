import { AIChatMessage, Language } from '../types';

export const SUGGESTED_PROMPTS = {
  uz: [
    "Qorin o'ng tomoni og'risa nima qilish kerak?",
    "Bolalarda harorat 38.5 bo'lsa birinchi yordam",
    "Burun qonaganda nima qilish taqiqlanadi?",
    "Toshkentda 24/7 ishlaydigan shifoxonalar"
  ],
  ru: [
    "Что делать при боли в правом боку?",
    "Первая помощь при температуре 38.5 у ребенка",
    "Что нельзя делать при носовом кровотечении?",
    "Круглосуточные больницы в Ташкенте"
  ]
};

const EMERGENCY_KEYWORDS = [
  // Uzbek
  "ko'krak og'rig'i", "yurak xuruji", "hushdan ketish", "nafas qisishi", "qon qusish", "insult", "falaj",
  // Russian
  "боль в груди", "инфаркт", "потеря сознания", "удушье", "рвота кровью", "инсульт", "паралич"
];

export async function processAIMessage(
  userText: string,
  lang: Language
): Promise<AIChatMessage> {
  const lowerText = userText.toLowerCase();
  
  // Check for emergency red flags
  const isEmergency = EMERGENCY_KEYWORDS.some(kw => lowerText.includes(kw));

  // Simulate network delay for real AI experience
  await new Promise(res => setTimeout(res, 800));

  if (isEmergency) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: lang === 'uz'
        ? "⚠️ SHOSHILINCH TI BBIY ALOMAT! Siz bildirgan alomatlar (ko'krak og'rig'i, nafas qisishi yoki hush ketishi) hayot uchun o'ta xavfli bo'lishi mumkin. Darhol 103 Tez Yordam xizmatiga qo'ng'iroq qiling yoki eng yaqin shoshilinch tibbiyot markaziga boring!"
        : "⚠️ ОПАСНЫЙ СИМПТОМ! Указанные симптомы (боль в груди, удушье, потеря сознания) могут представлять угрозу для жизни. Немедленно звоните в Скорую помощь по номеру 103!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEmergencyWarning: true,
      suggestedAction: {
        type: 'call_103'
      }
    };
  }

  // Symptom Match logic
  if (lowerText.includes('qorin') || lowerText.includes('живот') || lowerText.includes('боку')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: lang === 'uz'
        ? "Qorin og'rig'ining bir nechta sabablari bo'lishi mumkin. Birinchi navbatda:\n1. Bemorga tinch yotish holatini bering.\n2. Qoringa ISSIQ grelka qo'ymang va o'tkir dori ichmang.\n3. Og'riq o'ng tomonga o'tib kuchaysa, bu appenditsit bo'lishi mumkin.\n\nBirinchi yordam bo'limidan batafsil yo'riqnomani o'qishingiz yoki shifokor qabuliga yozilishingiz mumkin."
        : "Боль в животе может иметь несколько причин. Первоочередные шаги:\n1. Обеспечьте покой.\n2. НЕ прикладывайте тепло к животу и не принимайте анальгетики до осмотра.\n3. Если боль смещается в правый бок, возможен аппендицит.\n\nВы можете ознакомиться с инструкцией первой помощи или записаться к врачу.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'view_first_aid',
        payload: 'fa-1'
      }
    };
  }

  if (lowerText.includes('harorat') || lowerText.includes('isitma') || lowerText.includes('температур')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: lang === 'uz'
        ? "Yuqori tana harorati (isitma):\n1. 38.5°C dan yuqori bo'lganda isitma tushiruvchi (Paratsetamol yoki Ibuprofen) bering.\n2. Mo'l miqdorda iliq suyuqlik (choy, kompot) ichiring.\n3. Bolani spirt yoki sirka bilan ishqalamang (zaharli modda teriga so'riladi!).\n4. Gar harorat 3 kundan ortiq tushmasa, pediatrga murojaat qiling."
        : "Высокая температура:\n1. При температуре выше 38.5°C дайте жаропонижающее (Парацетамол или Ибупрофен).\n2. Обеспечьте обильное теплое питье.\n3. НЕ обтирайте ребенка уксусом или спиртом!\n4. Если температура держится более 3 дней, обратитесь к педиатру.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'book_appointment'
      }
    };
  }

  if (lowerText.includes('shifoxona') || lowerText.includes('больница') || lowerText.includes('24/7')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: lang === 'uz'
        ? "Toshkent va viloyatlardagi 24/7 ishlaydigan shoshilinch shifoxonalar ro'yxati va xaritasi Health Access platformasida mavjud. Qaysi viloyatdagi muassasa kerak?"
        : "Список и карта круглосуточных больниц Узбекистана доступны на платформе Health Access. Какой регион вас интересует?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedAction: {
        type: 'find_hospital'
      }
    };
  }

  // Default AI general answer
  return {
    id: `msg-${Date.now()}`,
    sender: 'ai',
    text: lang === 'uz'
      ? `Sizning savolingiz: "${userText}".\n\nHealth Access salomatlik tizimida ushbu alomat bo'yicha profilaktik ko'rsatmalar mavjud. Agar o'zingizni yomon his qilsangiz, platformamiz orqali shifokor konsultatsiyasiga yozilishni yoki yaqin tibbiyot maskaniga murojaat qilishni tavsiya etamiz.`
      : `Ваш вопрос: "${userText}".\n\nВ системе Health Access есть справочные рекомендации. Если вы чувствуете недомогание, рекомендуем записаться на консультацию к врачу или обратиться в ближайшее медучреждение.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedAction: {
      type: 'book_appointment'
    }
  };
}
