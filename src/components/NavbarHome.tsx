import { useEffect, useState } from "react";
import {
  FaBars,
  FaTree,
  FaLeaf,
  FaMountain,
  FaGlobe,
  FaSignOutAlt,
  FaEdit,
  FaChartLine,
  FaHome,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "/imagenes/Logo-Gaia.png";
import "./NavbarHome.css";
import useAuthStore from "../stores/use-auth-store";
import userDao from "../daos/user-DAO.js";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPhotoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const user = userDao.getUserData();
    setUserName(user.name ?? "");
    setEmail(user.email ?? "");
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="nav-container">
      {/* Botón del menú */}
      <div
        className={`menu-icon ${dropdownOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        {dropdownOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Logo */}
      <div className="flex flex-row">
        <div className="flex flex-col align-center justify-center">
          <p className="p-0 m-0 leading-tight">{userName}</p>
          <p className="p-0 m-0 leading-tight">{userEmail}</p>
        </div>
        <img src={logo} alt="Project Logo" className="logo-image" />
      </div>
      {dropdownOpen && (
        <div className="sub-menu">
          {/* Opciones de menú usando navigate */}
          <div
            className="sub-menu-item"
            onClick={() => {
              toggleDropdown();
              navigate("/home");
            }}
          >
            <FaHome />
            <span>Inicio</span>
          </div>
          <div
            className="sub-menu-item"
            onClick={() => {
              toggleDropdown();
              navigate("/loss-of-biodiversity");
            }}
          >
            <FaLeaf />
            <span>Pérdida de biodiversidad</span>
          </div>
          <div
            className="sub-menu-item"
            onClick={() => {
              toggleDropdown();
              navigate("/deforest");
            }}
          >
            <FaTree />
            <span>Deforestación</span>
          </div>
          <div
            className="sub-menu-item"
            onClick={() => {
              toggleDropdown();
              navigate("/erosion");
            }}
          >
            <FaMountain />
            <span>Erosión</span>
          </div>
          <div
            className="sub-menu-item"
            onClick={() => {
              toggleDropdown();
              navigate("/quiz");
            }}
          >
            <FaGlobe />
            <span>QUIZ</span>
          </div>
          {/* Opciones adicionales */}
          <div
            className="sub-menu-item"
            onClick={() => {
              toggleDropdown();
              auth.profileSettings();
            }}
          >
            <FaEdit />
            <span>Ajustes perfil</span>
          </div>
          <div
            className="sub-menu-item"
            onClick={() => {
              toggleDropdown();
              auth.myProgress();
            }}
          >
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

export default Navbar;
