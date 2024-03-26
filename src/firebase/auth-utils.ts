import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import firebaseApp  from '../firebase/config';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const authUtils = {
  login: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  logout: async () => {
    await auth.signOut();
  },
  register: async (email: string, password: string, displayName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, {
      displayName,
    });

    await addUserToFirestore(user.uid, {
      email,
      displayName,
    });
  },
  getCurrentUser: () => auth.currentUser,
};

const addUserToFirestore = async (userId: string, userData: any) => {
  const usersCollection = collection(firestore, 'users');

  await setDoc(doc(usersCollection, userId), {
    uid: userId,
    score: 0,
    numberofexercises: 5,
    numberofexercisesintest: 50,
    ...userData,
  });
};