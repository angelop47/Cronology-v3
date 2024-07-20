import React from "react";
import { signOut, auth } from "../utils/firebase-config";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
