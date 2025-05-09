// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUdPlY12VKMRtYKGMBTkvglt-boSXyH30",
  authDomain: "countries-app-d0079.firebaseapp.com",
  projectId: "countries-app-d0079",
  storageBucket: "countries-app-d0079.firebasestorage.app",
  messagingSenderId: "961168890366",
  appId: "1:961168890366:web:807dfd932218bb072488af",
  measurementId: "G-ZQ1YTK8FXV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
