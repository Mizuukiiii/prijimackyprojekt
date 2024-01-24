import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase/config';

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

    // Update user profile
    await updateProfile(user, {
      displayName,
    });

    // Store additional user data in Firestore
    await addUserToFirestore(user.uid, {
      email,
      displayName,
      // You can add more user data as needed
    });
  },
  getCurrentUser: () => auth.currentUser,
};

// Helper function to add user to Firestore
const addUserToFirestore = async (userId: string, userData: any) => {
  const usersCollection = collection(firestore, 'users');

  // Set the user data with the UID as the document ID
  await setDoc(doc(usersCollection, userId), {
    uid: userId,
    score: 0,
    numberofexercises: 5,
    numberofexercisesintest: 50,
    ...userData,
  });
};