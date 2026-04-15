import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMembers } from '../data/api';

interface Member {
  id: string;
  _id?: string;
  customId?: string;
  name: string;
  email: string;
  country: string;
  school: string;
  whatsapp?: string;
  interests: string[];
  role: string;
  joinDate: string;
  enrolledCourses: string[];
  completedCourses: string[];
  certificates: string[];
  activityLog: any[];
}

interface AuthContextType {
  user: Member | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<Member>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('rsic_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('rsic_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const members = await fetchMembers();
      if (!Array.isArray(members)) throw new Error('Invalid response from server');
      
      const member = members.find((m: any) => m.email === email && m.password === password);
      if (member) {
        // Ensure arrays exist
        const formattedMember = {
          ...member,
          enrolledCourses: member.enrolledCourses || [],
          completedCourses: member.completedCourses || [],
          certificates: member.certificates || [],
          activityLog: member.activityLog || []
        };
        localStorage.setItem('rsic_user', JSON.stringify(formattedMember));
        setUser(formattedMember);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('rsic_user');
    setUser(null);
  };

  const updateUser = (updatedFields: Partial<Member>) => {
    if (!user) return;
    const newUser = { ...user, ...updatedFields };
    localStorage.setItem('rsic_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const members = await fetchMembers();
      const fresh = members.find((m: any) => m.email === user.email);
      if (fresh) {
        localStorage.setItem('rsic_user', JSON.stringify(fresh));
        setUser(fresh);
      }
    } catch (e) {
      console.error('Failed to refresh user', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
