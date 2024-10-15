import React, { useState } from "react";
import "./navbar.css";

export const Navbar = () => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem("username");
    localStorage.removeItem("rol");
    window.location.reload(); // Recarga la página para aplicar el log out
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Fundación Sanders logo" />
        <span className="titulo">Fundación Sanders</span>
      </div>
      <div className="icons">
        <img
          src="/settings.svg"
          alt="Settings"
          className="icon"
          onClick={toggleSettingsMenu}
        />
        {/* Menú de configuración desplegable */}
        {showSettingsMenu && (
          <div className="settings-menu">
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
