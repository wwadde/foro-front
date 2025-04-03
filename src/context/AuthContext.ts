import { createContext, useContext } from 'react';

interface AuthContextType {
  userLogged: boolean;
  setUserLogged: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};