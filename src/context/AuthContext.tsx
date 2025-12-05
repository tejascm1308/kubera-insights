import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('kubera_token');
    const storedUser = localStorage.getItem('kubera_user');
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('kubera_token');
        localStorage.removeItem('kubera_user');
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      user_id: 'user_123',
      username: email.split('@')[0],
      email,
      full_name: 'Demo User',
      created_at: new Date().toISOString(),
    };
    
    localStorage.setItem('kubera_token', 'mock_jwt_token');
    localStorage.setItem('kubera_user', JSON.stringify(mockUser));
    
    setState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (data: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      user_id: 'user_' + Date.now(),
      username: data.username,
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
      created_at: new Date().toISOString(),
    };
    
    localStorage.setItem('kubera_token', 'mock_jwt_token');
    localStorage.setItem('kubera_user', JSON.stringify(mockUser));
    
    setState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('kubera_token');
    localStorage.removeItem('kubera_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (updates: Partial<User>) => {
    setState(prev => {
      if (!prev.user) return prev;
      const updatedUser = { ...prev.user, ...updates };
      localStorage.setItem('kubera_user', JSON.stringify(updatedUser));
      return { ...prev, user: updatedUser };
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
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
