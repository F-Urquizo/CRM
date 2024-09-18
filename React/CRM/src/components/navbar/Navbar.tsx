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
        <img src="/search.svg" alt="Search" className="icon" />
        <img src="/app.svg" alt="App" className="icon" />
        <img src="/expand.svg" alt="Expand" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="Notifications" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="/mbappe.png" alt="User" />
          <span>Mbappe</span>
        </div>
        {/* Icono de configuraciones con evento de click */}
        <img
          src="/settings.svg"
          alt="Settings"
          className="icon"
          onClick={toggleSettingsMenu}
        />
        {/* Menú de configuración desplegable */}
        {showSettingsMenu && (
          <div className="settings-menu">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
