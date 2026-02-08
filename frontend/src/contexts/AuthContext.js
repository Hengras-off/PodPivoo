import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('streamx_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('streamx_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('streamx_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem('streamx_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Неверный email или пароль' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('streamx_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Пользователь с таким email уже существует' };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('streamx_users', JSON.stringify(users));
    
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('streamx_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streamx_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};