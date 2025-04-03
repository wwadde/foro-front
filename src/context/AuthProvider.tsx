import { useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userLogged, setUserLogged] = useState(false);

  return (
    <AuthContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </AuthContext.Provider>
  );
};