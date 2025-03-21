
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string): Promise<void> => {
    // In a real app, you would validate credentials with a backend
    // For this demo, we'll simulate a successful login with any credentials
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a fake user object
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0], // Extract name from email for demo
      email,
    };
    
    // Save user to state and localStorage
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return Promise.resolve();
  };

  // Sign up function
  const signUp = async (name: string, email: string, password: string): Promise<void> => {
    // In a real app, you would create a new user in your backend
    // For this demo, we'll simulate a successful registration
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // We won't auto-login after signup in this demo
    return Promise.resolve();
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
