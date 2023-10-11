import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { firebaseApp } from '@/firebase/config';

const auth = getAuth(firebaseApp);
type AuthContextType = { currentUser?: User | null; loading?: boolean };
export const AuthContext = React.createContext<AuthContextType>({});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);

