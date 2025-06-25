import { useState, ReactNode, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { decodeJWT, isTokenExpired, isTokenExpiringSoon } from '../utils/JwtService.ts';

const ACCESS_TOKEN_KEY = 'accessToken';

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const logout = () => {
    setAccessToken(null);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, isAuthenticated, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};