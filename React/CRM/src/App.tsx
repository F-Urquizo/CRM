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
  DashboardList,
  DashboardEdit,
  DashboardCreate,
} from "./Pages/dashboard/dashboard";
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

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}
  >
    <Resource 
      name="dashboard" 
      list={DashboardList}
      edit={DashboardEdit}
      create={DashboardCreate}
    ></Resource>
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