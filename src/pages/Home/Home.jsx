import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-home">
      <div className="header">
        Gaia
      </div>
      <div className="main-content">
        <h1>Bienvenido a la GAIA</h1>
        <p>
          Esta es la página principal de tu aplicación. Aquí puedes encontrar información relevante y acceder a diferentes secciones. Utiliza los botones a continuación para navegar por la aplicación.
        </p>
        <div className="button-container">
          <Link to="/login" className="button">Iniciar sesión</Link>
          <Link to="/signup" className="button">Crear cuenta</Link>
        </div>
      </div>
      <footer className="footer">
        <p>
          &copy; 2024 Mi Aplicación. <Link to="/contact">Contáctanos</Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
