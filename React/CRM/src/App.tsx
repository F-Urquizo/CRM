import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import {DonadoresList, DonadoresEdit, DonadoresCreate} from "./components/donadores";
import {DonacionesList, DonacionesEdit, DonacionesCreate} from "./components/donaciones";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="donadores" list={DonadoresList} edit={DonadoresEdit} create={DonadoresCreate} ></Resource>
    <Resource name="donaciones" list={DonacionesList} edit={DonacionesEdit} create={DonacionesCreate}></Resource>
  </Admin>
);
