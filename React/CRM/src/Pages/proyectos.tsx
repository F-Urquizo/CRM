import React from "react";

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
  
  export const ProyectosList = () => (
    <List>
      <div className="custom-list"> 
        <h2 className="custom-title">Proyectos</h2> 
        <Datagrid className="custom-datagrid"> 
          <TextField source="nombre" />
          <TextField source="ubicacion" />
          <TextField source="financiamiento_requerido" />
          <TextField source="financiamiento_actual" />
          <EditButton />
        </Datagrid>
      </div>
    </List>
  );
  
  export const ProyectosEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="nombre" validate={required()}/>
        <TextInput source="ubicacion" />
        <TextInput source="financiamiento_requerido" />
        <TextInput source="financiamiento_actual" />
      </SimpleForm>
    </Edit>
  );
  
  export const ProyectosCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="nombre" validate={required()}/>
        <TextInput source="ubicacion" />
        <TextInput source="financiamiento_requerido" />
        <TextInput source="financiamiento_actual" />
      </SimpleForm>
    </Create>
  );
  