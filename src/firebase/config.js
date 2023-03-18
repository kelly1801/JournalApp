import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCwDdWYWDWOkHMHUBoKDLX6nJVBM7iyfgw",
  authDomain: "journalapp-1e73d.firebaseapp.com",
  projectId: "journalapp-1e73d",
  storageBucket: "journalapp-1e73d.appspot.com",
  messagingSenderId: "1089052273025",
  appId: "1:1089052273025:web:f290b0d419cb190c512080"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )
