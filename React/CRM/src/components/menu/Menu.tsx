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
  window.location.reload(); // Recarga la página para aplicar el log out
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
                  <img src={listItem.icon} alt="icon"/>
                  <span className="listItemTitle">{listItem.title}</span>
                </Link>
              ))}
            </div>
          ))}
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
