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
      <TextField source="nombre" />
      <TextField source="apellido" />
      <TextField source="edad" />
      <TextField source="telefono" />
      <EmailField source="email" />
      {/*<TextField source="rol" />*/}
      <EditButton />
    </Datagrid>
  </List>
);

export const UsuariosEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="nombre" validate={required()}/>
      <TextInput source="apellido" validate={required()}/>
      <TextInput source="edad" />
      <TextInput source="telefono" />
      <TextInput source="email" validate={required()}/>
      <TextInput source="rol" validate={required()}/>
      <TextInput source="usuario" validate={required()}/>
      <TextInput source="password" validate={required()}/>
    </SimpleForm>
  </Edit>
);

export const UsuariosCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="nombre" validate={required()}/>
      <TextInput source="apellido" validate={required()}/>
      <TextInput source="edad" />
      <TextInput source="telefono" />
      <TextInput source="email" validate={required()}/>
      <TextInput source="rol" validate={required()}/>
      <TextInput source="usuario" validate={required()}/>
      <TextInput source="password" validate={required()} />
    </SimpleForm>
  </Create>
);
