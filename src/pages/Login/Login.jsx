import React, { useState, useCallback, useEffect } from 'react';
import './Login.css'; // Asegúrate de tener estilos adecuados en Login.css
import useAuthStore from '../../stores/use-auth-store'; // Asegúrate de que este hook esté correctamente configurado
import UserDAO from '../../daos/user-DAO'; // Asegúrate de que UserDAO esté configurado para manejar datos de usuario
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, loginGoogleWithPopUp, logout, observeAuthState, loading, signUpWithEmailPassword } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
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
      navigate('/Quiz');
    }
  }, [user, navigate]);

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Autenticación con email y contraseña
      await signUpWithEmailPassword(email, password);
      alert('Registro exitoso!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="loading-text">Cargando...</p>;
  }

  return (
    <div className="container-login">
      {user ? (
        <>
          <p className="welcome-text">Bienvenido, {user.displayName}</p>
          <button className="button-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit">Crear cuenta</button>
          </form>
          <button className="button-google" onClick={handleLogin}>
            Iniciar sesión con Google
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
