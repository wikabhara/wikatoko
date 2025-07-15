// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAApl5ScxML20pKoCgJw4VyEv26qxBJQ-o",
  authDomain: "p2-gc01-c78be.firebaseapp.com",
  projectId: "p2-gc01-c78be",
  storageBucket: "p2-gc01-c78be.firebasestorage.app",
  messagingSenderId: "812381491840",
  appId: "1:812381491840:web:ae8be854b56f3622a20c65",
  measurementId: "G-CEH81DH4E0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
