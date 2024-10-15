import {
  List,
  Datagrid,
  TextField,
  TextInput,
  EmailField,
  Edit,
  required,
  Create,
  EditButton,
  SimpleForm,
} from "react-admin";

import './lists.css'; 

// Usuarios List Component
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

// Usuarios Edit Component
export const UsuariosEdit = () => (
  <Edit>
    <div className="custom-list">
      <h2 className="custom-title">Editar Usuario</h2>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="nombre" validate={required()} />
        {/*<TextInput source="apellido" validate={required()}/>*/}
        <TextInput source="edad" />
        <TextInput source="telefono" />
        <TextInput source="email" validate={required()} />
        <TextInput source="rol" validate={required()} />
        <TextInput source="usuario" validate={required()} />
        <TextInput source="password" validate={required()} />
      </SimpleForm>
    </div>
  </Edit>
);

// Usuarios Create Component
export const UsuariosCreate = () => (
  <Create>
    <div className="custom-list">
      <h2 className="custom-title">Crear Usuario</h2>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="nombre" validate={required()} />
        {/*<TextInput source="apellido" validate={required()}/>*/}
        <TextInput source="edad" />
        <TextInput source="telefono" />
        <TextInput source="email" validate={required()} />
        <TextInput source="rol" validate={required()} />
        <TextInput source="usuario" validate={required()} />
        <TextInput source="password" validate={required()} />
      </SimpleForm>
    </div>
  </Create>
);
