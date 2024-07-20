// src/components/LoginButton.js
import React from "react";
import { signInWithPopup, provider, auth } from "../utils/firebase-config";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login successful");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return <button onClick={handleLogin}>Log In with Google</button>;
};

export default LoginButton;
