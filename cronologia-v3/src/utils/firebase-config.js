import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3bPZQVXnQoW0IG1tnvCagNv4JkVUyrbk",
  authDomain: "cronologia-v3.firebaseapp.com",
  projectId: "cronologia-v3",
  storageBucket: "cronologia-v3.appspot.com",
  messagingSenderId: "530403386589",
  appId: "1:530403386589:web:ad8d9d75b48dce46012734",
  measurementId: "G-0032CHWGQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and provider for use in other files
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, app };
