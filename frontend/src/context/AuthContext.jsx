// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Holds user object { name, email, token }
  const [loading, setLoading] = useState(true); // For future: show loader until auth is checked

  useEffect(() => {
    // On load, check if user info exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem('doc-user'));
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('doc-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('doc-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
