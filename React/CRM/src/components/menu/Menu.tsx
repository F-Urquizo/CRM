import React from "react";
import { Menu, MenuItemLink, usePermissions, MenuProps } from "react-admin";
import DonacionesIcon from "@mui/icons-material/AttachMoney";
import UsuariosIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import "./menu.css";
import { menuAdmin } from "../../menuAdmin";
import { menuUsuario } from "../../menuUsuarios";

const handleLogout = () => {
  // Lógica para cerrar sesión
  localStorage.removeItem("username");
  localStorage.removeItem("rol");
  // Redirigir a la página de login para limpiar el estado
  window.location.href = "/login";
};

const CustomMenu = (props: MenuProps) => {
  const { permissions } = usePermissions();

  return (
    <Menu {...props}>
      {permissions === "Admin" && (
        <div className="menu">
          {menuAdmin.map((item) => (
            <div className="item" key={item.id}>
              <span className="title">{item.title}</span>
              {item.listItems.map((listItem) => (
                <Link to={listItem.url} className="listItem" key={listItem.id}>
                  <img src={listItem.icon} alt="icon" />
                  <span className="listItemTitle">{listItem.title}</span>
                </Link>
              ))}
            </div>
          ))}

          {/* Botón de Log Out con el mismo estilo */}
          <div className="item">
            <span className="title">SESIÓN</span>
            <div className="listItem" onClick={handleLogout}>
              <img src="logout.png" alt="Log Out Icon" />
              <span className="listItemTitle">Cerrar Sesión</span>
            </div>
          </div>
        </div>
      )}

      {permissions === "Donador" && (
        <div className="menu">
          {menuUsuario.map((item) => (
            <div className="item" key={item.id}>
              <span className="title">{item.title}</span>
              {item.listItems.map((listItem) => (
                <Link to={listItem.url} className="listItem" key={listItem.id}>
                  <img src={listItem.icon} alt="" />
                  <span className="listItemTitle">{listItem.title}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </Menu>
  );
};

export default CustomMenu;
