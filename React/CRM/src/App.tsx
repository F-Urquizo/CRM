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
  UsuariosList,
  UsuariosEdit,
  UsuariosCreate,
} from "./components/usuarios";
import {
  DonacionesList,
  DonacionesEdit,
  DonacionesCreate,
} from "./components/donaciones";
import "./styles/global.css";
import "./styles/variables.css";
import { Dashboard } from "./Dashboard";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
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
