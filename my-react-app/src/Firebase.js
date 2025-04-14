import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {  
    apiKey: process.env.REACT_APP_DB_KEY,
    authDomain: "but-then-what.firebaseapp.com",
    projectId: "but-then-what",
    storageBucket: "but-then-what.firebasestorage.app",
    messagingSenderId: "1036479180485",
    appId: "1:1036479180485:web:d44f40e57d9bf8f1b9caac",
    measurementId: "G-T9TX31MZ9E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);