// src/components/UserStatus.js
import React from "react";
import { useAuth } from "./useAuth";
// import LoginButton from "./LoginButton";
// import LogoutButton from "./LogoutButton";

const UserStatus = () => {
  const { user, loading } = useAuth();

  console.log("UserStatus user:", user, "loading:", loading);

  if (loading) {
    return <div>Loading...</div>; // Puedes personalizar esto con un spinner u otra cosa
  }

  return (
    <div>
      {user ? (
        <>
          <p>
            <a>Welcome, {user.displayName}!</a>
          </p>
          {/* <LogoutButton /> */}
        </>
      ) : (
        {
          /* <LoginButton /> */
        }
      )}
    </div>
  );
};

export default UserStatus;
