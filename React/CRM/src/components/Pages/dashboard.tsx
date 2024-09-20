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
      <div className="box box1">Box1</div>
      <div className="box box2">Box2</div>
      <div className="box box3">Box3</div>
      <div className="box box4">Box4</div>
      <div className="box box5">Box5</div>
      <div className="box box6">Box6</div>
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
