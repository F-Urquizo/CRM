import TopBox from "../../components/topBox/topBox";
import ChartBox from "../../components/chartBox/chartBox";
import TotalDonationsByClient from "../../components/chartBox/TotalDonationsByClient";
import TotalDonationsByPaymentMethod from "../../components/chartBox/TotalDonationsByPaymentMethod";
import TotalDonationsByDate from "../../components/chartBox/TotalDonationsByDate";
import UsersAgeChart from "../../components/chartBox/UsersAgeChart";
{/*import DonationsByDate from "../../components/chartBox/DonationsByDate"; */}
import TotalFinanciamientoByProyecto from "../../components/chartBox/TotalFinanciamientoByProyecto";
import TotalFinanciamientoPorProyecto from "../../components/chartBox/TotalFinanciamientoPorProyecto";




import "./dashboard.css";
import {
  List,
  Datagrid,
  SimpleList,
  InputProps,
  TextField,
  TextInput,
  EmailField,
  ReferenceField,
  ReferenceInput,
  UrlField,
  Edit,
  required,
  Create,
  EditButton,
  SimpleForm,
  ImageField,
  ImageInput,
  DateField,
  DateInput,
  NumberInput
} from "react-admin";

const dashboard = () => {
  return (
    <div className="home">
      {/*}
      <div className="box box1">
        <TopBox />
      </div> 
      */}
      {/*<div className="box box2"><ChartBox/></div>*/}
      <div className="box box10"><TotalDonationsByClient /></div>
      <div className="box box2"><TotalDonationsByPaymentMethod /></div>
      <div className="box box7"><TotalFinanciamientoByProyecto /></div>
      <div className="box box7"><TotalFinanciamientoPorProyecto /></div>
      <div className="box box2"><UsersAgeChart/></div>
      <div className="box box2"><TotalDonationsByDate/></div>
      {/*<div className="box box6"><ChartBox/></div>*/}
      {/*<div className="box box7">Box7</div>*/}
      {/*<div className="box box8">Box7</div>*/}
      {/*<div className="box box9">Box7</div>*/}
    </div>
  )
}

export default dashboard;
// Listado de Donaciones
export const DashboardList = () => (
  <List>
    <Datagrid>
      <TextField source="cliente" />
      <TextField source="cantidad" /> 
      <TextField source="formaDePago" />
      <DateField source="fecha" /> 
      <EditButton />
    </Datagrid>
  </List>
);

// Editar Donaciones
export const DashboardEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="cliente" validate={required()} />
      <NumberInput source="cantidad" validate={required()} /> 
      <TextInput source="formaDePago" validate={required()} />
      <DateInput source="fecha" validate={required()} /> 
    </SimpleForm>
  </Edit>
);

// Crear Donaciones
export const DashboardCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="cliente" validate={required()} />
      <NumberInput source="cantidad" validate={required()} /> 
      <TextInput source="formaDePago" validate={required()} />
      <DateInput source="fecha" validate={required()} /> 
    </SimpleForm>
  </Create>
);
