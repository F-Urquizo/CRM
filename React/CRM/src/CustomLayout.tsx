// src/CustomLayout.tsx
import React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import CustomMenu from './CustomMenu'; // Importa tu menú personalizado

const CustomLayout = (props: LayoutProps) => <Layout {...props} menu={CustomMenu} />;

export default CustomLayout;
