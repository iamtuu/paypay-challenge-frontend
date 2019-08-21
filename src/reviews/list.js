import React from 'react';
import {
  List,
  Datagrid,
  EditButton,
  ShowButton,
  FunctionField,
  ReferenceField,
  CardActions,
  CreateButton,
  RefreshButton,
  ExportButton,
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
      reviewerId: getUserId(),
    };
  }
  return null;
};

function ListPage(props) {
  return (
    <List
      title="Performance Reviews"
      actions={<ListAction />}
      filter={getFilter(props.permissions)}
      {...props}
    >
      <Datagrid>
        <ReferenceField label="Reviewer" source="reviewerId" reference="users" linkType="show">
          <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <ReferenceField label="Reviewee" source="revieweeId" reference="users" linkType="show">
          <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <FunctionField
          label="Done"
          render={record => (
            _.get(record, 'score') > 0 ?
            (<span style={{ color: '#228B22' }}>Yes</span>) :
            (<span style={{ color: '#FF4500' }}>No</span>)
          )}
        />
        {!isAdmin() &&
          <EditButton />}
        {isAdmin() &&
          <ShowButton />}
      </Datagrid>
    </List>
  );
}

export default ListPage;
