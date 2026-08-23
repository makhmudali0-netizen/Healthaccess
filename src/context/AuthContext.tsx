import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { dbService } from '../services/dbService';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginAsDemo: () => void;
  registerUser: (newUser: UserProfile) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('healthaccess_user_logged_in');
    return saved === 'true' ? dbService.getUserProfile() : null;
  });

  const loginAsDemo = () => {
    const defaultUser = dbService.getUserProfile();
    localStorage.setItem('healthaccess_user_logged_in', 'true');
    setUser(defaultUser);
  };

  const registerUser = (newUser: UserProfile) => {
    dbService.updateUserProfile(newUser);
    localStorage.setItem('healthaccess_user_logged_in', 'true');
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('healthaccess_user_logged_in');
    setUser(null);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    const updated = dbService.updateUserProfile(profile);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginAsDemo, registerUser, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
