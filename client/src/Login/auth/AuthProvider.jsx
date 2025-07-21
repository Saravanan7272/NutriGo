import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthChange, logOut as firebaseLogOut } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profileCompleted, setProfileCompleted] = useState(() =>
    localStorage.getItem('profileCompleted') === 'true'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {

      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  const logout = async () => {
    await firebaseLogOut();
    setProfileCompleted(false);
    localStorage.removeItem('profileCompleted');
  };

  const completeProfile = () => {
    setProfileCompleted(true);
    localStorage.setItem('profileCompleted', 'true');
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, profileCompleted, logout, loading, completeProfile }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
