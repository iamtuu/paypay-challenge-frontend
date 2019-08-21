import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput
} from 'react-admin';

const required = (message = 'Required') => value => value ? undefined : message;

function CreatePage(props) {
  return (
    <Create
      title="Add Employee"
      {...props}
    >
      <SimpleForm redirect="list">
        <ReferenceInput
          label="Reviewer"
          source="reviewerId"
          reference="users"
          validate={required()}
          filterToQuery={searchText => ({
            or: [
              { firstname: { like: `%${searchText}%` } },
              { lastname: { like: `%${searchText}%` } },
              { empcode: { like: `%${searchText}%` } },
            ],
          })}
        >
          <AutocompleteInput optionValue="id" optionText={choices => `${choices.firstname} ${choices.lastname} (${choices.empcode})`} />
        </ReferenceInput>
        <ReferenceInput
          label="Reviewee"
          source="revieweeId"
          reference="users"
          validate={required()}
          filterToQuery={searchText => ({
            or: [
              { firstname: { like: `%${searchText}%` } },
              { lastname: { like: `%${searchText}%` } },
              { empcode: { like: `%${searchText}%` } },
            ],
          })}
        >
          <AutocompleteInput optionValue="id" optionText={choices => `${choices.firstname} ${choices.lastname} (${choices.empcode})`} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}

export default CreatePage;
