import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
  } from 'firebase/auth';
  
  import { firebaseApp } from '../firebase/config';
  
  const auth = getAuth(firebaseApp);
  
  export const authUtils = {
    login: async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    logout: async () => {
      await auth.signOut();
    },
    register: async (email: string, password: string, displayName: string) => {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
  
      await updateProfile(user, {
        displayName,
      });
    },
    getCurrentUser: () => auth.currentUser,
  };
  