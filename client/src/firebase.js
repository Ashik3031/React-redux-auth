// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mernauth-47871.firebaseapp.com",
  projectId: "mernauth-47871",
  storageBucket: "mernauth-47871.appspot.com",
  messagingSenderId: "453513356748",
  appId: "1:453513356748:web:8fe7bc591179a2c22ce969",
  measurementId: "G-FWPQS3Q3SN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
