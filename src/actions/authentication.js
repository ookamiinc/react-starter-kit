/* eslint-disable import/prefer-default-export */

import { CALL_API, VERIFY_AUTH_TOKEN } from '../constants/actionType';
import { POST_METHOD } from '../constants/api';
import { USERS_VERIFY_CREDENTIALS } from '../constants/url';

export const verifyAuthToken = (authEmail, authToken) => dispatch =>
  dispatch({
    [CALL_API]: {
      method: POST_METHOD,
      type: VERIFY_AUTH_TOKEN,
      url: USERS_VERIFY_CREDENTIALS,
      params: {
        auth_email: authEmail,
        auth_token: authToken,
      },
    },
  });
