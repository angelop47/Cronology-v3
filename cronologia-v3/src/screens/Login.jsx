// src/components/Login.js
import React from "react";
import { useAuth } from "../components/useAuth";

const Login = () => {
  const { user, login, logout } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!user ? (
        <button
          onClick={login}
          className="btn bg-blue-600 text-white font-semibold px-3 py-1 rounded duration-500"
        >
          Iniciar sesión con Google
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">Bienvenido, {user.displayName}</p>
          <button
            onClick={logout}
            className="btn bg-red-600 text-white font-semibold px-3 py-1 rounded duration-500"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
