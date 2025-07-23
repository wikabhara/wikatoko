// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAApl5ScxML20pKoCgJw4VyEv26qxBJQ-o",
//   authDomain: "p2-gc01-c78be.firebaseapp.com",
//   projectId: "p2-gc01-c78be",
//   storageBucket: "p2-gc01-c78be.firebasestorage.app",
//   messagingSenderId: "812381491840",
//   appId: "1:812381491840:web:ae8be854b56f3622a20c65",
//   measurementId: "G-CEH81DH4E0",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
