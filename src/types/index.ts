export type Language = 'uz' | 'ru';
export type Theme = 'light' | 'dark';

export type FacilityType = 'hospital' | 'pharmacy' | 'clinic' | 'laboratory';

export interface WorkingHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  is24_7: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  facilityId: string;
  facilityName: string;
  photoUrl: string;
  availableDays: string[];
  timeSlots: string[];
  consultationFee: number; // in UZS
  consultationTypes: ('in_person' | 'chat' | 'video')[];
  about: {
    uz: string;
    ru: string;
  };
}

export interface Facility {
  id: string;
  name: {
    uz: string;
    ru: string;
  };
  type: FacilityType;
  region: string;
  district: string;
  address: {
    uz: string;
    ru: string;
  };
  phone: string;
  workingHours: WorkingHours;
  coordinates: {
    lat: number;
    lng: number;
  };
  emergency24_7: boolean;
  departments: string[];
  services: {
    uz: string[];
    ru: string[];
  };
  isDemo: boolean;
  rating: number;
  imageUrl: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  facilityId: string;
  facilityName: string;
  facilityAddress: string;
  date: string;
  timeSlot: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  type: 'in_person' | 'chat' | 'video';
  smsReminder: boolean;
}

export interface FirstAidArticle {
  id: string;
  title: {
    uz: string;
    ru: string;
  };
  category: string;
  symptoms: {
    uz: string[];
    ru: string[];
  };
  whatToDo: {
    uz: string[];
    ru: string[];
  };
  whatNotToDo: {
    uz: string[];
    ru: string[];
  };
  whenToSeekHelp: {
    uz: string[];
    ru: string[];
  };
  emergencyWarningSigns: {
    uz: string[];
    ru: string[];
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  icon: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  doctorName: string;
  specialty: string;
  facilityName: string;
  type: 'visit' | 'diagnosis' | 'prescription' | 'lab_result' | 'vaccination' | 'document';
  title: {
    uz: string;
    ru: string;
  };
  summary: {
    uz: string;
    ru: string;
  };
  details?: {
    diagnosisCode?: string;
    prescriptions?: {
      medicine: string;
      dosage: string;
      duration: string;
    }[];
    labResults?: {
      testName: string;
      value: string;
      normalRange: string;
      status: 'normal' | 'abnormal' | 'attention';
    }[];
    notes?: string;
  };
  privacy: 'private' | 'doctor_shared' | 'family_access';
  fileAttachment?: string;
}

export interface FamilyMember {
  id: string;
  mainUserId: string;
  name: string;
  relation: 'father' | 'mother' | 'spouse' | 'child' | 'dependent';
  dob: string;
  gender: 'male' | 'female';
  bloodType?: string;
  allergies?: string[];
  avatarUrl?: string;
  medicalConditions?: string[];
}

export interface Vaccine {
  id: string;
  code: string;
  name: {
    uz: string;
    ru: string;
  };
  description: {
    uz: string;
    ru: string;
  };
  recommendedAgeMonths: number;
  recommendedAgeText: {
    uz: string;
    ru: string;
  };
  isMandatory: boolean;
}

export interface VaccinationRecord {
  id: string;
  patientId: string;
  vaccineId: string;
  vaccineName: string;
  dueDate: string;
  givenDate?: string;
  status: 'completed' | 'scheduled' | 'overdue';
  administeredBy?: string;
  reminderEnabled: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  dob: string;
  gender: 'male' | 'female';
  region: string;
  district: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  role: 'patient' | 'doctor' | 'admin';
  avatarUrl?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: {
    uz: string;
    ru: string;
  };
  message: {
    uz: string;
    ru: string;
  };
  type: 'appointment' | 'vaccination' | 'doctor_message' | 'system' | 'sms_sent';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isEmergencyWarning?: boolean;
  suggestedAction?: {
    type: 'call_103' | 'view_first_aid' | 'book_appointment' | 'find_hospital';
    payload?: string;
  };
}
