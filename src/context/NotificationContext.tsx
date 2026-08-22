import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem } from '../types';
import { dbService } from '../services/dbService';
import { smsProvider, SMSMessagePayload } from '../services/smsService';

interface ActiveSMSToast {
  id: string;
  toPhone: string;
  body: string;
  timestamp: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  activeToast: ActiveSMSToast | null;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  sendSMSNotification: (payload: SMSMessagePayload) => Promise<void>;
  markAllRead: () => void;
  closeToast: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => dbService.getNotifications());
  const [activeToast, setActiveToast] = useState<ActiveSMSToast | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif = dbService.addNotification(notif);
    setNotifications(prev => [newNotif, ...prev]);
  };

  const sendSMSNotification = async (payload: SMSMessagePayload) => {
    // Dispatch via SMS service
    await smsProvider.sendSMS(payload);

    // Show simulated toast
    const toast: ActiveSMSToast = {
      id: `toast-${Date.now()}`,
      toPhone: payload.toPhone,
      body: payload.body,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActiveToast(toast);

    // Add to in-app notification list as well
    addNotification({
      userId: 'usr-001',
      title: {
        uz: `📱 SMS Yuborildi (${payload.toPhone})`,
        ru: `📱 SMS Отправлено (${payload.toPhone})`
      },
      message: {
        uz: payload.body,
        ru: payload.body
      },
      type: 'sms_sent'
    });

    // Auto dismiss toast after 6 seconds
    setTimeout(() => {
      setActiveToast(current => (current?.id === toast.id ? null : current));
    }, 6000);
  };

  const markAllRead = () => {
    dbService.markNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const closeToast = () => {
    setActiveToast(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        activeToast,
        addNotification,
        sendSMSNotification,
        markAllRead,
        closeToast
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
