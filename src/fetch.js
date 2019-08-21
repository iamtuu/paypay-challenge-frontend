import storage from './storage';

async function fetchJson(url, options) {
  const response = await fetch(
    url,
    { ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: options.user.token,
      },
    },
  );
  if (response) {
    return response.text().then(text => ({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: text,
    }))
      .then(({ status, headers, body }) => {
        let json;
        try {
          json = JSON.parse(body);
        } catch (e) {
          // not json, no big deal
        }
        if (status < 200 || status >= 300) {
          // return Promise.reject(json.error.message);
        }
        return Promise.resolve({ status, headers, body, json });
      });
  }
  return Promise.resolve();
}

export default async (url, options = {}) => {
  const opt = options;
  opt.user = {
    authenticated: true,
    token: storage.load('lbtoken').id,
  };
  const response = await fetchJson(url, opt);
  return response;
};

