// src/components/useAuth.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { auth, provider } from "../utils/firebase-config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
        };

        // Guardar o actualizar el usuario en MongoDB
        await axios.post(
          "https://cronology-v3.onrender.com/users/auth/google",
          userData
        );

        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Datos del usuario
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      // Llamar a la API de tu backend para guardar o actualizar el usuario en MongoDB
      await axios.post(
        "https://cronology-v3.onrender.com/users/auth/google",
        userData
      );

      setUser(user);
      console.log("Usuario autenticado y datos guardados");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
      console.log("Usuario cerrado sesión");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
