
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

  import './lists.css'; 

  export const DonacionesList = () => (
    
    <List>
      <div className="custom-list">
      <h2 className="custom-title">Donaciones</h2>
        <Datagrid className="custom-datagrid">
        <ReferenceField label="Usuario" source="usuarioId" reference="usuarios">
                <TextField source="nombre" />
          </ReferenceField>        
        <TextField source="cantidad" /> 
        <TextField source="formaDePago" />
        <DateField source="fecha" /> 
        <EditButton />
        </Datagrid>
      </div>
    </List>
  );

  export const DonacionesEdit = () => (
    <Edit>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <ReferenceInput label="Usuario" source="usuarioId" reference="usuarios">
                <SelectInput optionText="nombre" />
          </ReferenceInput>
        <TextInput source="cantidad" validate={required()}/> 
        <SelectInput 
          source="formaDePago" 
          choices={[
            { id: 'Crédito', name: 'Crédito' },
            { id: 'Efectivo', name: 'Efectivo' },
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
        <ReferenceInput label="Usuario" source="usuarioId" reference="usuarios">
                <SelectInput optionText="nombre" />
        </ReferenceInput>
        <TextInput source="cantidad" validate={required()}/> 
        <SelectInput 
          source="formaDePago" 
          choices={[
            { id: 'Crédito', name: 'Crédito' },
            { id: 'Efectivo', name: 'Efectivo' },
          ]}
          validate={required()}
        />
        <DateInput source="fecha" /> 
      </SimpleForm>
    </Create>
  );
  