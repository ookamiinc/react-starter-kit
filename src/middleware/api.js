import axios from 'axios';
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

const createConfig = (authToken, url, method, params) => {
  const config = { method, url };
  switch (method) {
    case GET_METHOD: {
      config.params = { auth_token: authToken, ...params };
      break;
    }
    case POST_METHOD:
    case DELETE_METHOD: {
      config.data = { auth_token: authToken, ...params };
      break;
    }
    default:
      break;
  }
  return config;
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { url, method, type, params } = callAPI;

  if (typeof url !== 'string') {
    throw new Error('Expected url to be strings.');
  }
  if (typeof method !== 'string') {
    throw new Error('Expected method to be strings.');
  }
  const reg = new RegExp(`^(${GET_METHOD}|${POST_METHOD}|${DELETE_METHOD})$`);
  if (!method || !reg.test(method)) {
    throw new Error('Specify one of method.');
  }
  if (typeof type !== 'string') {
    throw new Error('Expected action type to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const { user = {} } = store.getState();
  const authToken = user.authToken || process.env.API_AUTH_TOKEN;
  const config = createConfig(authToken, url, method, params);
  return instance.request(config).then(
    response =>
      next(
        actionWith({
          type,
          payload: response.data,
        }),
      ),
    error =>
      next(
        actionWith({
          type,
          error: true,
          payload: new Error(
            (error.response && error.response.message) || error.message,
          ),
        }),
      ),
  );
};
