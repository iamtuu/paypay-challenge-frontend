import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  TextField,
} from 'react-admin';

const required = (message = 'Required') => value => value ? undefined : message;

const EditAction = (props) => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);

function EditPage(props) {
  return (
    <Edit
      title="Edit Employee"
      {...props}
    >
      <SimpleForm toolbar={<EditAction />} >
        <TextInput label="Code" source="empcode" validate={required()} />
        <TextInput label="First name" source="firstname" validate={required()} />
        <TextInput label="Last name" source="lastname" validate={required()} />
        <TextInput label="Email" source="email" type="email" validate={required()} />
        <TextField label="User name" source="username" />
      </SimpleForm>
    </Edit>
  );
}

export default EditPage;
