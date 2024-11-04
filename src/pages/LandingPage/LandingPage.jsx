// // src/components/Login.jsx
// import "./Home.css";
// import { useCallback, useEffect } from "react";
// import useAuthStore from "../../stores/use-auth-store";
// import UserDAO from "../../daos/user-DAO";
// import { useNavigate } from "react-router-dom";
// import SignIn from "../../components/SignIn";

// const Login = () => {

//   const { user, loginGoogleWithPopUp, logout, observeAuthState, loading } =
//     useAuthStore();

//   const navigate = useNavigate();

//   useEffect(() => {
//     observeAuthState();
//   }, [observeAuthState]);

//   useEffect(() => {
//     if (user) {
//       const newUser = {
//         email: user.email,
//         name: user.displayName,
//         photo: user.photoURL,
//       };
//       UserDAO.createUser(newUser);
//       navigate("/Inicio");
//     }
//   }, [user, navigate]);

//   const handleLogin = useCallback(() => {
//     loginGoogleWithPopUp();
//   }, [loginGoogleWithPopUp]);

//   const handleLogout = useCallback(() => {
//     logout();
//   }, [logout]);

//   if (loading) {
//     return <p className="loading-text">Cargando...</p>;
//   }

//   return (
//     <div className="container-login">

//       {user ? (
//         <>
//           <p className="welcome-text">Bienvenido, {user.displayName}</p>
//           <button className="button-logout" onClick={handleLogout}>
//             Cerrar sesión
//           </button>
//         </>
//       ) : (
//         <SignIn />
//       )}
import "./LandingPage.css";
import React, { useCallback, useEffect } from "react";
import useAuthStore from "../../stores/use-auth-store";
import UserDAO from "../../daos/user-DAO";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  const { user, loginGoogleWithPopUp, logout, observeAuthState, loading } =
    useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  useEffect(() => {
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      UserDAO.createUser(newUser);
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleSignup = useCallback(() => {
    navigate("/unauthenticated/register");
  }, [navigate]);

  const handleIniciarSesion = useCallback(() => {
    navigate("/unauthenticated/signin"); // Cambia la ruta según tu configuración
  }, [navigate]);

  if (loading) {
    return <p className="loading-text">Cargando...</p>;
  }

  return (
    <div className="container-home">
      <div className="background-image"></div>
      <div className="content">
        <h1 className="gaia-logo">Gaia</h1>
        <p className="description">Bienvenido a Gaia</p>
        <div className="button-container">
          <button onClick={handleLogin} className="button google-button">
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Iniciar sesión con Google
          </button>
          <button onClick={handleSignup} className="button signup-button">
            Crear cuenta
          </button>
          <button
            onClick={handleIniciarSesion}
            className="button iniciar-sesion-button"
          >
            Iniciar Sesión
          </button>{" "}
          {/* Botón de Iniciar Sesión */}
        </div>
      </div>
    </div>
  );
};

export default Home;
