import TopBox from "../../components/topBox/topBox";
import ChartBox from "../../components/chartBox/chartBox";
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
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2"><ChartBox/></div>
      <div className="box box3"><ChartBox/></div>
      <div className="box box4">Box4</div>
      <div className="box box5"><ChartBox/></div>
      <div className="box box6"><ChartBox/></div>
      <div className="box box7">Box7</div>
      <div className="box box8">Box8</div>
      <div className="box box9">Box9</div>
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
