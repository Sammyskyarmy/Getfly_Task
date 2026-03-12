import { useState, useEffect, createContext } from 'react';
import { MOCK_EMAIL, MOCK_PASSWORD } from '../constants/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check initial state on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isLoggedIn');
    if (storedAuth === 'true') {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
          resolve(true);
        } else {
          reject("Invalid credentials. Please try again.");
        }
        setLoading(false);
      }, 800); // simulate API delay
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
