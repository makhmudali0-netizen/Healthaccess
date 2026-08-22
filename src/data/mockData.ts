import { Facility, Doctor, FirstAidArticle, Vaccine, UserProfile, MedicalRecord, FamilyMember, Appointment } from '../types';

export const UZBEKISTAN_REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand viloyati",
  "Buxoro viloyati",
  "Farg'ona viloyati",
  "Andijon viloyati",
  "Namangan viloyati",
  "Qashqadaryo viloyati",
  "Surxondaryo viloyati",
  "Xorazm viloyati",
  "Navoiy viloyati",
  "Jizzax viloyati",
  "Sirdaryo viloyati",
  "Qoraqalpog'iston Respublikasi"
];

export const DEMO_USER: UserProfile = {
  id: "usr-001",
  email: "jasur.bek@healthaccess.uz",
  phone: "+998 90 123 45 67",
  fullName: "Jasur Rahimov",
  dob: "1990-05-14",
  gender: "male",
  region: "Toshkent shahri",
  district: "Yunusobod tumani",
  emergencyContact: {
    name: "Malika Rahimova",
    phone: "+998 91 987 65 43",
    relationship: "Turmush o'rtog'i"
  },
  role: "patient",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
};

export const MOCK_FAMILY: FamilyMember[] = [
  {
    id: "fam-1",
    mainUserId: "usr-001",
    name: "Malika Rahimova",
    relation: "spouse",
    dob: "1992-08-20",
    gender: "female",
    bloodType: "A(II)+",
    allergies: ["Penitsillin"],
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80"
  },
  {
    id: "fam-2",
    mainUserId: "usr-001",
    name: "Amir Rahimov",
    relation: "child",
    dob: "2021-03-10",
    gender: "male",
    bloodType: "O(I)+",
    allergies: [],
    avatarUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=250&q=80"
  }
];

export const MOCK_FACILITIES: Facility[] = [
  {
    id: "fac-1",
    name: {
      uz: "Toshkent Shahar 1-Sonli Klinik Shifoxonasi",
      ru: "Ташкентская Городская Клиническая Больница №1"
    },
    type: "hospital",
    region: "Toshkent shahri",
    district: "Yunusobod tumani",
    address: {
      uz: "Yunusobod tumani, Amir Temur ko'chasi 110-uy",
      ru: "Юнусабадский район, ул. Амира Темура 110"
    },
    phone: "+998 71 234 56 78",
    workingHours: {
      weekdays: "08:00 - 20:00",
      saturday: "09:00 - 15:00",
      sunday: "Yopiq",
      is24_7: true
    },
    coordinates: { lat: 41.3364, lng: 69.2865 },
    emergency24_7: true,
    departments: ["Kardiologiya", "Xirurgiya", "Pediatriya", "Nevrologiya", "Shoshilinch yordam"],
    services: {
      uz: ["EKG va MRT", "Statsionar davolash", "Jarrohlik amaliyoti", "24/7 Tez tibbiy yordam"],
      ru: ["ЭКГ и МРТ", "Стационарное лечение", "Хирургические операции", "24/7 Скорая помощь"]
    },
    isDemo: true,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fac-2",
    name: {
      uz: "Respublika Shoshilinch Tibbiy Yordam Ilmiy Markazi (RSTYIM)",
      ru: "Республиканский Научный Центр Экстренной Медицинской Помощи"
    },
    type: "hospital",
    region: "Toshkent shahri",
    district: "Chilonzor tumani",
    address: {
      uz: "Chilonzor tumani, Farhad ko'chasi 2-uy",
      ru: "Чиланзарский район, ул. Фархадская 2"
    },
    phone: "+998 71 150 48 03",
    workingHours: {
      weekdays: "24/7",
      saturday: "24/7",
      sunday: "24/7",
      is24_7: true
    },
    coordinates: { lat: 41.2789, lng: 69.2087 },
    emergency24_7: true,
    departments: ["Reanimatsiya", "Travmatologiya", "Toksikologiya", "Kardiologiya"],
    services: {
      uz: ["Reanimatsiya amaliyoti", "Shoshilinch travma yordami", "Laboratoriya tahlillari"],
      ru: ["Реанимация", "Экстренная травматология", "Лабораторные анализы"]
    },
    isDemo: true,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fac-3",
    name: {
      uz: "OXYmed Markaziy Dorixonasi 24/7",
      ru: "Центральная Аптека OXYmed 24/7"
    },
    type: "pharmacy",
    region: "Toshkent shahri",
    district: "Mirobod tumani",
    address: {
      uz: "Mirobod tumani, Nukus ko'chasi 29-uy",
      ru: "Мирабадский район, ул. Нукусская 29"
    },
    phone: "+998 71 200 03 03",
    workingHours: {
      weekdays: "24/7",
      saturday: "24/7",
      sunday: "24/7",
      is24_7: true
    },
    coordinates: { lat: 41.2995, lng: 69.2731 },
    emergency24_7: true,
    departments: ["Dori-darmonlar", "Tibbiy texnika", "Ortopediya", "Bolalar parvarishi"],
    services: {
      uz: ["24 soatlik yetkazib berish", "Retsept bo'yicha tayyorlash", "Qon bosimini o'lchash"],
      ru: ["Круглосуточная доставка", "Изготовление по рецепту", "Измерение давления"]
    },
    isDemo: true,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fac-4",
    name: {
      uz: "Grand Pharm Yunusobod",
      ru: "Аптека Grand Pharm Юнусабад"
    },
    type: "pharmacy",
    region: "Toshkent shahri",
    district: "Yunusobod tumani",
    address: {
      uz: "Yunusobod 7-chorraha, Shaxriston ko'chasi 4",
      ru: "Юнусабад 7-й квартал, ул. Шахристон 4"
    },
    phone: "+998 71 202 11 11",
    workingHours: {
      weekdays: "08:00 - 23:00",
      saturday: "08:00 - 23:00",
      sunday: "08:00 - 22:00",
      is24_7: false
    },
    coordinates: { lat: 41.3521, lng: 69.2890 },
    emergency24_7: false,
    departments: ["Retsept bo'limi", "Vitamintiya", "Kosmetika"],
    services: {
      uz: ["Farmatsevt maslahati", "Bron qilish va olib ketish"],
      ru: ["Консультация фармацевта", "Бронирование и самовывоз"]
    },
    isDemo: true,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fac-5",
    name: {
      uz: "Samarqand Viloyat Shoshilinch Tibbiy Yordam Markazi",
      ru: "Самаркандский Областной Центр Экстренной Помощи"
    },
    type: "hospital",
    region: "Samarqand viloyati",
    district: "Samarqand shahri",
    address: {
      uz: "Samarqand shahri, Dagbitskaya ko'chasi 45",
      ru: "г. Самарканд, ул. Дагбитская 45"
    },
    phone: "+998 66 233 12 40",
    workingHours: {
      weekdays: "24/7",
      saturday: "24/7",
      sunday: "24/7",
      is24_7: true
    },
    coordinates: { lat: 39.6542, lng: 66.9597 },
    emergency24_7: true,
    departments: ["Kardiologiya", "Jarrohlik", "Pediatriya"],
    services: {
      uz: ["Teshuvchi jarrohlik", "Dializ", "Tez yordam"],
      ru: ["Хирургия", "Диализ", "Скорая помощь"]
    },
    isDemo: true,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fac-6",
    name: {
      uz: "Buxoro Diagnostika va Klinika Markazi",
      ru: "Бухарский Диагностический и Клинический Центр"
    },
    type: "clinic",
    region: "Buxoro viloyati",
    district: "Buxoro shahri",
    address: {
      uz: "Buxoro shahri, Navoiy shoh ko'chasi 14",
      ru: "г. Бухара, пр. Навои 14"
    },
    phone: "+998 65 224 88 90",
    workingHours: {
      weekdays: "08:00 - 18:00",
      saturday: "08:00 - 14:00",
      sunday: "Yopiq",
      is24_7: false
    },
    coordinates: { lat: 39.7747, lng: 64.4286 },
    emergency24_7: false,
    departments: ["Terapevt", "Oftalmologiya", "UZI Diagnostika"],
    services: {
      uz: ["3D UZI", "Ko'z qon bosimini o'lchash", "Laboratoriya"],
      ru: ["3D УЗИ", "Глазная диагностика", "Лаборатория"]
    },
    isDemo: true,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Alisher Toshmatov",
    specialty: "Kardiolog",
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 128,
    languages: ["O'zbekcha", "Русский"],
    facilityId: "fac-1",
    facilityName: "Toshkent Shahar 1-Sonli Klinik Shifoxonasi",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    availableDays: ["Dushanba", "Shanba"],
    timeSlots: ["09:00", "10:30", "14:00", "16:00"],
    consultationFee: 180000,
    consultationTypes: ["in_person", "chat", "video"],
    about: {
      uz: "Oliy toifali kardiolog, tibbiyot fanlari nomzodi. Yurak-qon tomir kasalliklari va gipertoniyani zamonaviy davolash mutaxassisi.",
      ru: "Кардиолог высшей категории, кандидат медицинских наук. Специалист по лечению сердечно-сосудистых заболеваний."
    }
  },
  {
    id: "doc-2",
    name: "Dr. Nigora Usmonova",
    specialty: "Pediatr",
    experienceYears: 11,
    rating: 4.8,
    reviewsCount: 94,
    languages: ["O'zbekcha", "Русский", "English"],
    facilityId: "fac-1",
    facilityName: "Toshkent Shahar 1-Sonli Klinik Shifoxonasi",
    photoUrl: "https://images.unsplash.com/photo-1594824813566-88855ce78347?auto=format&fit=crop&w=300&q=80",
    availableDays: ["Seshanba", "Payshanba", "Juma"],
    timeSlots: ["10:00", "11:30", "15:00", "17:00"],
    consultationFee: 150000,
    consultationTypes: ["in_person", "chat", "video"],
    about: {
      uz: "Tadbirkor pediatr va bolalar allergologi. Bolalar rivojlanishi va profilaktik emlashlar bo'yicha ekspert.",
      ru: "Опытный педиатр и детский аллерголог. Эксперт по детскому развитию и профилактическим прививкам."
    }
  },
  {
    id: "doc-3",
    name: "Dr. Bobur Karimov",
    specialty: "Nevrolog",
    experienceYears: 9,
    rating: 4.7,
    reviewsCount: 76,
    languages: ["O'zbekcha", "Русский"],
    facilityId: "fac-5",
    facilityName: "Samarqand Viloyat Shoshilinch Tibbiy Yordam Markazi",
    photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    availableDays: ["Dushanba", "Chorshanba", "Juma"],
    timeSlots: ["09:30", "11:00", "14:30"],
    consultationFee: 140000,
    consultationTypes: ["in_person", "chat"],
    about: {
      uz: "Bosh og'rig'i, uyqu buzilishi va umurtqa pog'onasi muammolari bo'yicha mutaxassis.",
      ru: "Специалист по головным болям, нарушениям сна и проблемам с позвоночником."
    }
  }
];

export const MOCK_FIRST_AID_ARTICLES: FirstAidArticle[] = [
  {
    id: "fa-1",
    title: {
      uz: "Qorin og'rig'i va oshqozon spazmi",
      ru: "Боль в животе и спазмы желудка"
    },
    category: "Oshqozon va ovqat hazm qilish",
    symptoms: {
      uz: ["O'ng pastki qismda o'tkir og'riq", "Ko'ngil aynishi", "Tana harorati ko'tarilishi"],
      ru: ["Острая боль в правом нижнем боку", "Тошнота", "Повышение температуры"]
    },
    whatToDo: {
      uz: [
        "Bemorga tinch va qulay yotish holatini bering.",
        "Xona haroratidagi toza suvdan oz-ozdan ichiring.",
        "Og'riq nuqtasini sekin silash orqali ko'rikdan o'tkazing.",
        "Agar og'riq 2 soatdan ortiq davom etsa, darhol shifokorga murojaat qiling."
      ],
      ru: [
        "Обеспечьте больному покой и удобное горизонтальное положение.",
        "Давайте пить чистую воду комнатной температуры небольшими глотками.",
        "Если боль длится более 2 часов, обязательно обратитесь к врачу."
      ]
    },
    whatNotToDo: {
      uz: [
        "Qoringa issiq grelka yoki issiq kompress QO'YMANg (appenditsit bo'lsa yorilib ketishi mumkin!).",
        "Shifokor ko'rigisiz o'tkir og'riq qoldiruvchi dorilar (Analgin, Nimesil va h.k.) ICHMANG.",
        "Qattiq ovqat yemang va huqna (klima) qilmang."
      ],
      ru: [
        "НЕ прикладывайте горячую грелку к животу (опасно при аппендиците!).",
        "НЕ принимайте сильные обезболивающие до осмотра врача (это скрывает симптомы).",
        "НЕ принимайте твердую пищу и не делайте клизму."
      ]
    },
    whenToSeekHelp: {
      uz: [
        "Og'riq o'ng tomonga ko'chganda (Appenditsit xavfi)",
        "Qusish va yuqori isitma paydo bo'lganda",
        "Qorin mushaklari taxtadek qattiqlashganda"
      ],
      ru: [
        "Боль сместилась в правый бок (риск аппендицита)",
        "Появилась рвота и высокая температура",
        "Живот стал твердым как доска"
      ]
    },
    emergencyWarningSigns: {
      uz: ["Hushdan ketish", "Qonli qusish", "Chidabsiz to'satdan shiddatli og'riq (Darhol 103 chaqiring!)"],
      ru: ["Потеря сознания", "Кровавая рвота", "Внезапная невыносимая боль (Срочно 103!)"]
    },
    severity: "high",
    icon: "Activity"
  },
  {
    id: "fa-2",
    title: {
      uz: "Kichik kuydirish (Termik va maishiy)",
      ru: "Бытовые и термические ожоги"
    },
    category: "Travma va jarahotlar",
    symptoms: {
      uz: ["Teri qizarishi", "Pufakchalar paydo bo'lishi", "Achishish og'rig'i"],
      ru: ["Покраснение кожи", "Появление пузырей", "Жгучая боль"]
    },
    whatToDo: {
      uz: [
        "Kuydirilgan joyni darhol 15-20 daqiqa sovuq oqar suv ostida tuting.",
        "Tinchlantiruvchi Pantenol yoki antiseptik sprey seping.",
        "Toza va quruq steril bint bilan yengil yoping."
      ],
      ru: [
        "Немедленно охлаждайте место ожога под проточной холодной водой 15-20 минут.",
        "Нанесите Пантенол или специальный аэрозоль от ожогов.",
        "Накройте чистой стерильной салфеткой."
      ]
    },
    whatNotToDo: {
      uz: [
        "Kuydirilgan joyga mol yog'i, yog'li krem yoki tish pastasi SURTMANG!",
        "Hosil bo'lgan pufakchalarni QAPSHAMANG va YORMANg.",
        "Yaraga muzni to'g'ridan-to'g'ri bosmang (muzlash travmasi bo'ladi)."
      ],
      ru: [
        "НЕ мажьте ожог жиром, масло, зубной пастой или сметаной!",
        "НЕ вскрывайте и не прокалывайте образовавшиеся пузыри.",
        "НЕ прикладывайте лед напрямую к ране."
      ]
    },
    whenToSeekHelp: {
      uz: [
        "Kuydirish maydoni kaft hajmida katta bo'lsa",
        "Yuz, ko'z yoki bo'yin sohasida bo me'yoridan ortiq bo'lsa"
      ],
      ru: [
        "Площадь ожога больше ладони",
        "Ожог на лице, шее или в области глаз"
      ]
    },
    emergencyWarningSigns: {
      uz: ["Kimyoviy kuydirish", "Bolalarda ko'krak qafasi kuydirilishi (103 chaqiring)"],
      ru: ["Химический ожог", "Ожог грудной клетки у ребенка (Звоните 103)"]
    },
    severity: "medium",
    icon: "Flame"
  },
  {
    id: "fa-3",
    title: {
      uz: "Burun qonashi (Epistaksis)",
      ru: "Носовое кровотечение"
    },
    category: "Shoshilinch holatlar",
    symptoms: {
      uz: ["Burundan qon kelishi", "Bosh aylanishi"],
      ru: ["Кровотечение из носа", "Головокружение"]
    },
    whatToDo: {
      uz: [
        "Kallani birmuncha OLINGA egib o'tiring.",
        "Burun qanotlarini 10 daqiqa davomida barmoqlar bilan qisib turing.",
        "Ensa va burun ustiga sovuq mato yoki muz solingan xaltacha qo'ying."
      ],
      ru: [
        "Сядьте, слегка наклонив голову ВПЕРЕД.",
        "Зажмите крылья носа пальцами на 10 минут.",
        "Приложите холодный компресс на переносицу и затылок."
      ]
    },
    whatNotToDo: {
      uz: [
        "Kallani ORQAGA tashlamang (qon oshqozon yoki nafas yo'liga ketadi!).",
        "Yotib olmang."
      ],
      ru: [
        "НЕ запрокидывайте голову НАЗАД (кровь попадет в пищевод или дыхательные пути!).",
        "НЕ принимайте горизонтальное положение."
      ]
    },
    whenToSeekHelp: {
      uz: ["Qon ketishi 20 daqiqadan ortiq to'xtamasa", "Bosh jarohatidan keyin boshlansa"],
      ru: ["Кровотечение не останавливается более 20 минут", "Возникло после травмы головы"]
    },
    emergencyWarningSigns: {
      uz: ["Kuchli holsizlik va hush yoqolishi (103 chaqiring)"],
      ru: ["Сильная слабость и потеря сознания (Звоните 103)"]
    },
    severity: "medium",
    icon: "Droplet"
  }
];

export const MOCK_VACCINES: Vaccine[] = [
  {
    id: "vac-1",
    code: "BCG",
    name: {
      uz: "BChJ (Tuberkulyozga qarshi)",
      ru: "БЦЖ (Против туберкулеза)"
    },
    description: {
      uz: "Chaqaloq tug'ilganining 2-5-kunida tug'ruqxonada guvohnoma bilan emlanadi.",
      ru: "Вакцинация новорожденных на 2-5 день жизни в роддоме."
    },
    recommendedAgeMonths: 0,
    recommendedAgeText: {
      uz: "Tug'ruqxonada (2-5 kun)",
      ru: "В роддоме (2-5 день)"
    },
    isMandatory: true
  },
  {
    id: "vac-2",
    code: "HEP_B",
    name: {
      uz: "Gepatit B (VGB-1)",
      ru: "Гепатит B (ВГБ-1)"
    },
    description: {
      uz: "Virusli gepatit B dan himoya qilish uchun tug'ilgandan keyin dastlabki 24 soat ichida.",
      ru: "Первая доза против гепатита B в первые 24 часа после рождения."
    },
    recommendedAgeMonths: 0,
    recommendedAgeText: {
      uz: "Dastlabki 24 soat",
      ru: "Первые 24 часа"
    },
    isMandatory: true
  },
  {
    id: "vac-3",
    code: "PENTA_1",
    name: {
      uz: "Penta-1 (Diptariya, Qoqshol, Ko'kurtal, Gepatit B, XIB)",
      ru: "Пента-1 (АКДС + Гепатит B + ХИБ)"
    },
    description: {
      uz: "5 ta xavfli infeksiyaga qarshi majburiy kombo vaksina.",
      ru: "Комбинированная вакцина против 5 инфекций."
    },
    recommendedAgeMonths: 2,
    recommendedAgeText: {
      uz: "2 oylikda",
      ru: "В 2 месяца"
    },
    isMandatory: true
  },
  {
    id: "vac-4",
    code: "MMR_1",
    name: {
      uz: "KPK-1 (Qizamiq, Parotit, Qizilcha)",
      ru: "КПK-1 (Корь, Паротит, Краснуха)"
    },
    description: {
      uz: "12 oylikda qizamiq va parotitga qarshi birinchi doza.",
      ru: "Первая доза в 12 месяцев против кори, паротита и краснухи."
    },
    recommendedAgeMonths: 12,
    recommendedAgeText: {
      uz: "12 oylikda (1 yosh)",
      ru: "В 12 месяцев (1 год)"
    },
    isMandatory: true
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "app-1",
    patientId: "usr-001",
    patientName: "Jasur Rahimov",
    doctorId: "doc-1",
    doctorName: "Dr. Alisher Toshmatov",
    doctorSpecialty: "Kardiolog",
    facilityId: "fac-1",
    facilityName: "Toshkent Shahar 1-Sonli Klinik Shifoxonasi",
    facilityAddress: "Yunusobod tumani, Amir Temur ko'chasi 110-uy",
    date: "2026-08-28",
    timeSlot: "10:30",
    status: "upcoming",
    notes: "Profilaktik yurak EKG ko'rigi va maslahati",
    createdAt: "2026-08-20",
    type: "in_person",
    smsReminder: true
  }
];

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: "emr-101",
    patientId: "usr-001",
    patientName: "Jasur Rahimov",
    date: "2026-06-15",
    doctorName: "Dr. Alisher Toshmatov",
    specialty: "Kardiolog",
    facilityName: "Toshkent Shahar 1-Sonli Klinik Shifoxonasi",
    type: "visit",
    title: {
      uz: "Yillik Kardiologik ko'rik va EKG",
      ru: "Ежегодный кардиологический осмотр и ЭКГ"
    },
    summary: {
      uz: "Qon bosimi 120/80 mm hg. Yureak ritmi me'yorida. Profilaktika maqsadida sport va to'g'ri ovqatlanish tavsiya qilindi.",
      ru: "Давление 120/80 мм рт.ст. Синусовый ритм в норме. Рекомендована профилактика и умеренный спорт."
    },
    details: {
      diagnosisCode: "I10 - Normotoniya",
      prescriptions: [
        { medicine: "Magne B6 Premium", dosage: "1 tabletkadan 2 mahal", duration: "30 kun" }
      ],
      labResults: [
        { testName: "Xolesterin umumiy", value: "4.2 mmol/L", normalRange: "3.1 - 5.2", status: "normal" }
      ],
      notes: "1 yildan so'ng takroriy ko'rik."
    },
    privacy: "private"
  }
];
