// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getApps} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB6KFP05emDC7Ca-HUbGh2JZKG5KzMLPzU",
  authDomain: "maturitniprojekt-74835.firebaseapp.com",
  projectId: "maturitniprojekt-74835",
  storageBucket: "maturitniprojekt-74835.appspot.com",
  messagingSenderId: "1003490543407",
  appId: "1:1003490543407:web:19391af08e925a840b43da",
  measurementId: "G-SGW74GE5HB"
  };


const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default  firebaseApp 
