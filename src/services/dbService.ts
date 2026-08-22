import { Facility, Doctor, Appointment, FirstAidArticle, MedicalRecord, FamilyMember, NotificationItem, UserProfile } from '../types';
import { MOCK_FACILITIES, MOCK_DOCTORS, MOCK_FIRST_AID_ARTICLES, MOCK_APPOINTMENTS, MOCK_MEDICAL_RECORDS, MOCK_FAMILY, DEMO_USER } from '../data/mockData';

const STORAGE_KEYS = {
  FACILITIES: 'healthaccess_facilities',
  DOCTORS: 'healthaccess_doctors',
  APPOINTMENTS: 'healthaccess_appointments',
  FIRST_AID: 'healthaccess_first_aid',
  EMR: 'healthaccess_emr',
  FAMILY: 'healthaccess_family',
  USER: 'healthaccess_user_profile',
  NOTIFICATIONS: 'healthaccess_notifications'
};

// Initialize default storage data if missing
export function initLocalStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.FACILITIES)) {
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(MOCK_FACILITIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(MOCK_DOCTORS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(MOCK_APPOINTMENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FIRST_AID)) {
    localStorage.setItem(STORAGE_KEYS.FIRST_AID, JSON.stringify(MOCK_FIRST_AID_ARTICLES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EMR)) {
    localStorage.setItem(STORAGE_KEYS.EMR, JSON.stringify(MOCK_MEDICAL_RECORDS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAMILY)) {
    localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(MOCK_FAMILY));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEMO_USER));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    const initialNotifs: NotificationItem[] = [
      {
        id: "notif-1",
        userId: DEMO_USER.id,
        title: {
          uz: "Qabulga yozilish muvaffaqiyatli",
          ru: "Запись на приём успешна"
        },
        message: {
          uz: "28-avgust kuni 10:30 da Dr. Alisher Toshmatov qabulingiz bor.",
          ru: "28 августа в 10:30 у вас приём у Dr. Alisher Toshmatov."
        },
        type: "appointment",
        timestamp: new Date().toISOString(),
        read: false
      }
    ];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifs));
  }
}

export const dbService = {
  // User Profile
  getUserProfile(): UserProfile {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : DEMO_USER;
  },

  updateUserProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getUserProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return updated;
  },

  // Facilities
  getFacilities(): Facility[] {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.FACILITIES);
    return data ? JSON.parse(data) : MOCK_FACILITIES;
  },

  saveFacility(facility: Facility): Facility[] {
    const current = this.getFacilities();
    const index = current.findIndex(f => f.id === facility.id);
    let updated: Facility[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = facility;
    } else {
      updated = [facility, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated));
    return updated;
  },

  // Doctors
  getDoctors(): Doctor[] {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
    return data ? JSON.parse(data) : MOCK_DOCTORS;
  },

  // Appointments
  getAppointments(): Appointment[] {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : MOCK_APPOINTMENTS;
  },

  addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const current = this.getAppointments();
    const newAppointment: Appointment = {
      ...appointment,
      id: `app-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newAppointment, ...current];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    return newAppointment;
  },

  updateAppointmentStatus(id: string, status: 'upcoming' | 'completed' | 'cancelled'): Appointment[] {
    const current = this.getAppointments();
    const updated = current.map(app => app.id === id ? { ...app, status } : app);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    return updated;
  },

  // First Aid
  getFirstAidArticles(): FirstAidArticle[] {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.FIRST_AID);
    return data ? JSON.parse(data) : MOCK_FIRST_AID_ARTICLES;
  },

  // EMR Medical Records
  getMedicalRecords(): MedicalRecord[] {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.EMR);
    return data ? JSON.parse(data) : MOCK_MEDICAL_RECORDS;
  },

  addMedicalRecord(record: Omit<MedicalRecord, 'id'>): MedicalRecord {
    const current = this.getMedicalRecords();
    const newRecord: MedicalRecord = {
      ...record,
      id: `emr-${Date.now()}`
    };
    const updated = [newRecord, ...current];
    localStorage.setItem(STORAGE_KEYS.EMR, JSON.stringify(updated));
    return newRecord;
  },

  // Family Members
  getFamilyMembers(): FamilyMember[] {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.FAMILY);
    return data ? JSON.parse(data) : MOCK_FAMILY;
  },

  addFamilyMember(member: Omit<FamilyMember, 'id'>): FamilyMember {
    const current = this.getFamilyMembers();
    const newMember: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}`
    };
    const updated = [...current, newMember];
    localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(updated));
    return newMember;
  },

  // Notifications
  getNotifications(): NotificationItem[] {
    initLocalStorage();
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  },

  addNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>): NotificationItem {
    const current = this.getNotifications();
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    const updated = [newNotif, ...current];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return newNotif;
  },

  markNotificationsAsRead(): void {
    const current = this.getNotifications();
    const updated = current.map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  }
};
