import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const Login = () => {
  const provider = new GoogleAuthProvider();

  const handleLoginClick = async () => {
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

      console.log("Usuario autenticado y datos guardados");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLoginClick}
        className="btn bg-blue-600 text-white font-semibold px-3 py-1 rounded duration-500"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;

// // src/components/Login.js
// import React from "react";
// import { useAuth } from "../components/useAuth";
// import LoginButton from "../components/LoginButton";
// import LogoutButton from "../components/LogoutButton";

// const Login = () => {
//   const { user } = useAuth();

//   return (
//     <div>
//       {!user ? (
//         <LoginButton />
//       ) : (
//         <div>
//           <p>Bienvenido, {user.displayName}</p>
//           <LogoutButton />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
