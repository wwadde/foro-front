import { useState, ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';

const AuthCookieName = 'auth-token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return Cookies.get(AuthCookieName) || null;
  });

  const logout = () => {
    setToken(null);
    console.log(Cookies.get(AuthCookieName));
    Cookies.remove(AuthCookieName);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};