import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import {ClientesList, ClientesEdit, ClientesCreate} from "./components/clientes";
import {DonacionesList, DonacionesEdit, DonacionesCreate} from "./components/donaciones";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="clientes" list={ClientesList} edit={ClientesEdit} create={ClientesCreate} ></Resource>
    <Resource name="donaciones" list={DonacionesList} edit={DonacionesEdit} create={DonacionesCreate}></Resource>
  </Admin>
);
