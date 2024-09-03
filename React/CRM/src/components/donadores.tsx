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
} from "react-admin";

export const DonadoresList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="nombre" />
      <TextField source="apellido" />
      <TextField source="edad" />
      <TextField source="telefono" />
      <EmailField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

export const DonadoresEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="nombre" />
      <TextInput source="apellido" />
      <TextInput source="edad" />
      <TextInput source="telefono" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export const DonadoresCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="nombre" />
      <TextInput source="apellido" />
      <TextInput source="edad" />
      <TextInput source="telefono" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);
