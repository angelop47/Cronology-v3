// src/components/Login.js
import React from "react";
import { useAuth } from "../components/useAuth";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Login = () => {
  const { user } = useAuth();

  return (
    <div>
      {!user ? (
        <LoginButton />
      ) : (
        <div>
          <p>Bienvenido, {user.displayName}</p>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default Login;
