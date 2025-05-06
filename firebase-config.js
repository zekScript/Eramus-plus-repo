// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBgJWU8PYKrxMc8Ux0JF5K_1Y5sjjzxjI",
  authDomain: "portfolio-firebase-project.firebaseapp.com",
  projectId: "portfolio-firebase-project",
  storageBucket: "portfolio-firebase-project.firebasestorage.app",
  messagingSenderId: "107028133078",
  appId: "1:107028133078:web:0f476997e698301c9b0577"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);