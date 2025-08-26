import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyClCpXrhlfbVtPOc64DfFQagSNJ_Z9zQiU",
  authDomain: "notion-clone-88c1b.firebaseapp.com",
  projectId: "notion-clone-88c1b",
  storageBucket: "notion-clone-88c1b.firebasestorage.app",
  messagingSenderId: "1021377328271",
  appId: "1:1021377328271:web:4c82c71be929ee524d2cfa",
  measurementId: "G-SYQ7KZ1RJ4"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };