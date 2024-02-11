// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2f917.firebaseapp.com",
  projectId: "mern-blog-2f917",
  storageBucket: "mern-blog-2f917.appspot.com",
  messagingSenderId: "996884279436",
  appId: "1:996884279436:web:7edf63c0bc143a50920ba9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
