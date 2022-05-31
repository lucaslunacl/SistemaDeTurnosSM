import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAEXDP7ohfQg2Rn0LdWyb4yN34w7XHHX4U",
  authDomain: "smdepilacion-ffcea.firebaseapp.com",
  projectId: "smdepilacion-ffcea",
  storageBucket: "smdepilacion-ffcea.appspot.com",
  messagingSenderId: "777243227869",
  appId: "1:777243227869:web:016cbac084b4251de00d34",
  measurementId: "G-ZVJNVM1GJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const store = getFirestore();

export {auth, store}