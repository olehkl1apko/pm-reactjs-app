import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "pm-reactjs-app.firebaseapp.com",
  projectId: "pm-reactjs-app",
  storageBucket: "pm-reactjs-app.appspot.com",
  messagingSenderId: "1045201456909",
  appId: "1:1045201456909:web:d5297ce58d34fec863ea44",
};

const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);
const projectStorage = getStorage(app);
const timestamp = new Timestamp();

export { projectFirestore, projectAuth, projectStorage, timestamp };
