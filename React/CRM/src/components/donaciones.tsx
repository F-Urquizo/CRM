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

  export const DonacionesList = () => (
    <List>
        <Datagrid>
        <TextField source="id" />
        <TextField source="cliente" />
        <TextField source="formaDePago" />
        <TextField source="cantidad" /> 
        <DateField source="fecha" /> 
        <EditButton />
        </Datagrid>
    </List>
  );

  export const DonacionesEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="cliente" />
        <TextInput source="formaDePago" />
        <TextInput source="cantidad" /> 
        <DateInput source="fecha" /> 
      </SimpleForm>
    </Edit>
  );

  export const DonacionesCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="cliente" />
        <TextInput source="formaDePago" />
        <TextInput source="cantidad" /> 
        <DateInput source="fecha" /> 
      </SimpleForm>
    </Create>
  );