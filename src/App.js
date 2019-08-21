import React from 'react';
import { Admin, Resource } from 'react-admin';
import createHistory from 'history/createBrowserHistory';
import loopbackClient from './loopbackClient';
import authClient from './authClient';
import * as Employees from './employee';
import * as Reviews from './reviews';

import './App.css';


const history = createHistory();

const App = () => (
  <Admin
    history={history}
    dataProvider={loopbackClient(process.env.REACT_APP_API_URL)}
    authProvider={authClient}
  >
    {
      permissions => ([
        <Resource
          name="users"
          edit={permissions === 'admin' ? Employees.Edit : null}
          list={Employees.List}
          create={permissions === 'admin' ? Employees.Create : null}
          show={Employees.Show}
          icon={Employees.Icon}
          options={{ label: 'Employees' }}
        />,
        <Resource
          name="reviews"
          edit={Reviews.Edit}
          list={Reviews.List}
          create={permissions === 'admin' ? Reviews.Create : null}
          show={permissions === 'admin' ? Reviews.Show : null}
          icon={Reviews.Icon}
          options={{ label: 'Performance Review' }}
        />
      ])
    }
  </Admin>
);

export default App;
