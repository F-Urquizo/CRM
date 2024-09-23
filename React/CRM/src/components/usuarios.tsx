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

export const UsuariosList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="nombre" />
      <TextField source="apellido" />
      <TextField source="edad" />
      <TextField source="telefono" />
      <EmailField source="email" />
      {/*<TextField source="rol" />*/}
      <TextField source="usuario" />
      {/*<TextField source="password" />*/}
      <EditButton />
    </Datagrid>
  </List>
);

export const UsuariosEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="nombre" />
      <TextInput source="apellido" />
      <TextInput source="edad" />
      <TextInput source="telefono" />
      <TextInput source="email" />
      <TextInput source="rol" />
      <TextInput source="usuario" />
      <TextInput source="password" />
    </SimpleForm>
  </Edit>
);

export const UsuariosCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="nombre" />
      <TextInput source="apellido" />
      <TextInput source="edad" />
      <TextInput source="telefono" />
      <TextInput source="email" />
      <TextInput source="rol" />
      <TextInput source="usuario" />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);
