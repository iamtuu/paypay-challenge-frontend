import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin';

const required = (message = 'Required') => value => value ? undefined : message;

function CreatePage(props) {
  return (
    <Create
      title="Add Employee"
      {...props}
    >
      <SimpleForm>
        <TextInput label="Code" source="empcode" validate={required()} />
        <TextInput label="First name" source="firstname" validate={required()} />
        <TextInput label="Last name" source="lastname" validate={required()} />
        <TextInput label="Email" source="email" type="email" validate={required()} />
        <TextInput label="User name" source="username" validate={required()} />
        <TextInput label="Password" source="password" type="password" validate={required()} />
      </SimpleForm>
    </Create>
  );
}

export default CreatePage;
