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
import {
  DashboardList,
  DashboardEdit,
  DashboardCreate,
} from "./components/Pages/dashboardAdmin";
import {
  UsuariosList,
  UsuariosEdit,
  UsuariosCreate,
} from "./components/Pages/usuarios";
import {
  DonacionesList,
  DonacionesEdit,
  DonacionesCreate,
} from "./components/Pages/donaciones";
import "./styles/global.css";
import "./styles/variables.css";
import { Dashboard } from "./Dashboard";

export const App = () => (
  <Admin
    authProvider={authProvider}
    layout={Layout}
    dataProvider={dataProvider}
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
