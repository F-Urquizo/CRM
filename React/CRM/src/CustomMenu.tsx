import React from 'react';
import { Menu, MenuItemLink, usePermissions, MenuProps } from 'react-admin'; // Importa MenuProps
import DonacionesIcon from '@mui/icons-material/AttachMoney'; // Ejemplo de icono para donaciones
import UsuariosIcon from '@mui/icons-material/Group'; // Ejemplo de icono para usuarios

const CustomMenu = (props: MenuProps) => { // Define el tipo de 'props' como MenuProps
  const { permissions } = usePermissions(); // Obtener permisos del usuario

  return (
    <Menu {...props}>
      {/* Mostrar todos los elementos del menú por defecto */}
      <MenuItemLink to="/dashboard" primaryText="Dashboard" />

      {/* Solo mostrar el menú de Donaciones si el usuario es admin */}
      {permissions === 'Donador' && (
        <MenuItemLink to="/donaciones" primaryText="Donaciones" leftIcon={<DonacionesIcon />} />
      )}

      {/* Mostrar el menú de Usuarios solo para usuarios con permisos específicos */}
      {(permissions === 'Donador' || permissions === 'manager') && (
        <MenuItemLink to="/usuarios" primaryText="Usuarios" leftIcon={<UsuariosIcon />} />
      )}

      {/* Agrega otros elementos del menú aquí */}
    </Menu>
  );
};

export default CustomMenu;
