import React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceField,
  FunctionField,
  TextInput,
  NumberInput,
  Toolbar,
  SaveButton,
} from 'react-admin';

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
        <ReferenceField label="Reviewer" source="reviewerId" reference="users">
          <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <ReferenceField label="Reviewee" source="revieweeId" reference="users">
          <FunctionField render={record => `${record.firstname} ${record.lastname}`} />
        </ReferenceField>
        <NumberInput label="Score" source="score" />
        <TextInput label="Description" source="description" />
      </SimpleForm>
    </Edit>
  );
}

export default EditPage;
