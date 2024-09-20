import {
    List,
    Datagrid,
    SimpleList,
    InputProps,
    TextField,
    TextInput,
    SelectInput,
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
        <TextField source="cliente" />
        <TextField source="cantidad" /> 
        <TextField source="formaDePago" />
        <DateField source="fecha" /> 
        <EditButton />
        </Datagrid>
    </List>
  );

  export const DonacionesEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="cliente" validate={required()}/>
        <TextInput source="cantidad" validate={required()}/> 
        <SelectInput 
          source="formaDePago" 
          choices={[
            { id: 'tarjeta', name: 'Tarjeta' },
            { id: 'efectivo', name: 'Efectivo' },
            { id: 'transferencia', name: 'Transferencia' }
          ]}
          validate={required()}
        />
        <DateInput source="fecha" /> 
      </SimpleForm>
    </Edit>
  );

  export const DonacionesCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="cliente" validate={required()}/>
        <TextInput source="cantidad" validate={required()}/> 
        <SelectInput 
          source="formaDePago" 
          choices={[
            { id: 'tarjeta', name: 'Tarjeta' },
            { id: 'efectivo', name: 'Efectivo' },
            { id: 'transferencia', name: 'Transferencia' }
          ]}
          validate={required()}
        />
        <DateInput source="fecha" /> 
      </SimpleForm>
    </Create>
  );