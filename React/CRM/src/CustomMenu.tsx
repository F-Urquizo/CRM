import React from 'react';
import { Menu, MenuItemLink, usePermissions, MenuProps } from 'react-admin'; 
import DonacionesIcon from '@mui/icons-material/AttachMoney'; 
import UsuariosIcon from '@mui/icons-material/Group'; 

const CustomMenu = (props: MenuProps) => { 
  const { permissions } = usePermissions(); 

  return (
    <Menu {...props}>
      <MenuItemLink to="/dashboard" primaryText="Dashboard" />

      {permissions === 'Admin' && (
        <>
          <MenuItemLink to="/usuarios" primaryText="Usuarios" leftIcon={<UsuariosIcon />} />
          <MenuItemLink to="/donaciones" primaryText="Donaciones" leftIcon={<DonacionesIcon />} />
        </>
      )}


    </Menu>
  );
};

export default CustomMenu;