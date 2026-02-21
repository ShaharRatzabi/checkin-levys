// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu9Ff60qYOfhTxZ1s7hrOCx2wih4TbqAY",
  authDomain: "check-in-levys-472812.firebaseapp.com",
  projectId: "check-in-levys-472812",
  storageBucket: "check-in-levys-472812.firebasestorage.app",
  messagingSenderId: "454822559657",
  appId: "1:454822559657:web:beaa9ba46c336b5da70eb8",
  measurementId: "G-E4Q2WW8TGW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export a reference to the services you need
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
