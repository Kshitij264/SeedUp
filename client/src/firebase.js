// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// --- NEW --- Import the getFirestore function
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqZeMJbY9kChNI_DTY7-664GdzuDbG5YY",
  authDomain: "seedup-ec0fd.firebaseapp.com",
  projectId: "seedup-ec0fd",
  storageBucket: "seedup-ec0fd.firebasestorage.app",
  messagingSenderId: "408087205582",
  appId: "1:408087205582:web:a2ed2c372b994df9a7a29f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get and export the auth service
export const auth = getAuth(app);
// --- NEW --- Get and export the firestore database service
export const db = getFirestore(app);