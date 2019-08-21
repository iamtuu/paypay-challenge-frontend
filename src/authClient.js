import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_CHECK } from 'react-admin';
import axios from 'axios';
import storage from './storage';

const getProfile = async (userId, accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      params: {
        access_token: accessToken,
        filter: {
          include: 'roles',
        },
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const loginApiUrl = `${process.env.REACT_APP_API_URL}/users/login`;

export default async (type, params) => {
  if (type === AUTH_LOGIN) {
    const request = new Request(loginApiUrl, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(async ({ ttl, ...data }) => {
        const profile = await getProfile(data.userId, data.id);
        const { roles } = profile;
        storage.save('lbtoken', data, ttl);
        if (roles.length > 0) {
          const admin = roles.find(role => (role.name === 'admin'));
          if (admin) {
            localStorage.setItem('role', admin.name);
          } else {
            const user = roles.find(role => (role.name === 'company'));
            if (user) {
              localStorage.setItem('role', user.name);
            }
          }
        }
        storage.save('userId', data.userId);
      });
  }
  if (type === AUTH_LOGOUT) {
    storage.remove('lbtoken');
    storage.remove('role');
    storage.remove('userId');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const { status } = params.message;
    if (status === 401 || status === 403) {
      storage.remove('lbtoken');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    const token = storage.load('lbtoken');
    if (token && token.id) {
      return Promise.resolve();
    }
    storage.remove('lbtoken');
    // return Promise.reject({ redirectTo: noAccessPage });
    window.location.href = '/login';
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('role');
    return Promise.resolve(role);
  }
  return Promise.reject(new Error('Unkown method'));
};
