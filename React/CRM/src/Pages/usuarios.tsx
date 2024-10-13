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

import './lists.css'; 

export const UsuariosList = () => (
  <List>
    <div className="custom-list"> 
      <h2 className="custom-title">Usuarios</h2> 
      <Datagrid className="custom-datagrid"> 
        <TextField source="nombre" />
        <TextField source="edad" />
        <TextField source="telefono" />
        <EmailField source="email" />
        <EditButton />
      </Datagrid>
    </div>
  </List>
);

export const UsuariosEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="nombre" validate={required()}/>
      {/*<TextInput source="apellido" validate={required()}/>*/}
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
      {/*<TextInput source="apellido" validate={required()}/>*/}
      <TextInput source="edad" />
      <TextInput source="telefono" />
      <TextInput source="email" validate={required()}/>
      <TextInput source="rol" validate={required()}/>
      <TextInput source="usuario" validate={required()}/>
      <TextInput source="password" validate={required()} />
    </SimpleForm>
  </Create>
);
