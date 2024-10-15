import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { authProvider } from "./AuthProvider";
import { i18nProvider } from "./i18n/i18nProvider";
import Dashboard from "./Pages/dashboard/dashboard";

import {
  UsuariosList,
  UsuariosEdit,
  UsuariosCreate,
} from "./Pages/usuarios";
import {
  DonacionesList,
  DonacionesEdit,
  DonacionesCreate,
} from "./Pages/donaciones";
import {
  ProyectosList,
  ProyectosEdit,
  ProyectosCreate,
} from "./Pages/proyectos";
import "./styles/global.css";
import "./styles/variables.css";
import LoginPage from "./Pages/login/LoginPage";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}

  >
    <Resource
      name="usuarios"
      list={UsuariosList}
      edit={UsuariosEdit}
      create={UsuariosCreate}
    ></Resource>
    <Resource
      name="donaciones"
      list={DonacionesList}
      edit={DonacionesEdit}
      create={DonacionesCreate}
    ></Resource>
    <Resource
      name="proyectos"
      list={ProyectosList}
      edit={ProyectosEdit}
      create={ProyectosCreate}
    ></Resource>
  </Admin>
);
