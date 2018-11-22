import axios from 'axios';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import { CALL_API } from '../constants/actionType';
import {
  API_OOKAMI_CLIENT_APPLICATION_VERSION,
  API_OOKAMI_CLIENT_LOCALE,
  API_OOKAMI_CLIENT_OS,
  API_OOKAMI_CLIENT_OS_VERSION,
  API_OOKAMI_VERSION,
  API_OOKAMI_WEB_TYPE_APP,
  GET_METHOD,
  POST_METHOD,
  DELETE_METHOD,
} from '../constants/api';
import { getTimezone } from '../utils/date';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'X-Ookami-Version': API_OOKAMI_VERSION,
    'X-Ookami-Client-Application-Version': API_OOKAMI_CLIENT_APPLICATION_VERSION,
    'X-Ookami-Client-OS': API_OOKAMI_CLIENT_OS,
    'X-Ookami-Client-OS-Version': API_OOKAMI_CLIENT_OS_VERSION,
    'X-Ookami-Client-Locale': API_OOKAMI_CLIENT_LOCALE,
    'X-Ookami-Client-Timezone': getTimezone(),
    'X-Ookami-Web-Type': API_OOKAMI_WEB_TYPE_APP,
  },
});

const createConfig = (user, url, method, params) => {
  const email = (user && user.email) || '';
  const token = (user && user.authToken) || process.env.API_AUTH_TOKEN;
  const config = { method, url };
  switch (method) {
    case GET_METHOD: {
      config.params = { auth_email: email, auth_token: token, ...params };
      break;
    }
    case POST_METHOD:
    case DELETE_METHOD: {
      config.data = { auth_email: email, auth_token: token, ...params };
      break;
    }
    default:
      break;
  }
  return config;
};

const createResponse = (json, schema) => {
  const camelizedJson = camelizeKeys(json);
  if (!schema) return camelizedJson;
  return normalize(camelizedJson, schema);
};

const createError = error =>
  new Error(
    (error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message) ||
      error.message,
  );

const actionWith = (action, data) => {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[CALL_API];
  return finalAction;
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { method, params, schema, types, url } = callAPI;

  if (typeof method !== 'string') {
    throw new Error('Expected method to be strings.');
  }
  const reg = new RegExp(`^(${GET_METHOD}|${POST_METHOD}|${DELETE_METHOD})$`);
  if (!method || !reg.test(method)) {
    throw new Error('Specify one of method.');
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.');
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
  if (typeof url !== 'string') {
    throw new Error('Expected url to be strings.');
  }

  const [requestType, successType, failureType] = types;
  next(actionWith(action, { type: requestType }));

  const {
    authentication: { user },
  } = store.getState();
  const config = createConfig(user, url, method, params);
  return instance.request(config).then(
    response =>
      next(
        actionWith(action, {
          type: successType,
          payload: createResponse(response.data, schema),
        }),
      ),
    error =>
      next(
        actionWith(action, {
          type: failureType,
          error: true,
          payload: createError(error),
          meta: {
            status: error.response && error.response.status,
          },
        }),
      ),
  );
};
