import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "chat-nextjs-app-b724c.firebaseapp.com",
  projectId: "chat-nextjs-app-b724c",
  storageBucket: "chat-nextjs-app-b724c.appspot.com",
  messagingSenderId: "207834522848",
  appId: "1:207834522848:web:98c930125a03a587125c85",
};

const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);
const timestamp = new Timestamp();

export { projectFirestore, projectAuth };
