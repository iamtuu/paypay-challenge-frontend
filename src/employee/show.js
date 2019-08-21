import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  EditButton,
  CardActions,
} from 'react-admin';
import { required } from 'ra-core';

const ShowAction = ({ basePath, data, permissions }) => (
  <CardActions>
    {permissions == 'admin' &&
      <EditButton basePath={basePath} record={data} />
    }
  </CardActions>
);

function ShowPage(props) {
  return (
    <Show
      title="Employee"
      actions={<ShowAction permissions={props.permissions}/>}
      {...props}
    >
      <SimpleShowLayout>
        <TextField label="Code" source="empcode"  />
        <TextField label="First name" source="firstname" />
        <TextField label="Last name" source="lastname" />
        <TextField label="Email" source="email" />
        <TextField label="User name" source="username" />
      </SimpleShowLayout>
    </Show>
  );
}

export default ShowPage;
