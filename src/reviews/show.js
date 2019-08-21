import React from 'react';
import {
  Show,
  SimpleShowLayout,
  FunctionField,
  NumberField,
  ReferenceField,
  TextField,
  EditButton,
  CardActions,
} from 'react-admin';

const ShowAction = ({ basePath, data }) => (
  <CardActions>
    <EditButton basePath={basePath} record={data} />
  </CardActions>
);

function ShowPage(props) {
  return (
    <Show
      title="Performance Review"
      actions={<ShowAction />}
      {...props}
    >
      <SimpleShowLayout>
        <ReferenceField label="Reviewer" source="reviewerId" reference="users">
          <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <ReferenceField label="Reviewee" source="revieweeId" reference="users">
          <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <NumberField label="Score" source="score"  />
        <TextField label="Description" source="description" />
      </SimpleShowLayout>
    </Show>
  );
}

export default ShowPage;
