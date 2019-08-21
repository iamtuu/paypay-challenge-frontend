import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  DeleteButton,
  FunctionField,
  CardActions,
  CreateButton,
  RefreshButton,
} from 'react-admin';
import _ from 'lodash';

const isAdmin = () => {
  const role = localStorage.getItem('role');
  return role && role === 'admin';
};

const getUserId = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId) {
    return userId.value;
  }
  return 0;
};

const ListAction = ({
  basePath,
}) => (
  <CardActions>
    {isAdmin() &&   
    <CreateButton basePath={basePath} />}
    <RefreshButton />
  </CardActions>
);

const getFilter = (permissions) => {
  if (permissions != 'admin' && !isAdmin()) {
    return {
      id: getUserId(),
    };
  }
  return {
    id: {
      neq: [
        getUserId(),
      ]
    },
  };;
};

function ListPage(props) {
  return (
    <List
      title="Employees"
      actions={<ListAction />}
      filter={getFilter(props.permissions)}
      {...props}
    >
      <Datagrid>
        <TextField label="Code" source="empcode"  />
        <TextField label="First name" source="firstname"  />
        <TextField label="Last name" source="lastname"  />
        <TextField label="Email" source="email"  />
        <TextField label="User name" source="username" />
        <ShowButton />
        {isAdmin() &&
        <FunctionField
          render={record => (
            _.get(record, 'role') !== 'admin' ?
              (<DeleteButton />) :
              null
          )}
        />}
      </Datagrid>
    </List>
  );
}

export default ListPage;
