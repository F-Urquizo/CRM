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
    DateInput
    
  } from "react-admin";

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

  export const DashboardEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="cliente" />
        <TextInput source="cantidad" /> 
        <TextInput source="formaDePago" />
        <DateInput source="fecha" /> 
      </SimpleForm>
    </Edit>
  );

  export const DashboardCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="cliente" />
        <TextInput source="cantidad" /> 
        <TextInput source="formaDePago" />
        <DateInput source="fecha" /> 
      </SimpleForm>
    </Create>
  );