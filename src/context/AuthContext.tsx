import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { dbService } from '../services/dbService';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginAsDemo: () => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => dbService.getUserProfile());

  const loginAsDemo = () => {
    const defaultUser = dbService.getUserProfile();
    setUser(defaultUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    const updated = dbService.updateUserProfile(profile);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginAsDemo, logout, updateProfile }}>
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
