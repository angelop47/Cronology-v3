// src/components/Login.js
import React from "react";
import { useAuth } from "../components/useAuth";

const Login = () => {
  const { user, signInWithGoogle } = useAuth();

  const handleLoginClick = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      {!user && (
        <button
          onClick={handleLoginClick}
          className="btn bg-blue-600 text-white font-semibold px-3 py-1 rounded duration-500"
        >
          Iniciar sesión con Google
        </button>
      )}
      {user && (
        <div>
          {/* Aquí podrías redirigir al usuario a la página que desees después de iniciar sesión */}
          <p>Bienvenido, {user.displayName}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
