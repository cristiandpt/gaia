import React, { useState } from 'react';
import { FaBars, FaTree, FaLeaf, FaMountain, FaGlobe, FaSignOutAlt, FaEdit, FaChartLine, FaHome, FaTimes } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from "../../context/AuthContext"; 
import logo from '../../assets/imagenes/logofc.png'; 
import './Navbar.css';

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar-container">
      {/* Botón del menú */}
      <div className={`menu-icon ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {dropdownOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Project Logo" className="logo-image" />
      </div>

      {dropdownOpen && (
        <div className="sub-menu">
          {/* Opciones de menú usando navigate */}
          <div className="sub-menu-item" onClick={() => { toggleDropdown(); navigate("/inicio"); }}>
            <FaHome />
            <span>Inicio</span>
          </div>
          <div className="sub-menu-item" onClick={() => { toggleDropdown(); navigate("/perdidabio"); }}>
            <FaLeaf />
            <span>Pérdida de biodiversidad</span>
          </div>
          <div className="sub-menu-item" onClick={() => { toggleDropdown(); navigate("/desforestacion"); }}>
            <FaTree />
            <span>Deforestación</span>
          </div>
          <div className="sub-menu-item" onClick={() => { toggleDropdown(); navigate("/erosion"); }}>
            <FaMountain />
            <span>Erosión</span>
          </div>
          <div className="sub-menu-item" onClick={() => { toggleDropdown(); navigate("/quiz"); }}>
            <FaGlobe />
            <span>QUIZ</span>
          </div>
          {/* Opciones adicionales */}
          <div className="sub-menu-item" onClick={() => { toggleDropdown(); auth.profileSettings(); }}>
            <FaEdit />
            <span>Ajustes perfil</span>
          </div>
          <div className="sub-menu-item" onClick={() => { toggleDropdown(); auth.myProgress(); }}>
            <FaChartLine />
            <span>Mi progreso</span>
          </div>
          <div className="sub-menu-item" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </div>
        </div>
      )}
    </div>
  );
};
