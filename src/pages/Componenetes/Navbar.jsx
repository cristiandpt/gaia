import React, { useState } from 'react';
import { FaBars, FaTree, FaLeaf, FaMountain, FaGlobe, FaUserCircle, FaSignOutAlt, FaEdit, FaChartLine, FaHome, FaTimes } from 'react-icons/fa'; 
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import logo from '../../assets/imagenes/logofc.png'; 
import './Navbar.css';

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(null);
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

  const handleProfileSettings = () => {
    console.log('Ajustes de perfil');
  };

  const handleMyProgress = () => {
    console.log('Mi progreso');
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
          {/* Opciones de menú */}
          <div className={`sub-menu-item ${highlightedOption === 'inicio' ? 'highlight' : ''}`} onClick={toggleDropdown}>
            <FaHome />
            <span>Inicio</span>
          </div>
          <div className={`sub-menu-item ${highlightedOption === 'biodiversidad' ? 'highlight' : ''}`} onClick={toggleDropdown}>
            <FaLeaf />
            <span>Pérdida de biodiversidad</span>
          </div>
          <div className={`sub-menu-item ${highlightedOption === 'deforestacion' ? 'highlight' : ''}`} onClick={toggleDropdown}>
            <FaTree />
            <span>Deforestación</span>
          </div>
          <div className={`sub-menu-item ${highlightedOption === 'erosion' ? 'highlight' : ''}`} onClick={toggleDropdown}>
            <FaMountain />
            <span>Erosión</span>
          </div>
          <div className={`sub-menu-item ${highlightedOption === 'quiz' ? 'highlight' : ''}`} onClick={toggleDropdown}>
            <FaGlobe />
            <span>QUIZ</span>
          </div>
          {/* Opciones originales */}
          <div className={`sub-menu-item ${highlightedOption === 'edit' ? 'highlight' : ''}`} onClick={handleProfileSettings}>
            <FaEdit />
            <span>Ajustes perfil</span>
          </div>
          <div className={`sub-menu-item ${highlightedOption === 'progress' ? 'highlight' : ''}`} onClick={handleMyProgress}>
            <FaChartLine />
            <span>Mi progreso</span>
          </div>
          <div className={`sub-menu-item ${highlightedOption === 'logout' ? 'highlight' : ''}`} onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Cerrar sesión</span>
          </div>
        </div>
      )}
    </div>
  );
};
