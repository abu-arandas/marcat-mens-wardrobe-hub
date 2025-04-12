import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Validate stored auth data on mount with memoized function
  const validateAuth = useCallback(async () => {
    try {
      setLoading(true);
      setAuthError(null);
      
      // Get stored user data
      const storedUser = localStorage.getItem('marcatUser');
      if (!storedUser) {
        setLoading(false);
        return;
      }

      // Parse user data
      const userData = JSON.parse(storedUser);
      
      // Validate user object structure
      if (!userData.id || !userData.email) {
        console.error('Invalid user data in storage');
        localStorage.removeItem('marcatUser');
        setLoading(false);
        return;
      }
      
      // In a real app, we would validate the token with the backend here
      setUser(userData);
    } catch (error) {
      console.error('Error validating authentication:', error);
      localStorage.removeItem('marcatUser'); // Clear invalid data
      setAuthError('Authentication validation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    validateAuth();
  }, [validateAuth]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      // Simulate API delay - reduced for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let loggedInUser = null;
      
      // Demo validation - in real app this would be server-side
      if (email === 'demo@marcat.com' && password === 'password') {
        loggedInUser = { id: '1', email, name: 'Demo User', isAdmin: false };
        setUser(loggedInUser);
        localStorage.setItem('marcatUser', JSON.stringify(loggedInUser));
      } else if (email === 'admin@marcat.com' && password === 'adminpass') {
        loggedInUser = { id: '2', email, name: 'Admin User', isAdmin: true };
        setUser(loggedInUser);
        localStorage.setItem('marcatUser', JSON.stringify(loggedInUser));
      } else {
        throw new Error('Invalid credentials');
      }
      
      return loggedInUser;
    } catch (error) {
      setAuthError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      // Simulate API delay - reduced for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would send data to your backend
      const user = { id: Date.now().toString(), email, name, isAdmin: false };
      setUser(user);
      localStorage.setItem('marcatUser', JSON.stringify(user));
    } catch (error) {
      setAuthError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('marcatUser');
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('marcatUser', JSON.stringify(updatedUser));
  }, [user]);

  // Computed property to check if the user is an admin
  const isAdmin = user?.isAdmin || false;

  const contextValue = {
    user,
    loading,
    authError,
    login,
    signup,
    logout,
    updateProfile,
    isAdmin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
