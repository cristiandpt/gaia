import './Login.css';
import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../../components/SignIn';

const Login = () => {
  return (
    <div className="container-home bg-beige relative">
      <div className='absolute z-11 b-0'>
			</div>
      <div className="z-1000  t-0">
          <h1>Bienvenido a la GAIA</h1> 
          <SignIn />
      </div>	
      <footer className="footer">
        <p>
          &copy; 2024 Mi Aplicación. <Link to="/contact">Contáctanos</Link>
        </p>
      </footer>
    </div>
  );
};

export default Login;
