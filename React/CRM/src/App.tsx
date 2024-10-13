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
import "./styles/global.css";
import "./styles/variables.css";
import LoginPage from "./Pages/login/LoginPage";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
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
  </Admin>
);
