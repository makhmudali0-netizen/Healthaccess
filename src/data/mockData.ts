import { Facility, Doctor, FirstAidArticle, Vaccine, UserProfile, MedicalRecord, FamilyMember, Appointment, BloodPressureRecord } from '../types';

export const MOCK_BLOOD_PRESSURE: BloodPressureRecord[] = [
  {
    id: "bp-1",
    systolic: 118,
    diastolic: 78,
    pulse: 72,
    category: "normal",
    timestamp: "2026-08-23 08:30",
    condition: "morning",
    notes: "Ertalabki o'lchov, tinch holatda",
    measuredVia: "manual"
  },
  {
    id: "bp-2",
    systolic: 125,
    diastolic: 82,
    pulse: 78,
    category: "elevated",
    timestamp: "2026-08-22 19:45",
    condition: "evening",
    notes: "Kechki ovqatdan so'ng",
    measuredVia: "camera_ppg"
  },
  {
    id: "bp-3",
    systolic: 120,
    diastolic: 80,
    pulse: 75,
    category: "normal",
    timestamp: "2026-08-21 09:00",
    condition: "resting",
    notes: "Dam olish vaqtida",
    measuredVia: "bluetooth_cuff"
  }
];

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

export const UZBEKISTAN_DISTRICTS_MAP: Record<string, string[]> = {
  "Toshkent shahri": [
    "Yunusobod tumani",
    "Chilonzor tumani",
    "Mirzo Ulug'bek tumani",
    "Mirobod tumani",
    "Yakkasaroy tumani",
    "Shayxontohur tumani",
    "Olmazor tumani",
    "Sergeli tumani",
    "Yangihayot tumani",
    "Uchtepa tumani",
    "Bektemir tumani"
  ],
  "Toshkent viloyati": [
    "Chirchiq shahri",
    "Angren shahri",
    "Olmaliq shahri",
    "Bekobod shahri",
    "Qibray tumani",
    "Zangiota tumani",
    "Yangiyo'l tumani",
    "Parkent tumani",
    "Burchmulla tumani"
  ],
  "Samarqand viloyati": [
    "Samarqand shahri",
    "Kattaqo'rg'on shahri",
    "Pastdarg'om tumani",
    "Urgut tumani",
    "Bulung'ur tumani",
    "Payariq tumani",
    "Jomboy tumani"
  ],
  "Buxoro viloyati": [
    "Buxoro shahri",
    "Kogon shahri",
    "G'ijduvon tumani",
    "Vobkent tumani",
    "Romitan tumani",
    "Jondor tumani"
  ],
  "Farg'ona viloyati": [
    "Farg'ona shahri",
    "Qo'qon shahri",
    "Marg'ilon shahri",
    "Quvasoy shahri",
    "Rishton tumani",
    "Oltiariq tumani"
  ],
  "Andijon viloyati": [
    "Andijon shahri",
    "Xonobod shahri",
    "Asaka tumani",
    "Shahrixon tumani",
    "Paxtaobod tumani"
  ],
  "Namangan viloyati": [
    "Namangan shahri",
    "Kosonsoy tumani",
    "Chust tumani",
    "Pop tumani",
    "To'raqo'rg'on tumani"
  ],
  "Qashqadaryo viloyati": [
    "Qarshi shahri",
    "Shahrisabz shahri",
    "G'uzor tumani",
    "Koson tumani",
    "Kitob tumani"
  ],
  "Surxondaryo viloyati": [
    "Termiz shahri",
    "Denov tumani",
    "Sherobod tumani",
    "Jarqo'rg'on tumani"
  ],
  "Xorazm viloyati": [
    "Urganch shahri",
    "Xiva shahri",
    "Xonqa tumani",
    "Gurlan tumani",
    "Shovot tumani"
  ],
  "Navoiy viloyati": [
    "Navoiy shahri",
    "Zarafshon shahri",
    "Karmana tumani",
    "Qiziltepa tumani"
  ],
  "Jizzax viloyati": [
    "Jizzax shahri",
    "Zomin tumani",
    "G'allaorol tumani",
    "Sharof Rashidov tumani"
  ],
  "Sirdaryo viloyati": [
    "Guliston shahri",
    "Shirin shahri",
    "Yangiyer shahri",
    "Boyovut tumani"
  ],
  "Qoraqalpog'iston Respublikasi": [
    "Nukus shahri",
    "Xo'jayli tumani",
    "Qo'ng'irot tumani",
    "To'rtko'l tumani",
    "Beruniy tumani"
  ]
};

export const REGION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Toshkent shahri": { lat: 41.2995, lng: 69.2401 },
  "Toshkent viloyati": { lat: 41.1685, lng: 69.8398 },
  "Samarqand viloyati": { lat: 39.6542, lng: 66.9597 },
  "Buxoro viloyati": { lat: 39.7747, lng: 64.4286 },
  "Farg'ona viloyati": { lat: 40.3842, lng: 71.7843 },
  "Andijon viloyati": { lat: 40.7821, lng: 72.3442 },
  "Namangan viloyati": { lat: 40.9983, lng: 71.6726 },
  "Qashqadaryo viloyati": { lat: 38.8606, lng: 65.7891 },
  "Surxondaryo viloyati": { lat: 37.2242, lng: 67.2783 },
  "Xorazm viloyati": { lat: 41.5503, lng: 60.6317 },
  "Navoiy viloyati": { lat: 40.0844, lng: 65.3792 },
  "Jizzax viloyati": { lat: 40.1158, lng: 67.8422 },
  "Sirdaryo viloyati": { lat: 40.4897, lng: 68.7842 },
  "Qoraqalpog'iston Respublikasi": { lat: 42.4619, lng: 59.6166 }
};

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

const INITIAL_CURATED_FACILITIES: Facility[] = [
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
    workingHours: { weekdays: "24/7", saturday: "24/7", sunday: "24/7", is24_7: true },
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
    workingHours: { weekdays: "24/7", saturday: "24/7", sunday: "24/7", is24_7: true },
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
    workingHours: { weekdays: "24/7", saturday: "24/7", sunday: "24/7", is24_7: true },
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
  }
];

function generateComprehensiveFacilities(): Facility[] {
  const list: Facility[] = [...INITIAL_CURATED_FACILITIES];

  const hospitalNames = [
    "Markaziy Klinik Shifoxonasi",
    "Shoshilinch Tibbiy Yordam Bo'limi",
    "Ko'p Tarmoqli Kasalxona",
    "Kardiologiya va Jarrohlik Klinikasi",
    "Tuman Markaziy Shifoxonasi",
    "Onalar va Bolalar Salomatlik Markazi",
    "Neyroxirurgiya va Travmatologiya",
    "Bolalar Klinik Kasalxonasi",
    "Terapiya va Diagnostika Majmuasi",
    "Respublika Ixtisoslashtirilgan Markazi"
  ];

  const pharmacyNames = [
    "OXYmed 24/7",
    "Grand Pharm",
    "999 Dorixona 24/7",
    "Dori-Darmon Markaziy",
    "Best Pharmacy 24/7",
    "Arzon Dorixona",
    "Nika Pharm 24/7",
    "Evropharm 24/7",
    "Salomatlik Dorixonasi",
    "Zümrad Pharm"
  ];

  const clinicNames = [
    "Medion Family Clinic",
    "Akfa Medline Express",
    "Salomatlik Diagnostika Markazi",
    "Med-Servis Diagnostika",
    "Darmon Med Clinic",
    "Shifa Premium Clinic",
    "Ibn Sino Meditsina Markazi",
    "Prof-Med Klinikasi",
    "Avisenna Family Med",
    "Evromed Diagnostika"
  ];

  let idCounter = 100;

  UZBEKISTAN_REGIONS.forEach(region => {
    const districts = UZBEKISTAN_DISTRICTS_MAP[region] || ["Markaziy tuman"];
    const baseCoords = REGION_COORDINATES[region] || { lat: 41.2995, lng: 69.2401 };

    districts.forEach(district => {
      // 3 Hospitals per district
      for (let i = 1; i <= 3; i++) {
        idCounter++;
        const latOffset = Math.sin(idCounter) * 0.035;
        const lngOffset = Math.cos(idCounter) * 0.035;

        list.push({
          id: `fac-h-${idCounter}`,
          name: {
            uz: `${district} ${hospitalNames[idCounter % hospitalNames.length]} №${i}`,
            ru: `Городская Больница №${i} (${district})`
          },
          type: 'hospital',
          region,
          district,
          address: {
            uz: `${district}, Mustaqillik shoh ko'chasi ${i * 14}-uy`,
            ru: `${district}, пр. Мустакиллик ${i * 14}`
          },
          phone: `+998 ${71 + (idCounter % 20)} ${100 + (idCounter % 800)} ${10 + (idCounter % 80)} ${10 + (idCounter % 80)}`,
          workingHours: { weekdays: "24/7", saturday: "24/7", sunday: "24/7", is24_7: true },
          coordinates: {
            lat: parseFloat((baseCoords.lat + latOffset).toFixed(4)),
            lng: parseFloat((baseCoords.lng + lngOffset).toFixed(4))
          },
          emergency24_7: true,
          departments: ["Kardiologiya", "Jarrohlik", "Pediatriya", "Reanimatsiya"],
          services: { uz: ["Statsionar", "MRT va UZI", "24/7 Tez Yordam"], ru: ["Стационар", "МРТ", "Скорая помощь"] },
          isDemo: true,
          rating: parseFloat((4.5 + (idCounter % 5) * 0.1).toFixed(1)),
          imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80"
        });
      }

      // 4 Pharmacies per district
      for (let i = 1; i <= 4; i++) {
        idCounter++;
        const latOffset = Math.sin(idCounter * 1.5) * 0.045;
        const lngOffset = Math.cos(idCounter * 1.5) * 0.045;

        list.push({
          id: `fac-p-${idCounter}`,
          name: {
            uz: `${pharmacyNames[idCounter % pharmacyNames.length]} (${district})`,
            ru: `Аптека ${pharmacyNames[idCounter % pharmacyNames.length]} (${district})`
          },
          type: 'pharmacy',
          region,
          district,
          address: {
            uz: `${district}, Amir Temur ko'chasi ${i * 9}-uy`,
            ru: `${district}, ул. Амира Темура ${i * 9}`
          },
          phone: `+998 ${71 + (idCounter % 20)} ${200 + (idCounter % 700)} ${10 + (idCounter % 80)} ${10 + (idCounter % 80)}`,
          workingHours: { weekdays: "24/7", saturday: "24/7", sunday: "24/7", is24_7: i % 2 === 0 },
          coordinates: {
            lat: parseFloat((baseCoords.lat + latOffset).toFixed(4)),
            lng: parseFloat((baseCoords.lng + lngOffset).toFixed(4))
          },
          emergency24_7: i % 2 === 0,
          departments: ["Dori-darmonlar", "Retsept bo'limi", "Vitamintiya"],
          services: { uz: ["24/7 Yetkazib berish", "Qon bosim o'lchash"], ru: ["Доставка 24/7", "Измерение давления"] },
          isDemo: true,
          rating: parseFloat((4.4 + (idCounter % 6) * 0.1).toFixed(1)),
          imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=600&q=80"
        });
      }

      // 4 Clinics per district
      for (let i = 1; i <= 4; i++) {
        idCounter++;
        const latOffset = Math.cos(idCounter * 2) * 0.04;
        const lngOffset = Math.sin(idCounter * 2) * 0.04;

        list.push({
          id: `fac-c-${idCounter}`,
          name: {
            uz: `${clinicNames[idCounter % clinicNames.length]} (${district})`,
            ru: `Клиника ${clinicNames[idCounter % clinicNames.length]} (${district})`
          },
          type: 'clinic',
          region,
          district,
          address: {
            uz: `${district}, Navoiy ko'chasi ${i * 16}-uy`,
            ru: `${district}, ул. Навои ${i * 16}`
          },
          phone: `+998 ${71 + (idCounter % 20)} ${300 + (idCounter % 600)} ${10 + (idCounter % 80)} ${10 + (idCounter % 80)}`,
          workingHours: { weekdays: "08:00 - 20:00", saturday: "09:00 - 16:00", sunday: "Yopiq", is24_7: false },
          coordinates: {
            lat: parseFloat((baseCoords.lat + latOffset).toFixed(4)),
            lng: parseFloat((baseCoords.lng + lngOffset).toFixed(4))
          },
          emergency24_7: false,
          departments: ["Terapevt", "UZI Diagnostika", "Laboratoriya"],
          services: { uz: ["3D UZI", "Qon tahlillari", "Konsultatsiya"], ru: ["3D УЗИ", "Анализы", "Консультация"] },
          isDemo: true,
          rating: parseFloat((4.6 + (idCounter % 4) * 0.1).toFixed(1)),
          imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
        });
      }
    });
  });

  return list;
}

export const MOCK_FACILITIES: Facility[] = generateComprehensiveFacilities();

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
        "Og'riq 2 soatdan ortiq davom etsa, darhol shifokorga murojaat qiling."
      ],
      ru: [
        "Обеспечьте больному покой и удобное положение.",
        "Давайте пить чистую воду комнатной температуры.",
        "Если боль длится более 2 часов, обязательно обратитесь к врачу."
      ]
    },
    whatNotToDo: {
      uz: [
        "Qoringa issiq grelka QO'YMANG (appenditsit yorilishi xavfi!).",
        "O'tkir og'riq qoldiruvchi dorilar (Analgin, Nimesil va h.k.) ICHMANG.",
        "Qattiq ovqat yemang va huqna (klima) qilmang."
      ],
      ru: [
        "НЕ прикладывайте грелку к животу (опасно при аппендиците!).",
        "НЕ принимайте сильные обезболивающие до осмотра врача.",
        "НЕ принимайте твердую пищу."
      ]
    },
    whenToSeekHelp: {
      uz: ["Og'riq o'ng tomonga ko'chganda (Appenditsit)", "Qusish va yuqori isitma paydo bo'lganda"],
      ru: ["Боль сместилась в правый бок", "Появилась рвота и температура"]
    },
    emergencyWarningSigns: {
      uz: ["Hushdan ketish", "Qonli qusish", "Chidabsiz shiddatli og'riq (103 chaqiring)"],
      ru: ["Потеря сознания", "Кровавая рвота", "Невыносимая боль (Срочно 103)"]
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
    category: "Travma va jarohatlar",
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
        "Охлаждайте место ожога под проточной водой 15-20 минут.",
        "Нанесите Пантенол или специальный аэрозоль.",
        "Накройте чистой стерильной салфеткой."
      ]
    },
    whatNotToDo: {
      uz: [
        "Yog', mol yog'i yoki tish pastasi SURTMANG!",
        "Hosil bo'lgan pufakchalarni YORMANg.",
        "Yaraga muzni to'g'ridan-to'g'ri bosmang."
      ],
      ru: [
        "НЕ мажьте ожог жиром, пастой или сметаной!",
        "НЕ вскрывайте образовавшиеся пузыри.",
        "НЕ прикладывайте лед напрямую."
      ]
    },
    whenToSeekHelp: {
      uz: ["Kuydirish maydoni kaft hajmida katta bo'lsa", "Yuz va bo'yin sohasida bo'lsa"],
      ru: ["Площадь ожога больше ладони", "Ожог на лице или шее"]
    },
    emergencyWarningSigns: {
      uz: ["Kimyoviy kuydirish", "Bolalarda ko'krak qafasi kuydirilishi (103)"],
      ru: ["Химический ожог", "Ожог груди у ребенка (103)"]
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
        "Burun qanotlarini 10 daqiqa barmoq bilan qisib turing.",
        "Ensa va burun ustiga sovuq mato yoki muz qo'ying."
      ],
      ru: [
        "Сядьте, наклонив голову слегка ВПЕРЕД.",
        "Зажмите крылья носа пальцами на 10 минут.",
        "Приложите холодный компресс на переносицу."
      ]
    },
    whatNotToDo: {
      uz: [
        "Kallani ORQAGA tashlamang (qon oshqozonga ketadi!).",
        "Yotib olmang."
      ],
      ru: [
        "НЕ запрокидывайте голову НАЗАД!",
        "НЕ принимайте горизонтальное положение."
      ]
    },
    whenToSeekHelp: {
      uz: ["Qon ketishi 20 daqiqadan ortiq to'xtamasa", "Bosh jarohatidan keyin boshlansa"],
      ru: ["Кровотечение длится более 20 минут", "После травмы головы"]
    },
    emergencyWarningSigns: {
      uz: ["Kuchli holsizlik va hush yoqolishi (103 chaqiring)"],
      ru: ["Сильная слабость и потеря сознания (103)"]
    },
    severity: "medium",
    icon: "Droplet"
  },
  {
    id: "fa-4",
    title: {
      uz: "Yurak xuruji va ko'krakdagi o'tkir og'riq",
      ru: "Инфаркт миокарда и боль в груди"
    },
    category: "Yurak va qon tomir",
    symptoms: {
      uz: ["Ko'krak ortida bosuvchi, kuydiruvchi o'tkir og'riq", "Og'riq chap qo'l, bo'yin va jag'ga berilishi", "Muzday sovuq ter bosishi va nafas qisishi"],
      ru: ["Давящая боль за грудиной", "Отдача боли в левую руку, шею и челюсть", "Холодный пот и одышка"]
    },
    whatToDo: {
      uz: [
        "DARHOL 103 ga qo'ng'iroq qiling!",
        "Bemorga yarim o'tirgan holat bering, tugmalarni yechib erkin nafas oldiring.",
        "Tilda erish uchun 1 tabletka Nitroglitserin yoki Aspirin bering (tavsiya bo'lsa)."
      ],
      ru: [
        "СРОЧНО вызывайте 103!",
        "Придайте больному полусидячее положение, обеспечьте приток воздуха.",
        "Дайте таблетку Нитроглицерина или Аспирина (если нет противопоказаний)."
      ]
    },
    whatNotToDo: {
      uz: [
        "Bemorni yurgizmang va harakatlantirmang.",
        "Validol bermang (u kuchli xurujda yordam bermaydi)."
      ],
      ru: [
        "НЕ разрешайте больному ходить или физически напрягаться.",
        "НЕ надейтесь только на Валидол при сильном приступе."
      ]
    },
    whenToSeekHelp: {
      uz: ["Ko'krak og'rig'i 5 daqiqadan ortiq davom etsa", "Nafas qisishi kuchaysa"],
      ru: ["Боль в груди длится более 5 минут", "Усиливается одышка"]
    },
    emergencyWarningSigns: {
      uz: ["Hushdan ketish va yurak to'xtashi (Kardio-pulmonar reanimatsiya boshlang!)"],
      ru: ["Потеря сознания и остановка сердца (Начните СЛР!)"]
    },
    severity: "high",
    icon: "Heart"
  },
  {
    id: "fa-5",
    title: {
      uz: "Insult (Bosh miya qon aylanishi buzilishi)",
      ru: "Инсульт (Острое нарушение мозгового кровообращения)"
    },
    category: "Shoshilinch holatlar",
    symptoms: {
      uz: ["Yuz qiyshayishi (tabassum qilolmaslik)", "Qo'l yoki oyoq uyushishi va holsizligi", "Nutq buzilishi va tushunarsiz gapirish"],
      ru: ["Асимметрия лица (кривая улыбка)", "Слабость в руке или ноге", "Нарушение речи"]
    },
    whatToDo: {
      uz: [
        "DARHOL 103 tez yordam chaqiring (4.5 soat oltin vaqt!).",
        "Bemorni boshini birmuncha ko'tarib yotqizing.",
        "Tugmalarini yeching va toza havo kiring."
      ],
      ru: [
        "СРОЧНО вызывайте 103 (Окно помощи 4.5 часа!).",
        "Уложите больного с приподнятой головой.",
        "Расстегните тесную одежду."
      ]
    },
    whatNotToDo: {
      uz: [
        "Dori va suv bermang (yutish refleksi buzilgan bo'lishi mumkin!).",
        "Boshni pastga osiltirmang."
      ],
      ru: [
        "НЕ давайте питье и лекарства (риск поперхивания!).",
        "НЕ опускайте голову ниже тела."
      ]
    },
    whenToSeekHelp: {
      uz: ["Yuz va nutqda kichik bo'lsa ham o'zgarish sezilsa"],
      ru: ["Любые проявления асимметрии лица или речи"]
    },
    emergencyWarningSigns: {
      uz: ["Hushdan ketish va qusish (103 tez yetib kelishi kerak)"],
      ru: ["Потеря сознания и рвота (Срочно 103)"]
    },
    severity: "high",
    icon: "Brain"
  },
  {
    id: "fa-6",
    title: {
      uz: "Gipertonik kriz (Yuqori qon bosimi)",
      ru: "Гипертонический криз (Высокое давление)"
    },
    category: "Yurak va qon tomir",
    symptoms: {
      uz: ["Qon bosimi 140/90 dan yuqori ko'tarilishi", "Bosh ensa qismida kuchli og'riq va aylanish", "Kuz oldida chivinlar va ko'ngil aynishi"],
      ru: ["Давление выше 140/90 мм рт.ст.", "Сильная боль в затылке", "Мушки перед глазами"]
    },
    whatToDo: {
      uz: [
        "Bemorni yarim o'tirgan holatda tinchlantiring.",
        "Shifokor ilgari buyurgan gipotenziv dorini bering (Kaptopril va h.k.).",
        "Oyoqlarga issiq vanna yoki grelka qo'ying (qon pastga oqadi)."
      ],
      ru: [
        "Усадите пациента в комфортное положение.",
        "Дайте ранее назначенный врачом препарат от давления.",
        "Сделайте теплую ножную ванночку."
      ]
    },
    whatNotToDo: {
      uz: [
        "Qon bosimini to'satdan keskin tushiradigan dori ichirmang.",
        "Jismoniy harakat qildirmang."
      ],
      ru: [
        "НЕ сбивайте давление слишком резко.",
        "НЕ допускайте физических нагрузок."
      ]
    },
    whenToSeekHelp: {
      uz: ["Bosim 180/110 dan yuqori bo'lsa va dori ta'sir qilmasa"],
      ru: ["Давление выше 180/110 и не снижается"]
    },
    emergencyWarningSigns: {
      uz: ["Ko'krak og'rig'i va ko'rish yoqolishi (103 chaqiring)"],
      ru: ["Боль в груди и нарушение зрения (103)"]
    },
    severity: "high",
    icon: "Activity"
  },
  {
    id: "fa-7",
    title: {
      uz: "Allergiya va Anafilaktik shok",
      ru: "Аллергия и анафилактический шок"
    },
    category: "Shoshilinch holatlar",
    symptoms: {
      uz: ["Tana va yuzda shish, toshma paydo bo'lishi", "Tomoq qichishishi va nafas siqilishi", "Qon bosimi tushib ketishi"],
      ru: ["Отек лица, губ, высыпания", "Удушье и отек горла", "Резкое падение давления"]
    },
    whatToDo: {
      uz: [
        "Allergen bilan aloqani darhol to'xtating (dori, taom, chaqqan hasharot).",
        "Darhol antigistamin dori bering (Suprastin, Siterizin).",
        "Nafas siqilsa 103 chaqiring va epinefrin (adrenalin) auto-inyektor ishlating."
      ],
      ru: [
        "Прекратите контакт с аллергеном.",
        "Дайте антигистаминное средство (Супрастин, Цетиризин).",
        "При удушье вызывайте 103 и примените адреналин."
      ]
    },
    whatNotToDo: {
      uz: [
        "Tomog'i shishgan bemorga qattiq ovqat berib bo'lmaydi.",
        "Vaqtni o'tkazmang."
      ],
      ru: [
        "НЕ давайте твердую пищу при отеке горла.",
        "НЕ медлите с вызовом скорой."
      ]
    },
    whenToSeekHelp: {
      uz: ["Nafas olish qiyinlashganda va ovoz bo'g'ilganda"],
      ru: ["Трудности с дыханием и осиплость голоса"]
    },
    emergencyWarningSigns: {
      uz: ["Anafilaktik shok va hush yoqolishi (103 chaqiring)"],
      ru: ["Анафилактический шок (Срочно 103)"]
    },
    severity: "high",
    icon: "ShieldAlert"
  },
  {
    id: "fa-8",
    title: {
      uz: "Oziq-ovqat va doridan zaharlanish",
      ru: "Пищевое и лекарственное отравление"
    },
    category: "Zaharlanish",
    symptoms: {
      uz: ["Ko'ngil aynishi, qusish va ich ketishi", "Qorinda burab og'rish", "Holsizlik va isitma"],
      ru: ["Тошнота, рвота, диарея", "Боль и спазмы в животе", "Слабость и температура"]
    },
    whatToDo: {
      uz: [
        "Oshqozonni yuvish: 1-1.5 litr iliq suv ichirib qushtiring.",
        "Sorbent dori bering (Aktivlashtirilgan ko'mir, Smekta, Polisorb).",
        "Regidron yoki tuzli iliq suvdan oz-ozdan tez-tez ichiring (degidratatsiyaga qarshi)."
      ],
      ru: [
        "Промойте желудок теплым раствором воды.",
        "Дайте сорбенты (Активированный уголь, Смекта, Полисорб).",
        "Обильное питье растворами типа Регидрон."
      ]
    },
    whatNotToDo: {
      uz: [
        "Kislota yoki ishqor bilan zaharlanganda qushtirish MUMKIN EMAS!",
        "Hushsiz bemorni qushtirmang."
      ],
      ru: [
        "НЕ вызывайте рвоту при отравлении кислотами или щелочами!",
        "НЕ вызывайте рвоту у человека без сознания."
      ]
    },
    whenToSeekHelp: {
      uz: ["Qusish to'xtamasa va suvsizlanish belgilari bo'lsa"],
      ru: ["Непрекращающаяся рвота и обезвоживание"]
    },
    emergencyWarningSigns: {
      uz: ["Qonli qusish, qo'ziqorin yoki zaharli kimyoviy moddadan zaharlanish (103)"],
      ru: ["Кровавая рвота, отравление грибами или химикатами (103)"]
    },
    severity: "medium",
    icon: "AlertTriangle"
  },
  {
    id: "fa-9",
    title: {
      uz: "Tutqanoq va Sudorgi (Эпилепсия xuruji)",
      ru: "Судороги и приступ эпилепсии"
    },
    category: "Shoshilinch holatlar",
    symptoms: {
      uz: ["To'satdan hushdan ketish va yiqilish", "Butun tanada shiddatli qaltirash va tirishish", "Og'izdan ko'pik kelishi"],
      ru: ["Внезапная потеря сознания и падение", "Судороги всего тела", "Пена изо рта"]
    },
    whatToDo: {
      uz: [
        "Bemorni yon tomonga (yonbosh) yotqizing.",
        "Boshi tagiga yumshoq kiyim yoki yostiqcha qo'ying.",
        "Xuruj tugashini kuting va vaqtni belgilang (odatda 1-3 daqiqa)."
      ],
      ru: [
        "Поверните человека на бок.",
        "Положите под голову что-то мягкое.",
        "Засеките время приступа."
      ]
    },
    whatNotToDo: {
      uz: [
        "Og'ziga qoshiq, barmoq yoki narsa tiqmang (tishlar va jag' sinadi!).",
        "Kuch bilan tutib turishga va harakatini to'xtatishga urinmang."
      ],
      ru: [
        "НЕ засовывайте предметы и пальцы в рот!",
        "НЕ удерживайте силой судороги."
      ]
    },
    whenToSeekHelp: {
      uz: ["Xuruj 5 daqiqadan ortiq davom etsa", "Homilador ayolda bo'lsa"],
      ru: ["Приступ длится более 5 минут", "При судорогах у беременной"]
    },
    emergencyWarningSigns: {
      uz: ["Xurujlar ketma-ket qaytarilsa (103 chaqiring)"],
      ru: ["Повторяющиеся приступы подряд (103)"]
    },
    severity: "high",
    icon: "Brain"
  },
  {
    id: "fa-10",
    title: {
      uz: "Issiq o'tishi va quyosh urishi",
      ru: "Тепловой и солнечный удар"
    },
    category: "Shoshilinch holatlar",
    symptoms: {
      uz: ["Bosh og'rishi, aylanishi va ko'ngil aynishi", "Tana harorati 39-40°C gacha ko'tarilishi", "Teri qizil, quruq va issiq bo'lishi"],
      ru: ["Головокружение и тошнота", "Температура тела до 39-40°C", "Сухая горячая кожа"]
    },
    whatToDo: {
      uz: [
        "Bemorni darhol salqin, soyali va havoli xonaga o'tkazing.",
        "Peshona, bo'yin va qo'ltiq ostiga nam sovuq kompress qo me'yorida qo'ying.",
        "Oz-ozdan salqin (muzday emas) namli suv va tuzli ichimlik ichiring."
      ],
      ru: [
        "Перенесите человека в прохладную тень.",
        "Приложите холодные компрессы на лоб и шею.",
        "Давайте прохладное питье небольшими глотками."
      ]
    },
    whatNotToDo: {
      uz: [
        "Bemorni muzday suvli vannaga tashlamang (tomirlar spazmi bo'ladi).",
        "Spirtli ichimlik bermang."
      ],
      ru: [
        "НЕ погружайте в ледяную воду.",
        "НЕ давайте алкоголь."
      ]
    },
    whenToSeekHelp: {
      uz: ["Isitma 39°C dan tushmasa va qusish boshlansa"],
      ru: ["Температура не снижается и есть рвота"]
    },
    emergencyWarningSigns: {
      uz: ["Hush yo'qotish va gallyutsinatsiya (103 chaqiring)"],
      ru: ["Потеря сознания (103)"]
    },
    severity: "medium",
    icon: "Sun"
  },
  {
    id: "fa-11",
    title: {
      uz: "Ilon, chayon va zaharli hasharot chaqishi",
      ru: "Укус змеи, скорпиона и ядовитых насекомых"
    },
    category: "Zaharlanish",
    symptoms: {
      uz: ["Chaqilgan joyda o'tkir og'riq va shish", "Terlash, ko'ngil aynishi va titrash", "Bosh aylanishi va nafas siqilishi"],
      ru: ["Острая боль и отек в месте укуса", "Тошнота, потливость", "Головокружение"]
    },
    whatToDo: {
      uz: [
        "DARHOL 103 ga murojaat qiling va harakatni to'xtating.",
        "Chaqilgan a'zoni harakatsizlantiring (shina bog'lang).",
        "Ko'p miqdorda toza suv ichiring (zaharni yuvish uchun).",
        "Antigistamin dori bering."
      ],
      ru: [
        "СРОЧНО вызывайте 103 и обездвижьте конечность.",
        "Наложите фиксирующую повязку.",
        "Обильное питье воды.",
        "Дайте антигистаминный препарат."
      ]
    },
    whatNotToDo: {
      uz: [
        "Yarani kesmang, kuydirmang va og'iz bilan so'rmang!",
        "Jgut (jart) bilan mahkam siqib bog'lamang (to'qima o'ladi!).",
        "Spirtli ichimlik ichirmang."
      ],
      ru: [
        "НЕ надрезайте, НЕ прижигайте и НЕ отсасывайте яд!",
        "НЕ накладывайте тугой жгут!",
        "НЕ давайте алкоголь."
      ]
    },
    whenToSeekHelp: {
      uz: ["Zaharli ilon va chayon chaqqanda har doim 103 chaqiriladi"],
      ru: ["При укусе ядовитой змеи всегда вызывайте 103"]
    },
    emergencyWarningSigns: {
      uz: ["Nafas siqilishi va tomoq shishi (103 tez yetib kelishi kerak)"],
      ru: ["Удушье и отек гортани (103)"]
    },
    severity: "high",
    icon: "ShieldAlert"
  },
  {
    id: "fa-12",
    title: {
      uz: "Suyak sinishi va bo'g'im chiqishi",
      ru: "Перелом костей и вывихи"
    },
    category: "Travma va jarohatlar",
    symptoms: {
      uz: ["Qattiq og'riq va a'zoning g'alati qiyshayishi", "Shish va ko'karish", "Harakatlantirib bo'lmaslik"],
      ru: ["Сильная боль и деформация конечности", "Отек и синяк", "Невозможность движения"]
    },
    whatToDo: {
      uz: [
        "A'zoni to'liq harakatsizlantiring (taxta yoki karton bilan shina bog'lang).",
        "Jarohat ustiga matoga o'ralgan muz qo'ying.",
        "Ochiq sinish bo'lsa, yara ustiga steril bint yoping va qonni to'xtating."
      ],
      ru: [
        "Обездвижьте конечность импровизированной шиной.",
        "Приложите лед через ткань.",
        "При открытом переломе наложите стерильную повязку."
      ]
    },
    whatNotToDo: {
      uz: [
        "Sinigan suyakni yoki chiqqan bo'g'imni O'ZINGIZ TO'G'RILASHGA URINMANG!",
        "Bemorga kuchli harakat qildirmang."
      ],
      ru: [
        "НЕ пытайтесь вправлять кость или вывих самостоятельно!",
        "НЕ заставляйте двигаться."
      ]
    },
    whenToSeekHelp: {
      uz: ["Ochiq sinish va kuchli og'riqda травматологияga olib boriladi"],
      ru: ["Открытые переломы и сильная боль"]
    },
    emergencyWarningSigns: {
      uz: ["Bosh yoki umurtqa pog'onasi sinishi (Bemorni joyidan qimirlatmang! 103 chaqiring)"],
      ru: ["Травма позвоночника (Не двигать! 103)"]
    },
    severity: "high",
    icon: "Activity"
  },
  {
    id: "fa-13",
    title: {
      uz: "Nafas yo'liga narsa tiqilishi (Geymlix usuli)",
      ru: "Поперхивание и непроходимость дыхательных путей"
    },
    category: "Shoshilinch holatlar",
    symptoms: {
      uz: ["Gapira olmaslik va nafas ololmaslik", "Tomoqni ushlab ko'karish", "Yo'talolmaslik"],
      ru: ["Невозможность говорить и дышать", "Посинение лица", "Отсутствие кашля"]
    },
    whatToDo: {
      uz: [
        "Bemorni orqa tomonidan quchoqlang.",
        "Mushtingizni qorin yuqori qismiga (kindik va ko'krak orasiga) qo'ying.",
        "Ikkinchi qo'lingiz bilan mushtni tutib, tez va shiddat bilan ICHKARIga va YUQORIga bosing (Geymlix usuli)."
      ],
      ru: [
        "Встаньте сзади больного и обхватите руками.",
        "Положите кулак на верх живота.",
        "Резко надавите ВНУТРЬ и ВВЕРХ (прием Геймлиха)."
      ]
    },
    whatNotToDo: {
      uz: [
        "Tik turgan bemorning orqasiga gurillatib urib bo'lmaydi (narsa yanada chukurroq ketadi!)."
      ],
      ru: [
        "НЕ бейте стоящего человека по спине (предмет уходит глубже!)."
      ]
    },
    whenToSeekHelp: {
      uz: ["Tiqilgan narsa chiqmasa, darhol 103 va Geymlix usulini takrorlang"],
      ru: ["Если предмет не выходит, продолжайте прием и звоните 103"]
    },
    emergencyWarningSigns: {
      uz: ["Hush yo'qotilsa (Bemorni yerga yotqizib yordam bering)"],
      ru: ["Потеря сознания (Уложите на пол)"]
    },
    severity: "high",
    icon: "ShieldAlert"
  },
  {
    id: "fa-14",
    title: {
      uz: "Is gazidan zaharlanish (СО)",
      ru: "Отравление угарным газом"
    },
    category: "Zaharlanish",
    symptoms: {
      uz: ["Bosh shaqillab og'rishi va aylanishi", "Ko'ngil aynishi, qusish va holsizlik", "Quloqlarda shang'illash va hush yo'qolishi"],
      ru: ["Стучащая головная боль", "Тошнота и слабость", "Шум в ушах и потеря сознания"]
    },
    whatToDo: {
      uz: [
        "DARHOL bemorni toza havoga (tashqariga) olib chiqing!",
        "103 tez yordam va 104 gaz xizmatiga qo'ng'iroq qiling.",
        "Eshik va derazalarni lahang oching, bemorga erkin nafas berish uchun kiyimlarini yeching."
      ],
      ru: [
        "СРОЧНО вынесите пострадавшего на свежий воздух!",
        "Звоните 103 и 104.",
        "Откройте окна и расстегните одежду."
      ]
    },
    whatNotToDo: {
      uz: [
        "Gaz hidlanayotgan xonada sirg'alib gugurt va elektr yoqmang (portlash bo'lishi mumkin!)."
      ],
      ru: [
        "НЕ включайте свет и НЕ зажигайте огонь!"
      ]
    },
    whenToSeekHelp: {
      uz: ["Is gazi gumon qilingan har bir holatda shifokor ko'rishi shart"],
      ru: ["Обязателен осмотр врача при любом отравлении СО"]
    },
    emergencyWarningSigns: {
      uz: ["Hushsiz holat va sudorgi (103 va sun'iy nafas)"],
      ru: ["Потеря сознания (103 и ИВЛ)"]
    },
    severity: "high",
    icon: "AlertTriangle"
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
